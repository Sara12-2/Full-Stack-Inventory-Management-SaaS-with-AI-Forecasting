"use client";

import { useState } from "react";
import { Copy, RotateCw, Check, Sparkles } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export default function ChatMessageBubble({ message, onRegenerate }: { message: ChatMessageType; onRegenerate?: () => void }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div className={cn("group max-w-[75%] space-y-1.5", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-white"
              : "border border-border bg-card text-text-primary dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark"
          )}
        >
          {message.content}
        </div>
        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={handleCopy} className="rounded-md p-1 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            {onRegenerate && (
              <button onClick={onRegenerate} className="rounded-md p-1 text-text-secondary hover:bg-neutral-100 dark:text-text-secondary-dark dark:hover:bg-white/5">
                <RotateCw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
