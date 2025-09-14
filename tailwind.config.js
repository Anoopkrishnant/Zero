module.exports = {
  theme: {
    extend: {
      fontFamily: {
        fustat: ['Fustat', 'sans-serif'],
        monda: ['Monda', 'sans-serif'],      // Add this line
      },
      letterSpacing: {
        tightcustom: '-0.03em',
        tightzero: '0',                      // Add this for zero letter spacing
      },
      fontSize: {
        'xs-custom': ['8.37px', '8.37px'],  // Custom font-size + line-height
      },
    },
  },
  plugins: [],
}
