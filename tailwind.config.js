/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        'screen-90': '90vh',
      },
      maxWidth: {
        '8xl': '2000px',
      },
    },
  },
  plugins: [],
};