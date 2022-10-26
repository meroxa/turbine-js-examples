// tailwind.config.js
const colors = require('tailwindcss/colors')
  
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // ...
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
      }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ]
}