"use client";

import * as React from "react";
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  isDisabled: boolean;
}

export function ChatInput({ onSend, onStop, isStreaming, isDisabled }: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = React.useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming || isDisabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, isStreaming, isDisabled, onSend]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      const el = e.target;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    },
    []
  );

  return (
    <div className="flex items-end gap-2 border-t border-border/40 p-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={isDisabled ? "Conversation limit reached" : "Message Bobby..."}
        disabled={isDisabled}
        rows={1}
        className={cn(
          "flex-1 resize-none bg-transparent text-sm leading-relaxed",
          "placeholder:text-muted-foreground/50",
          "focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "max-h-[120px] py-2"
        )}
      />
      {isStreaming ? (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onStop}
          aria-label="Stop generating"
          className="shrink-0"
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleSubmit}
          disabled={!value.trim() || isDisabled}
          aria-label="Send message"
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
