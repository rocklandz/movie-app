module.exports = {
  purge: [],

  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '50vh': '50vh',
        '75vh': '75vh',
      },
      minHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
