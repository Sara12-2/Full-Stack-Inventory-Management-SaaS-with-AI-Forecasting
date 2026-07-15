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
          DEFAULT: "#0D9479",
          hover: "#0A7A63",
          light: "#ECFDF5",
          border: "#A7F3D0",
          foreground: "#FFFFFF",
        },
        success: { DEFAULT: "#15803D", light: "#F0FDF4" },
        warning: { DEFAULT: "#B45309", light: "#FFFBEB" },
        danger: { DEFAULT: "#B91C1C", light: "#FEF2F2" },

        surface: "#F8FAFC",
        "surface-dark": "#0F172A",
        card: "#FFFFFF",
        "card-dark": "#1E293B",
        border: "#E8EDF2",
        "border-dark": "#334155",

        "text-primary": "#171717",
        "text-primary-dark": "#F1F5F9",
        "text-secondary": "#737373",
        "text-secondary-dark": "#94A3B8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.04)",
        sm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "sm-dark": "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
