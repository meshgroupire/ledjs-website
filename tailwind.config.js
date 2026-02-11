/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          400: '#1e7d7f', // Lighter Teal
          500: '#135658', // Dark Teal/Greenish-Blue (Elite DJs primary)
          600: '#0f4446', // Deeper Teal
          700: '#0b3233', // Deep Teal
        },
        secondary: {
          400: '#e8c99f', // Lighter Gold
          500: '#D8B382', // Light Gold/Warm Beige (Elite DJs accent)
          600: '#c99f6a', // Deeper Gold
          700: '#b88a52', // Deep Gold
        },
        accent: {
          400: '#D8B382', // Gold accent
          500: '#135658', // Teal accent
        },
        elite: {
          dark: '#1C1C1C', // Very Dark Grey
          teal: '#135658', // Dark Teal
          gold: '#D8B382', // Light Gold
          lightGold: '#e8c99f', // Lighter Gold
          darkTeal: '#0f4446', // Deeper Teal
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      letterSpacing: {
        'wide': '0.05em',
        'wider': '0.1em',
      },
    },
  },
  plugins: [],
}
