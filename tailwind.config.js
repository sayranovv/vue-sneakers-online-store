/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile-s': '320px',
      'mobile-l': '425px',
      'tablet': '768px',
      'laptop': '1024px',
      'laptop-l': '1440px',
      'tv': '2560px'
    },
    extend: {},
  },
  plugins: [],
}

