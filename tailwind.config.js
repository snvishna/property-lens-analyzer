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
          cashflow: '#1565C0',
          valueadd: '#2E7D32',
          appreciation: '#6A1B9A',
          DEFAULT: 'var(--strategy-color)',
          alpha: 'var(--strategy-color-alpha)',
        }
      }
    },
  },
  plugins: [],
}
