import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-iransans)'],
      },
      backgroundImage: {
        'banner-m-bg1': "url('/images/home-page/banner-m-bg1.svg')",
        'banner-d-bg1': "url('/images/home-page/banner-d-bg1.svg')",
        'banner-bg2': "url('/images/home-page/banner-bg2.png')",
        'circle-bg': "url('/images/home-page/circle-bg.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;

