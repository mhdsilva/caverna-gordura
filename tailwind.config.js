/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#CD9E45',
          brown: '#835617',
          black: '#1E110D'
        }
      }
    },
  },
  plugins: [],
};