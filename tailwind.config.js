/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'jj-red': '#CA001B',
        'jj-blue': '#1B2B5E',
        'jj-blue-light': '#F0FDFA',
        'jj-neutral': '#F0FDFA',
        'jj-dark': '#134E4A',
        'jj-border': '#CCFBF1',
        'jj-teal': '#0891B2',
        'jj-teal-light': '#ECFEFF',
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
