import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          500: "#2650A8",
          700: "#1A3A78",
          900: "#0D2050",
        },
        gold: {
          300: "#FFE566",
          500: "#F0C400",
          700: "#C09500",
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
