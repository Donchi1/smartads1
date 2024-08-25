import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors:{
      "main-gray":"#eee",
      "main-white": "#ffff",
      "main-color": "#fbbc03",
      "gray-text": "#9f9f9f"
     },
     fontFamily: {
      sans: ['var(--font-inter)'],
      mono: ['var(--font-roboto-mono)'],
    },
    },
  },
  plugins: [],
};
export default config;
