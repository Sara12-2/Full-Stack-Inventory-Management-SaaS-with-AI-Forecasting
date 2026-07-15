"use client";

import { Plus, MessageSquare } from "lucide-react";
import { Conversation } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface Props {
  conversations: Conversation[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onNew: () => void;
}

export default function ConversationSidebar({ conversations, activeId, onSelect, onNew }: Props) {
  return (
    <div className="hidden w-64 shrink-0 flex-col border-r border-border dark:border-border-dark md:flex">
      <div className="p-3">
        <Button variant="outline" size="sm" onClick={onNew} className="w-full justify-start">
          <Plus className="h-3.5 w-3.5" /> New conversation
        </Button>
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-3">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
              activeId === c.id
                ? "bg-primary-light text-primary dark:bg-primary/10"
                : "text-text-secondary hover:bg-neutral-100 hover:text-text-primary dark:text-text-secondary-dark dark:hover:bg-white/5 dark:hover:text-text-primary-dark"
            )}
          >
            <MessageSquare className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{c.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
