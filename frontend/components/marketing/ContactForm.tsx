"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  Send, 
  CheckCircle, 
  User, 
  Mail, 
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";

export default function ContactForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!form.name || !form.email || !form.message) {
      showToast("error", "Please fill in every field.");
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    
    showToast("success", "Message sent — we'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setTouched({});
    setLoading(false);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const getFieldError = (field: string) => {
    if (!touched[field]) return null;
    if (!form[field as keyof typeof form]) return "This field is required";
    if (field === "email" && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email";
    }
    return null;
  };

  const isFieldValid = (field: string) => {
    if (!touched[field]) return true;
    return !!form[field as keyof typeof form] && !getFieldError(field);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-lg shadow-[#0F172A]/5 transition-shadow hover:shadow-xl dark:shadow-[#0F172A]/20"
    >
      {/* Decorative Gradient Line - Top */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#0D9479] via-[#0D9479] to-[#6366F1]" />
      
      {/* Decorative Glow - Bottom Right */}
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#0D9479]/[0.03] blur-3xl" />

      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0D9479]/10 px-3 py-1 text-xs font-medium text-[#0D9479]">
          <Sparkles aria-hidden="true" className="h-3 w-3" />
          Get in touch
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text)]">Send us a message</h3>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          We&apos;ll reply within 24 hours
        </p>
      </div>

      {/* Name Field */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        <label htmlFor="contact-name" className="label flex items-center gap-2">
          <User aria-hidden="true" className="h-4 w-4 text-[#0D9479]" />
          Full Name
        </label>
        <div className="relative">
          <input
            id="contact-name"
            className={`input pr-10 transition-all duration-200 ${
              focused === "name" ? "border-[#0D9479] ring-2 ring-[#0D9479]/20" : ""
            } ${getFieldError("name") ? "border-red-500 ring-2 ring-red-500/20" : ""} ${
              isFieldValid("name") && form.name ? "border-green-500" : ""
            }`}
            placeholder="John Doe"
            value={form.name}
            aria-invalid={!!getFieldError("name")}
            aria-describedby={getFieldError("name") ? "contact-name-error" : undefined}
            onFocus={() => setFocused("name")}
            onBlur={() => {
              setFocused(null);
              handleBlur("name");
            }}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <AnimatePresence>
            {isFieldValid("name") && form.name && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {getFieldError("name") && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1 text-xs text-red-500"
            id="contact-name-error"
            >
              {getFieldError("name")}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="contact-email" className="label flex items-center gap-2">
          <Mail aria-hidden="true" className="h-4 w-4 text-[#0D9479]" />
          Email Address
        </label>
        <div className="relative">
          <input
            id="contact-email"
            type="email"
            className={`input pr-10 transition-all duration-200 ${
              focused === "email" ? "border-[#0D9479] ring-2 ring-[#0D9479]/20" : ""
            } ${getFieldError("email") ? "border-red-500 ring-2 ring-red-500/20" : ""} ${
              isFieldValid("email") && form.email ? "border-green-500" : ""
            }`}
            placeholder="you@example.com"
            value={form.email}
            aria-invalid={!!getFieldError("email")}
            aria-describedby={getFieldError("email") ? "contact-email-error" : undefined}
            onFocus={() => setFocused("email")}
            onBlur={() => {
              setFocused(null);
              handleBlur("email");
            }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <AnimatePresence>
            {isFieldValid("email") && form.email && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {getFieldError("email") && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1 text-xs text-red-500"
            id="contact-email-error"
            >
              {getFieldError("email")}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message Field */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <label htmlFor="contact-message" className="label flex items-center gap-2">
          <MessageSquare aria-hidden="true" className="h-4 w-4 text-[#0D9479]" />
          Message
        </label>
        <div className="relative">
          <textarea
            id="contact-message"
            rows={4}
            className={`input min-h-[100px] resize-y pr-10 transition-all duration-200 ${
              focused === "message" ? "border-[#0D9479] ring-2 ring-[#0D9479]/20" : ""
            } ${getFieldError("message") ? "border-red-500 ring-2 ring-red-500/20" : ""} ${
              isFieldValid("message") && form.message ? "border-green-500" : ""
            }`}
            placeholder="Tell us how we can help..."
            value={form.message}
            aria-invalid={!!getFieldError("message")}
            aria-describedby={getFieldError("message") ? "contact-message-error" : undefined}
            onFocus={() => setFocused("message")}
            onBlur={() => {
              setFocused(null);
              handleBlur("message");
            }}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <AnimatePresence>
            {isFieldValid("message") && form.message && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute right-3 top-3"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {getFieldError("message") && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1 text-xs text-red-500"
            id="contact-message-error"
            >
              {getFieldError("message")}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Character Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-between text-xs text-[var(--color-text-muted)]"
      >
        <span>{form.message.length} / 500 characters</span>
        {form.message.length > 400 && (
          <span className={`${form.message.length > 450 ? "text-red-500" : "text-amber-500"}`}>
            {form.message.length > 450 ? "⚠️ Too long" : "Getting long..."}
          </span>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full overflow-hidden rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-all ${
          loading
            ? "cursor-not-allowed bg-[#0D9479]/70"
            : "bg-[#0D9479] hover:bg-[#0A7A63] hover:shadow-lg hover:shadow-[#0D9479]/25"
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </span>
        
        {/* Shimmer effect on hover */}
        {!loading && (
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.button>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center text-xs text-[var(--color-text-muted)]"
      >
        We&apos;ll never share your information. No spam, ever.
      </motion.p>
    </motion.form>
  );
}