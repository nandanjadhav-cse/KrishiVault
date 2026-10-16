/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          50: '#f2fbf4',
          100: '#e1f7e7',
          200: '#c5eed0',
          300: '#99dfab',
          400: '#64c77f',
          500: '#3ba95a',
          600: '#2b8a45',
          700: '#236e39',
          800: '#1f5730',
          900: '#1c472a',
          950: '#0b2715',
        },
        harvest: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        cream: {
          50: '#fcfdfa',
          100: '#f8f9f2',
          200: '#f1f3e4',
          300: '#e5e9cf',
          400: '#d2d9b2',
        },
        soil: {
          800: '#2c221a',
          900: '#1f1812',
          950: '#140f0b',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 20px -2px rgba(16, 53, 30, 0.08), 0 2px 6px -1px rgba(16, 53, 30, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(16, 53, 30, 0.12), 0 4px 12px -2px rgba(16, 53, 30, 0.06)',
        'premium': '0 20px 40px -15px rgba(22, 101, 52, 0.15)',
      }
    },
  },
  plugins: [],
}
