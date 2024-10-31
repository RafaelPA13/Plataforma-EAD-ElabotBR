/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#c73026",
        "secondary": "#18763B",
        "tertiary": "#0071C1",
        "alternate": "#208DDA",
      },
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
