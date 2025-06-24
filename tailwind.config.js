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
      fontFamily:{
        'sora': ["Sora", 'sans-serif']
      },
      fontWeight:{
        ligth:300,
      },      backgroundImage:{
        'header-background': "url('assets/images/node_mesh.png')",
      },
      boxShadow:{
        navbar: "0px 10px 8px 0px rgba(3,3,4,0.03), 0 1px 2px -1px rgba(3, 3, 4, 0.03)",
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

