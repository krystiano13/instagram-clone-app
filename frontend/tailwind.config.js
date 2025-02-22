/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  flyonui: {
    themes: ["light"]
  },
  plugins: [require("flyonui"), require("flyonui/plugin")],
}
