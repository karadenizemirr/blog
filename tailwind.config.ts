import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: ['poppins-regular'],
        bold: ['poppins-bold'],
        extrabold: ['poppins-extrabold'],
        medium: ['poppins-medium']
      },
      colors: {
        primary: '#FB9900',
        darkLight: '#1B1B1B',
        dark: '#000000',
        light: '#FFFFFF'
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
export default config
