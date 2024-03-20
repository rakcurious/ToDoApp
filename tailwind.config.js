/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        bck : "#ffe5ec",
        pnk : "#fb6f92",
      },

      fontFamily : {
        'quicksand' : ['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [],
}

