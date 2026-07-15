"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Square, Sparkles, Lock } from "lucide-react";
import ConversationSidebar from "@/components/ai/ConversationSidebar";
import ChatMessageBubble from "@/components/ai/ChatMessage";
import ThinkingIndicator from "@/components/ai/ThinkingIndicator";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { ChatMessage, Conversation } from "@/types/dashboard";

const mockConversations: Conversation[] = [
  { id: 1, title: "Which products need restocking?", updatedAt: "2026-07-14" },
  { id: 2, title: "Best sellers last month", updatedAt: "2026-07-12" },
];

const suggestedPrompts = [
  "Which products need restocking soon?",
  "What was my best-selling product last month?",
  "How much stock should I reorder for Bluetooth Speaker?",
];

const STUB_REPLY =
  "This is a UI preview only — the AI Assistant isn't connected to a real model or your live data yet. This response is a placeholder for Phase 3.";

export default function AIAssistantPage() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: text, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: STUB_REPLY, createdAt: new Date().toISOString() }]);
    }, 1200);
  };

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] sm:-m-6">
      <ConversationSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={() => { setActiveId(null); setMessages([]); }}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border-dark sm:px-6">
          <h1 className="flex items-center gap-2 text-sm font-semibold text-text-primary dark:text-text-primary-dark">
            <Sparkles className="h-4 w-4 text-primary" /> AI Assistant
          </h1>
          <span className="flex items-center gap-1.5 rounded-md border border-warning/30 bg-warning-light px-2 py-1 text-xs font-medium text-warning dark:bg-warning/10">
            <Lock className="h-3 w-3" /> Preview
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <EmptyState
                icon={Sparkles}
                title="Ask about your inventory"
                description="Get answers about stock levels, sales, and restocking — once connected to your live data in Phase 3."
              />
              <div className="mt-2 flex w-full max-w-md flex-col gap-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-neutral-50 dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark dark:hover:bg-white/5"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <ChatMessageBubble key={m.id} message={m} onRegenerate={() => sendMessage(messages[messages.length - 2]?.content || "")} />
              ))}
              {thinking && <ThinkingIndicator />}
            </>
          )}
        </div>

        <div className="border-t border-border p-4 dark:border-border-dark sm:p-6">
          <div className="flex items-end gap-2 rounded-lg border border-border bg-card p-2 focus-within:border-primary dark:border-border-dark dark:bg-card-dark">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask about your inventory..."
              rows={1}
              className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-text-primary outline-none dark:text-text-primary-dark"
            />
            {thinking ? (
              <Button size="icon" variant="secondary" onClick={() => setThinking(false)}>
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="icon" onClick={() => sendMessage(input)} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="mt-2 text-center text-xs text-text-secondary dark:text-text-secondary-dark">
            Phase 3 preview — responses are placeholders, not real AI output.
          </p>
        </div>
      </div>
    </div>
  );
}
