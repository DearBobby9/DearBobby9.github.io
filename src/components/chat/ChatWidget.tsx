"use client";

import * as React from "react";
import { MessageCircle, X, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStream } from "@/hooks/use-chat-stream";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ThinkingIndicator } from "@/components/chat/ThinkingIndicator";
import { MAX_TURNS } from "@/lib/chat-config";

const SUGGESTION_CHIPS = [
  "What do you research?",
  "Tell me about NoteV",
  "What is Reality Proxy?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [permissionDismissed, setPermissionDismissed] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("chat-permission-dismissed") === "1";
  });
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const {
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
  } = useChatStream();

  // Auto-scroll to bottom on new messages
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, thinkingStatus]);

  // Close panel on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Open chat from external triggers (e.g. Hero "Chat with me" link)
  React.useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "h-12 w-12 rounded-full",
          "bg-foreground text-background",
          "shadow-lg",
          "flex items-center justify-center",
          "transition-all duration-300 ease-out",
          "hover:scale-110 hover:shadow-xl",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          isOpen && "hidden md:flex"
        )}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={cn(
            // Mobile: fullscreen (z-50+ to cover site header)
            "fixed inset-0 z-[60]",
            "md:inset-auto md:bottom-24 md:right-6 md:z-40",
            // Desktop: floating panel
            "md:w-[400px] md:h-[500px] md:rounded-xl",
            // Background
            "bg-background/80 backdrop-blur-xl",
            "md:bg-background/70 md:backdrop-blur-xl",
            "dark:bg-background/90 md:dark:bg-background/60",
            // Border & shadow
            "border border-border/40 dark:border-white/[0.12]",
            "md:shadow-2xl",
            // Layout
            "flex flex-col",
            // Animation
            "animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Chat with Bobby</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={clearMessages}
                aria-label="Reset conversation"
                disabled={messages.length === 0}
                className="h-7 w-7"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="h-7 w-7"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div role="log" aria-live="polite" aria-label="Chat messages" className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
            {/* Welcome state */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Hey! I&apos;m Bobby — ask me anything about my research, projects, or background.
                </p>
                {!permissionDismissed && (
                  <div className="flex items-start gap-2 bg-muted/50 dark:bg-white/[0.06] border border-border/40 dark:border-white/[0.12] rounded-lg px-3 py-2.5 mt-3 max-w-[300px] text-left">
                    <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="flex-1 text-xs text-muted-foreground leading-relaxed">
                      Your browser may ask for &quot;Local network&quot; access — this connects to the AI server and is safe to allow.
                      <button
                        onClick={() => {
                          setPermissionDismissed(true);
                          localStorage.setItem("chat-permission-dismissed", "1");
                        }}
                        className="ml-1.5 text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors"
                      >
                        Got it
                      </button>
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {SUGGESTION_CHIPS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => {
              const isStreaming_ =
                status === "streaming" &&
                msg.role === "assistant" &&
                i === messages.length - 1;

              // Is this the last assistant message? (for thinking indicator placement)
              const isLastAssistant =
                msg.role === "assistant" &&
                i === messages.length - 1;

              // Hide empty assistant bubble while thinking or content is blank
              const hideWhileThinking =
                isLastAssistant &&
                msg.content.trim() === "" &&
                (thinkingStatus === "thinking" || thinkingStatus === "done" || status === "streaming");

              return (
                <React.Fragment key={msg.id}>
                  {/* Thinking indicator rendered ABOVE the last assistant message */}
                  {isLastAssistant && thinkingStatus !== "idle" && (
                    <ThinkingIndicator status={thinkingStatus} content={thinkingContent} />
                  )}

                  {!hideWhileThinking && (
                    <ChatMessage
                      message={msg}
                      isStreaming={isStreaming_}
                    />
                  )}
                </React.Fragment>
              );
            })}

            {/* Error display */}
            {error && (
              <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Near-limit warning */}
            {isNearLimit && !isAtLimit && (
              <div className="text-xs text-muted-foreground text-center py-1">
                {MAX_TURNS - turnCount} message{MAX_TURNS - turnCount !== 1 ? "s" : ""} remaining
              </div>
            )}

            {/* At-limit notice */}
            {isAtLimit && (
              <div className="text-xs text-muted-foreground text-center py-2 space-y-1">
                <p>Conversation limit reached.</p>
                <button
                  onClick={clearMessages}
                  className="text-foreground underline underline-offset-2"
                >
                  Start a new conversation
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput
            onSend={sendMessage}
            onStop={stopStreaming}
            isStreaming={status === "streaming"}
            isDisabled={isAtLimit}
          />
        </div>
      )}
    </>
  );
}
