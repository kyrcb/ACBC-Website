/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
      animation: {
        "scroll-left": "scroll-left 50s linear infinite",
        "scroll-right": "scroll-right 50s linear infinite",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
