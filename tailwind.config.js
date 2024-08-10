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
         "orbit": {
          from: {
                transform: 'rotate(0)'
            },
            to: {
              transform: 'rotate(360deg)'
            }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "orbit-1": "orbit 20s linear infinite",
        "orbit-2": "orbit 32s linear infinite",
        "orbit-3": "orbit 54s linear infinite"
      },
      colors: {
        'grass': '#5dbe62',
        'fire': '#fc6c6d',
        'water': '#60a5fa',
        'bug': '#9dc130',
        'flying': '#9bb4e8',
        'normal': '#9a9da1',
        'poison': '#b563ce',
        'electric': '#edd53f',
        'ground': '#d78555',
        'fairy': '#ef97e6',
        'fighting': '#d94256',
        'psychic': '#f85888',
        'rock': '#c3b162',
        'ghost': '#7975d4',
        'ice': '#98d8d8',
        'dragon': '#0773c7',
        'dark': '#5f606d',
        'steel': '#b8b8d0'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}