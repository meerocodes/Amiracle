// tailwind.config.js
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'white': '2px 2px 10px rgba(255,255,255,0.6)',
        'black': '2px 2px 10px rgba(0,0,0,0.6)',
        'green': '2px 2px 5px rgba(144,238,144,0.5)', // mild light green shadow


      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
