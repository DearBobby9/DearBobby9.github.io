"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { ThinkingStatus } from "@/hooks/use-chat-stream";

interface ThinkingIndicatorProps {
  status: ThinkingStatus;
  content: string;
}

export function ThinkingIndicator({ status, content }: ThinkingIndicatorProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (status === "idle" && !content) return null;

  const isThinking = status === "thinking";
  const isDone = status === "done" || (status === "idle" && content.length > 0);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs cursor-pointer",
            "text-muted-foreground hover:text-foreground",
            "transition-colors duration-200"
          )}
        >
          {/* Status dot */}
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0 transition-colors duration-300",
              isThinking && "bg-muted-foreground animate-pulse",
              isDone && "bg-green-500"
            )}
          />

          {/* Label */}
          <span>{isThinking ? "Thinking..." : "Thought"}</span>

          {/* Chevron */}
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>

        {/* Collapsible content */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-[300px] opacity-100 mt-1" : "max-h-0 opacity-0"
          )}
        >
          <div
            className={cn(
              "px-3 py-2 rounded-lg text-xs leading-relaxed",
              "text-muted-foreground/70",
              "border border-border/30 dark:border-white/[0.08]",
              "bg-muted/30 dark:bg-white/[0.03]",
              "overflow-y-auto max-h-[300px] scrollbar-hide"
            )}
          >
            <p className="whitespace-pre-wrap break-words">
              {content}
              {isThinking && (
                <span className="inline-block w-[2px] h-3 ml-0.5 bg-muted-foreground/50 animate-pulse align-text-bottom" />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
