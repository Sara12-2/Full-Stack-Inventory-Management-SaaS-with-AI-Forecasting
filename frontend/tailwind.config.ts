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
          hover: "#0B7D66",
          light: "#ECFDF5",
          border: "#A7F3D0",
          foreground: "#FFFFFF",
        },
        success: { DEFAULT: "#15803D", light: "#F0FDF4" },
        warning: { DEFAULT: "#B45309", light: "#FFFBEB" },
        danger: { DEFAULT: "#B91C1C", light: "#FEF2F2" },

        surface: "#FAFAFA",
        "surface-dark": "#0A0A0A",
        card: "#FFFFFF",
        "card-dark": "#141414",
        border: "#E5E5E5",
        "border-dark": "#262626",

        "text-primary": "#171717",
        "text-primary-dark": "#F5F5F5",
        "text-secondary": "#737373",
        "text-secondary-dark": "#A3A3A3",
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
