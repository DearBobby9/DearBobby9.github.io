"use client";

import { useState, useRef, useCallback } from "react";
import {
  CHAT_ENDPOINT,
  CHAT_MODEL,
  SYSTEM_PROMPT,
  MAX_TURNS,
  WARN_AT_TURN,
  MAX_MESSAGE_LENGTH,
  STREAM_TIMEOUT_MS,
} from "@/lib/chat-config";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export type ChatStatus = "idle" | "streaming" | "error";
export type ThinkingStatus = "idle" | "thinking" | "done";

let counter = 0;
function generateId(): string {
  return `msg-${Date.now()}-${++counter}`;
}

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [thinkingStatus, setThinkingStatus] = useState<ThinkingStatus>("idle");
  const [thinkingContent, setThinkingContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const manualAbortRef = useRef(false);

  const turnCount = messages.filter((m) => m.role === "user").length;
  const isAtLimit = turnCount >= MAX_TURNS;
  const isNearLimit = turnCount >= WARN_AT_TURN;

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!trimmed || status === "streaming" || isAtLimit) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
      };

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "",
      };

      const currentMessages = [...messages, userMsg];

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStatus("streaming");
      setThinkingStatus("idle");
      setThinkingContent("");
      setError(null);
      manualAbortRef.current = false;

      const apiMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...currentMessages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const controller = new AbortController();
      abortRef.current = controller;

      const timeoutId = setTimeout(
        () => controller.abort(),
        STREAM_TIMEOUT_MS
      );

      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: CHAT_MODEL,
            messages: apiMessages,
            stream: true,
            temperature: 0.7,
            max_tokens: 4096,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        if (!response.body) {
          throw new Error("Streaming not supported");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        const assistantId = assistantMsg.id;

        // Thinking tag filter state
        let insideThink = false;
        let hadThinking = false;
        // Buffer to detect partial tags at chunk boundaries
        let tagBuffer = "";
        let streamDone = false;

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith(":")) continue;

            if (trimmedLine.startsWith("data: ")) {
              const data = trimmedLine.slice(6);
              if (data === "[DONE]") { streamDone = true; break; }

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  // Accumulate into tagBuffer for tag detection
                  tagBuffer += delta;

                  // Process complete tags in the buffer
                  let processed = "";
                  let thinkChunk = "";
                  let i = 0;
                  while (i < tagBuffer.length) {
                    // Check for <think> opening tag
                    if (tagBuffer.startsWith("<think>", i)) {
                      insideThink = true;
                      hadThinking = true;
                      setThinkingStatus("thinking");
                      i += 7;
                      continue;
                    }
                    // Check for </think> closing tag
                    if (tagBuffer.startsWith("</think>", i)) {
                      insideThink = false;
                      setThinkingStatus("done");
                      i += 8;
                      if (i < tagBuffer.length && tagBuffer[i] === "\n") {
                        i++;
                      }
                      continue;
                    }
                    // Check for potential partial tag at end of buffer
                    if (tagBuffer[i] === "<" && i > tagBuffer.length - 9) {
                      tagBuffer = tagBuffer.slice(i);
                      i = -1;
                      break;
                    }
                    // Regular character
                    if (insideThink) {
                      thinkChunk += tagBuffer[i];
                    } else {
                      processed += tagBuffer[i];
                    }
                    i++;
                  }

                  // If we processed everything, clear the buffer
                  if (i >= 0 && i >= tagBuffer.length) {
                    tagBuffer = "";
                  }

                  // Append thinking content
                  if (thinkChunk) {
                    setThinkingContent((prev) => prev + thinkChunk);
                  }

                  // Append visible content to message
                  if (processed) {
                    setMessages((prev) =>
                      prev.map((m) => {
                        if (m.id !== assistantId) return m;
                        // Trim leading whitespace from first visible chunk
                        const chunk = m.content === "" ? processed.trimStart() : processed;
                        if (!chunk) return m;
                        return { ...m, content: m.content + chunk };
                      })
                    );
                  }
                }
              } catch {
                // Malformed JSON chunk — skip
              }
            }
          }
        }

        // Flush any remaining content in tagBuffer after stream ends
        if (tagBuffer) {
          const remaining = insideThink ? "" : tagBuffer;
          if (remaining) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + remaining }
                  : m
              )
            );
          }
        }

        setStatus("idle");
        // Keep thinkingStatus as "done" so the collapsible indicator stays visible
        if (!hadThinking) {
          setThinkingStatus("idle");
        }
      } catch (err) {
        clearTimeout(timeoutId);

        // Manual stop/clear — not an error
        if (manualAbortRef.current) {
          return;
        }

        let message: string;
        if (err instanceof DOMException && err.name === "AbortError") {
          message = "Request timed out. Please try again.";
        } else if (
          err instanceof TypeError &&
          err.message.includes("fetch")
        ) {
          message =
            "Could not connect to the AI server. Make sure LM Studio is running.";
        } else if (err instanceof Error) {
          message = err.message;
        } else {
          message = "An unexpected error occurred.";
        }

        setError(message);
        setStatus("error");
        setThinkingStatus("idle");

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        abortRef.current = null;
      }
    },
    [messages, status, isAtLimit]
  );

  const stopStreaming = useCallback(() => {
    manualAbortRef.current = true;
    abortRef.current?.abort();
    setStatus("idle");
    setThinkingStatus("idle");
  }, []);

  const clearMessages = useCallback(() => {
    manualAbortRef.current = true;
    abortRef.current?.abort();
    setMessages([]);
    setStatus("idle");
    setThinkingStatus("idle");
    setThinkingContent("");
    setError(null);
  }, []);

  return {
    messages,
    status,
    thinkingStatus,
    thinkingContent,
    error,
    turnCount,
    isAtLimit,
    isNearLimit,
    sendMessage,
    clearMessages,
    stopStreaming,
  };
}
