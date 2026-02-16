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
        midnight: '#0B0F1A', // Deep Midnight - main background
        cyan: '#00E5FF', // LED Cyan - primary CTA, buttons, icons
        pink: '#FF2E88', // Electric Pink - highlights, hover, glow
        primary: {
          400: '#33EAFF', // Lighter Cyan
          500: '#00E5FF', // LED Cyan
          600: '#00B8CC', // Deeper Cyan
          700: '#008B99', // Dark Cyan
        },
        secondary: {
          400: '#FF5AA0', // Lighter Pink
          500: '#FF2E88', // Electric Pink
          600: '#E61E78', // Deeper Pink
          700: '#CC1868', // Dark Pink
        },
        accent: {
          400: '#00E5FF', // LED Cyan accent
          500: '#FF2E88', // Electric Pink accent
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
