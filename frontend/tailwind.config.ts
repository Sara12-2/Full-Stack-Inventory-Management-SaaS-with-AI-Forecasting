import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          light: "#EEF2FF",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0D9488",
          hover: "#0F766E",
          light: "#F0FDFA",
          foreground: "#FFFFFF",
        },
        success: { DEFAULT: "#16A34A", light: "#F0FDF4" },
        warning: { DEFAULT: "#D97706", light: "#FFFBEB" },
        danger: { DEFAULT: "#DC2626", light: "#FEF2F2" },

        surface: "#F8FAFC",
        "surface-dark": "#0B1120",
        card: "#FFFFFF",
        "card-dark": "#131B2E",
        border: "#E2E8F0",
        "border-dark": "#232E45",

        "text-primary": "#0F172A",
        "text-primary-dark": "#F1F5F9",
        "text-secondary": "#64748B",
        "text-secondary-dark": "#94A3B8",
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px -2px rgba(15,23,42,0.06)",
        "soft-dark": "0 1px 2px rgba(0,0,0,0.2), 0 4px 16px -2px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(79,70,229,0.12), 0 8px 20px -6px rgba(79,70,229,0.3)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)",
        "gradient-sidebar": "linear-gradient(180deg, #0B1120 0%, #131B2E 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
