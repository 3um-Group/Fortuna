/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/@3um-Group/atomic-sdk/**/*.{js,jsx,ts,tsx}"
    //"node_modules/daisyui/**/*.{js,jsx,ts,tsx}"
  ],
  daisyui: {
    themes: ["light", "dark",  "cupcake", "cmyk"], // Remove "dark" from this array
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
