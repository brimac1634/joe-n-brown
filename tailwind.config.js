module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'illustrations': "url('https://static.vecteezy.com/system/resources/thumbnails/000/170/885/small/Pattern-Gum-Tree-Vector.jpg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      }),
      zIndex: {
        '-1': '-1',
        '1': '1',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
