/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'grass': '#5dbe6299',
        'fire': '#fc6c6d99',
        'water': '#60a5fa99',
        'bug': '#9dc13099',
        'flying': '#9bb4e899',
        'normal': '#9a9da180',
        'poison': '#b563ce99',
        'electric': '#edd53f99',
        'ground': '#d7855599',
        'fairy': '#ef97e680',
        'fighting': '#d9425699',
        'psychic': '#f8588899',
        'rock': '#c3b16299',
        'ghost': '#7975d499',
        'ice': '#98d8d880',
        'dragon': '#0773c799',
        'dark': '#5f606d99',
        'steel': '#b8b8d080'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}