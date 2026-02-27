"use client";

import { MessageCircle } from "lucide-react";

export function ChatCTA() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
      className="group flex items-center gap-2 font-mono text-sm mt-4 hover:text-muted-foreground transition-colors cursor-pointer"
    >
      <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">
        Chat with me
      </span>
      <MessageCircle className="h-3 w-3" />
    </button>
  );
}
