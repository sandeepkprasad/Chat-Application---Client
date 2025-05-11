/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primaryColor: "#3B82F6", // Blue
        backgroundColor: "#F9FAFB", // Light Background
        textColor: "#111827", // Dark Text
        inputBorder: "#D1D5DB", // Gray Border
      },
    },
  },
  plugins: [],
};
