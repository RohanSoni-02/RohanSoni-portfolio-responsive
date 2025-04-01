/** @type {import('tailwindcss').Config} */
/*tailwind dependency*/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      },
    },
  }, 
  plugins: [],
};
