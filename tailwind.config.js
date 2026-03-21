/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#23334A",
        secondary: "#42608B",
        white: "#ffffff",
        danger: "#ba1618",
        darkGray: "#767676",
        success: "#16a34a",
        darkStroke: "#aaaaaa",
        stroke: "#d6d6d6",
        lightBlue: "#d3e1f5",
      },
    },
  },
  plugins: [],
};