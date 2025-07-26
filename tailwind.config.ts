import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
extend: {
  colors : {
    defaultWhite: "#fefefe",
    defaultBlack: "#000000",
    defaultGreen: "#6bdc31",
    defaultDarkGreen: "#267a12",
    defaultSoftGreen: "#6bdc31",
    defaultMutedGreen: "#d0f2c5",
},
  
  
}
  },
  plugins: [],
} satisfies Config;
