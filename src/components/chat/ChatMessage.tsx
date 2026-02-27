"use client";

import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/hooks/use-chat-stream";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed",
          isUser
            ? "bg-foreground text-background"
            : "bg-muted/50 border border-border/40 dark:bg-white/[0.06] dark:border-white/[0.12]",
          isStreaming && message.content === "" && "min-w-[60px] min-h-[32px]"
        )}
      >
        <p className="whitespace-pre-wrap break-words font-[300]">
          {message.content}
          {isStreaming && (
            <span className="inline-block w-[2px] h-4 ml-0.5 bg-foreground/70 animate-pulse align-text-bottom" />
          )}
        </p>
      </div>
    </div>
  );
}
