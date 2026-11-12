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
