/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/**/*.{js,jsx,ts,tsx}"
  ],
  daisyui: {
    themes: ["cupcake", "dark", "cmyk"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
