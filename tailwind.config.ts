import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: {
          950: "#050505",
          900: "#090a0d",
          800: "#111318",
          700: "#191d24",
        },
        accent: {
          300: "#f8d77a",
          400: "#e4b43f",
          500: "#c99a21",
        },
      },
      boxShadow: {
        glow: "0 0 70px rgba(228, 180, 63, 0.16)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.36)",
      },
    },
  },
  plugins: [],
} satisfies Config;
