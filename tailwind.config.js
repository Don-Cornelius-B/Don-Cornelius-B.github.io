/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--vt323)', 'monospace'],
      },
    },
  },
  plugins: [],
};