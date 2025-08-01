/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rdc-blue': '#0066CC',
        'rdc-yellow': '#FFD700',
        'rdc-red': '#FF0000',
      }
    },
  },
  plugins: [],
}
