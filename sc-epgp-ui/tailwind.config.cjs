/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#224366',
      secondary: '#ffbd0a',
      text: '#FFFFFF',
      bg: '#141E24',
      gray: '#1f2937',
      test1: '#db2777',
      test2: '#15803d',
      green: '#22c55e',
      red: '#ef4444',
    },
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
