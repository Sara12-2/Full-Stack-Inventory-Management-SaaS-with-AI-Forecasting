"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Lock } from "lucide-react";

export default function AIAssistantPage() {
  const [input, setInput] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-text-primary dark:text-text-primary-dark">
          <Sparkles className="h-6 w-6 text-primary" /> AI Assistant
        </h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark">Ask questions about your inventory in plain language.</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning-light px-4 py-3 text-sm text-warning dark:bg-warning/10">
        <Lock className="h-4 w-4 shrink-0" />
        Phase 3 feature — this is a UI preview only. Responses are not yet connected to a real model or your live data.
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft dark:border-border-dark dark:bg-card-dark dark:shadow-soft-dark">
        <div className="space-y-4">
          {[
            "Which products need restocking soon?",
            "What was my best-selling product last month?",
            "How much stock should I reorder for Bluetooth Speaker?",
          ].map((example, i) => (
            <motion.button
              key={example}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setInput(example)}
              className="block w-full rounded-lg border border-border bg-surface px-4 py-3 text-left text-sm text-text-primary transition-colors hover:bg-slate-100 dark:border-border-dark dark:bg-surface-dark dark:text-text-primary-dark dark:hover:bg-white/5"
            >
              {example}
            </motion.button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your inventory..."
            className="flex-1 rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] dark:border-border-dark dark:bg-card-dark dark:text-text-primary-dark"
          />
          <button
            disabled
            title="Not yet connected — Phase 3 feature"
            className="flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
