/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',      // main bg
        surface: '#1a1a1a',         // card bg
        muted: '#2a2a2a',           // soft borders
        accent: '#8b5cf6',          // neon purple
        textPrimary: '#f9f9f9',
        textSecondary: '#b0b0b0',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 10px rgba(139, 92, 246, 0.6)',
      },
    },
  },
  plugins: [],
}
