/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#224366',
      secondary: '#ffbd0a',
      text: '#FFFFFF',
      bg: '#141E24',
    },
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
