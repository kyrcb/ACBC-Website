import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          500: "#2C4A7C",
          700: "#1B2A4A",
          900: "#0F1A30",
        },
        gold: {
          300: "#E8C97A",
          500: "#C9A84C",
          700: "#A07830",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "64rem",
        prose: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
