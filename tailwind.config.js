/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#7FC7D9",
        secondary: "#DCF2F1",
        "custom-background": "#365486",
        "dark-color": "#0F1035",
        "custom-white": "#f2f2f2",
        "custom-black": "#000000",
      },
    },
  },

  plugins: [],
};
