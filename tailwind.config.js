/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green-button": '#E5F620',
        "blue-button": '#000080',
        
      }
    },
  },
  plugins: [
    function({addUtilities}){
      const extendeUnderline = {
        '.underline': {
          'textDecoration': 'underline',
          'text-decoration-color': '#000080',
        },
      }
      addUtilities(extendeUnderline)
    }
  ],
}

