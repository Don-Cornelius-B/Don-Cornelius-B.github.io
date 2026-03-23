/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        night: '#1e1b17',
        charcoal: '#2a2521',
        accent: '#2b8a8a',
        accent2: '#d4a574',
        ivory: '#f5f4f0',
        onyx: '#14110f',
        copper: '#8b6f47',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,165,116,0.38), 0 0 28px rgba(212,165,116,0.16)',
        soft: '0 12px 34px rgba(20, 17, 15, 0.14)',
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
};