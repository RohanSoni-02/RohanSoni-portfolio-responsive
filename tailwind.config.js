/** @type {import('tailwindcss').Config} */
/*tailwind dependency*/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Young Serif", "Georgia", "serif"],
      },
      keyframes: {
        "caret-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1s linear 4 forwards",
      },
      opacity: {
        15: "0.15",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
      },
    },
  },
  plugins: [],
};
