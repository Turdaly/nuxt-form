/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 't-',
  important: true,
  theme: {
    screens: {
      sm: { min: '600px' },
      md: { min: '960px' },
      lg: { min: '1280px' },
      xl: { min: '1920px' },
    },
  },
};
