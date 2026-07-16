"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Phone,
  MessageCircle,
  Workflow,
  Headset,
  FileSearch,
  Code2,
  Layers,
  Settings2,
  Globe,
  Building2,
} from "lucide-react";

const services = [
  { icon: Bot, title: "AI Chatbots & Intelligent Agents", desc: "Conversational AI that actually understands your business." },
  { icon: Phone, title: "AI Calling Agents", desc: "Automated voice agents for outbound and inbound calls." },
  { icon: MessageCircle, title: "WhatsApp Automation", desc: "Customer conversations and workflows on WhatsApp, automated." },
  { icon: Workflow, title: "CRM & Workflow Automation", desc: "Connect your tools so work happens without manual handoffs." },
  { icon: Headset, title: "AI-Powered Customer Support", desc: "Faster resolutions, round the clock, without growing headcount." },
  { icon: FileSearch, title: "Intelligent Document Processing", desc: "RAG systems that turn your documents into searchable answers." },
  { icon: Code2, title: "Custom Web Development", desc: "MERN-stack builds tailored to how your business actually runs." },
  { icon: Layers, title: "SaaS Development", desc: "From idea to a real, sellable product — built end to end." },
  { icon: Settings2, title: "Business Process Automation", desc: "Remove the repetitive work that shouldn't need a human." },
  { icon: Globe, title: "Landing Pages & Personal Branding", desc: "A digital presence for clients who need more than just AI." },
];

export default function DevHatchLabsSection() {
  return (
    <section className="relative overflow-hidden section-spacing px-4 sm:px-6">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0D9479]/20 bg-[#0D9479]/10 px-3.5 py-1.5 text-xs font-medium text-[#0D9479]"
          >
            <Building2 className="h-3.5 w-3.5" />
            The company behind StockFlow
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
          >
            DevHatch Labs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="mt-2 text-lg font-medium text-[#0D9479]"
          >
            Build Smarter. Scale Faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6 space-y-4 text-[var(--color-text-secondary)]"
          >
            <p className="text-lg leading-relaxed">
              DevHatch Labs&apos; vision is to become a leading AI solutions company, helping businesses adopt
              artificial intelligence through practical, scalable, and affordable implementations.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is centered on building practical AI solutions that create measurable business
              impact — for clients who need real results, not just a demo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-12"
          >
            <h3 className="text-center text-lg font-semibold text-[var(--color-text)]">What we build</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:bg-[var(--color-surface-hover)]"
                >
                  <service.icon className="h-5 w-5 shrink-0 text-[#0D9479]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">{service.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
