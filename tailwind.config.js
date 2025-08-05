// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable toggling dark mode with 'dark' class
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          light: '#818CF8',
        },
        background: {
          light: '#F9FAFB',
          dark: '#0F172A',
        },
        text: {
          light: '#111827',
          dark: '#F9FAFB',
        },
        accent: '#EAB308',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        lg: '0.75rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cardDark: '0 4px 20px rgba(0, 0, 0, 0.6)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};
