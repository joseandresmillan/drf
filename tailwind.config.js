/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green-button": '#E5F620',
        "blue-button": '#155799',
        "node-text":"#E5F620",
        
        
      },
      backgroundImage:{
        'header-background': "url('assets/img/header3-bg.jpg')",
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

