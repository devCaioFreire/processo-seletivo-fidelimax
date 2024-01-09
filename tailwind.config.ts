import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: '#002FB3',
        'blue-50': '#E6EBF8',
        'blue-100': '#CCD0D6',
        'blue-400': '#333E4F',
        'blue-800': '#19202D',
        'gray-200': '#ACB1BA',
        'gray-600': '#737A86',
        'yellow': '#FFB800'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
export default config
