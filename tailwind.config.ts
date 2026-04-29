import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-im-fell)", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times"],
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Liberation Sans",
          "sans-serif"
        ],
        handwritten: ["var(--font-caveat)", "cursive"]
      },
      colors: {
        bg: "#FAF8F5",
        ink: "#1C1A17",
        "ink-muted": "#6B6560",
        rule: "#DDD8CF",
        accent: "#7C6FA0",
        "accent-light": "#EDE9F5",
        "accent-dark": "#4E4468",
        "warm-yellow": "#F5E6C8",
        terracotta: "#C4714A",
        sage: "#7A9E87",
        "cream-deep": "#EDE5D8"
      },
      borderWidth: {
        hairline: "0.5px"
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "3px"
      }
    }
  },
  plugins: []
};

export default config;

