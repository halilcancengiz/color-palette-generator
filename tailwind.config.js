/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark": "rgba(0,0,0,.8)"
      },
      dropShadow: {
        "copy": "0 0 5px black"
      },
      screens: {
        'xs': '280px',
        'sm': '501px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}