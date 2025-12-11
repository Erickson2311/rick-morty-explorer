/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rick-blue': '#0A7EA4',
        'morty-yellow': '#F0DB4F',
        'portal-green': '#00B5CC'
      }
    },
  },
  plugins: [],
}