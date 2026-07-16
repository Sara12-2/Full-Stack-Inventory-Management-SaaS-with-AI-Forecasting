"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Square, Sparkles } from "lucide-react";
import ConversationSidebar from "@/components/ai/ConversationSidebar";
import ChatMessageBubble from "@/components/ai/ChatMessage";
import ThinkingIndicator from "@/components/ai/ThinkingIndicator";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { ChatMessage, Conversation } from "@/types/dashboard";
import { askAssistant, getErrorMessage } from "@/lib/api";
import { useToast } from "@/components/providers/ToastProvider";

// Conversations live in React state only (not persisted server-side) --
// switching between them and starting new ones works within a session, but
// history doesn't survive a page refresh. Full server-side persistence
// wasn't part of this phase's scope.
interface LocalConversation extends Conversation {
  messages: ChatMessage[];
}

const suggestedPrompts = [
  "Which products need restocking soon?",
  "What was my best-selling product last month?",
  "How much stock should I reorder for Bluetooth Speaker?",
];

export default function AIAssistantPage() {
  const { showToast } = useToast();
  const [conversations, setConversations] = useState<LocalConversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) || null;
  const messages = active?.messages || [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    // messages is a new array reference on every render (derived from
    // conversations.find(...) above); depending on its length instead of
    // the array itself avoids re-running this effect on unrelated renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, thinking]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: text, createdAt: new Date().toISOString() };

    let conversationId = activeId;
    let priorMessages: ChatMessage[] = [];

    if (conversationId == null) {
      conversationId = Date.now();
      const newConversation: LocalConversation = {
        id: conversationId,
        title: text.slice(0, 60),
        updatedAt: new Date().toISOString(),
        messages: [userMsg],
      };
      setConversations((prev) => [newConversation, ...prev]);
      setActiveId(conversationId);
    } else {
      priorMessages = conversations.find((c) => c.id === conversationId)?.messages || [];
      const id = conversationId;
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, messages: [...c.messages, userMsg], updatedAt: new Date().toISOString() } : c))
      );
    }

    setInput("");
    setThinking(true);

    const id = conversationId;
    try {
      const history = priorMessages.map((m) => ({ role: m.role, content: m.content }));
      const { reply } = await askAssistant(text, history);
      const assistantMsg: ChatMessage = { id: Date.now() + 1, role: "assistant", content: reply, createdAt: new Date().toISOString() };
      setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, messages: [...c.messages, assistantMsg] } : c)));
    } catch (err) {
      showToast("error", getErrorMessage(err));
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="-m-4 flex h-[calc(100vh-3.5rem)] sm:-m-6">
      <ConversationSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={() => setActiveId(null)}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border-dark sm:px-6">
          <h1 className="flex items-center gap-2 text-sm font-semibold text-text-primary dark:text-text-primary-dark">
            <Sparkles className="h-4 w-4 text-primary" /> AI Assistant
          </h1>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <EmptyState
                icon={Sparkles}
                title="Ask about your inventory"
                description="Get answers about stock levels, sales, and restocking based on your live data."
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
              <Button size="icon" variant="secondary" disabled>
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="icon" onClick={() => sendMessage(input)} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
