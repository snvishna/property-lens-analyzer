/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        strategy: {
          cashflow: '#3b82f6',
          valueadd: '#10b981',
          appreciation: '#8b5cf6',
          DEFAULT: 'var(--strategy-color)',
          alpha: 'var(--strategy-color-alpha)',
        }
      }
    },
  },
  plugins: [],
}
