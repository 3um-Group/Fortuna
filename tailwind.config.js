/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/@3um-group/atomic-sdk/**/*.{js,jsx,ts,tsx}"
    //"node_modules/daisyui/**/*.{js,jsx,ts,tsx}"
  ],
  daisyui: {
    themes: ["light", "dark",  "cupcake", "cmyk"], // Remove "dark" from this array
  },
  theme: {
    extend: {
      zIndex: {
        '1': '1',
      }
    },
  },
  plugins: [require("daisyui")],
};
