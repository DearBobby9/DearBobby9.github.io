"use client";

import { MessageCircle } from "lucide-react";

export function ChatCTA() {
  return (
    <div className="mt-4 space-y-1.5">
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
        className="group flex items-center gap-2 font-mono text-sm hover:text-muted-foreground transition-colors cursor-pointer"
      >
        <span className="border-b border-foreground group-hover:border-muted-foreground transition-colors">
          Chat with me
        </span>
        <MessageCircle className="h-3 w-3" />
      </button>
      <p className="font-mono text-[10px] text-muted-foreground/50 leading-tight">
        AI clone — it&apos;s funny!
      </p>
    </div>
  );
}
