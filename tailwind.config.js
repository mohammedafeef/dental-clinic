/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./main.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0073B2',
          dark: '#00598A',
          light: '#0284C7',
          soft: '#EAF4FA',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        accent: {
          DEFAULT: '#06B6D4',
          light: '#E0F2FE',
        },
        dark: {
          DEFAULT: '#1E293B',
          lighter: '#334155',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          alt: '#F0F6FA',
          pure: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
