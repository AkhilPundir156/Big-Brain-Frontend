/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-text': 'var(--primary-text-color)',
        'secondary-text': 'var(--secondary-text-color)',
        'tertiary-text': 'var(--tertiary-text-color)',

        'primary-bg': 'var(--primary-bg-color)',
        'secondary-bg': 'var(--secondary-bg-color)',
        'tertiary-bg': 'var(--tertiary-bg-color)',
        'first-bg': 'var(--first-bg-color)',

        'primary-dot': 'var(--primary-dot-color)',

        'primary-border': 'var(--primary-border-color)',
        'secondary-border': 'var(--secondary-border-color)',
        'tertiary-border':'var(--tertiary-border-color)',
        'input-bg':'var( --input-bg-color)',
        'main-color':'var(--primary-main-color)',
        'primary-bg-constant':'var(--primary-bg-constant)',
        'green-text': 'var(--green-text-color)',
        'green-bg': 'var(--green-bg-bolor)'
      },
    },
  },
  plugins: [],
}

