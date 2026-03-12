/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#edfaf6',
          100: '#d0f4e8',
          200: '#a4e8d3',
          300: '#70d5ba',
          400: '#3fbda0',
          500: '#17bb90',
          600: '#0f9e78',
          700: '#0d7f61',
          800: '#0c644e',
          900: '#0b5141',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': { content: '' },
            'code::after': { content: '' },
            code: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.sm'),
              padding: '0.2em 0.4em',
              fontWeight: '400',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
