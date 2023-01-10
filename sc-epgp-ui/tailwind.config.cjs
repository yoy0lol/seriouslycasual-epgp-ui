/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    colors: {
      primary: '#224366',
      secondary: '#ffbd0a',
      bgGr1: '#111827',
      bgGr2: '#18181b',
      text: '#FFFFFF',
      bg: '#141E24',
      gray: '#1f2937',
      test1: '#db2777',
      test2: '#15803d',
      green: '#22c55e',
      red: '#ef4444',
      navBarBg: '#1B2D6E',
      // class colors
      DeathKnight: '#C41E3A',
      DemonHunter: '#A330C9',
      Mage: '#3FC7EB',
    },
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-scrollbar'), require('tw-elements/dist/plugin')],
};
