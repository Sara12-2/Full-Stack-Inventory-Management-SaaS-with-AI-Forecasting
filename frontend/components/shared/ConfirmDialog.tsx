"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl dark:bg-card-dark"
          >
            <h3 className="font-heading text-base font-semibold text-text-primary dark:text-text-primary-dark">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary dark:text-text-secondary-dark">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onCancel} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-slate-50 dark:border-border-dark dark:text-text-primary-dark dark:hover:bg-white/5">
                Cancel
              </button>
              <button onClick={onConfirm} className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]">
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
