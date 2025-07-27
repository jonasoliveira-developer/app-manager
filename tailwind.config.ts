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
    defaultLightGreen: "#6bdc31",
    defaultDarkGreen: "#267a12",
    defaultSoftGreen: "#6bdc31",
    defaultMutedGreen: "#d0f2c5",
    defaultMintGreen: "#98ff98",
    defaultOliveGreen: "#808000",
    defaultMossGreen: "#556b2f",
    defaultGreen: "#50c878",
    defaultFlagGreen: "#009739",
    defaultAquaGreen: "#00ffcc",
    defaultMilitaryGreen: "#4b5320",
    defaultLimeGreen: "#bfff00",
    defaultForestGreen: "#228b22",
    defaultJungleGreen: "#29ab87",
    defaultPastelGreen: "#77dd77",
    defaultCeladonGreen: "#ace1af"




    
},
  
  
}
  },
  plugins: [],
} satisfies Config;
