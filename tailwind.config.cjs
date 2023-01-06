/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        background_primary: "#fafafc",
        b0: "#fff",
        success:"#0ccf7b",
        warning:"#d9a22b",
        danger:"#ff3374",
        b60_primary:"#777", //disabled
        text_secondary:"#777", //disabled
        b20_primary:"#f2f2f4", //disabled button
        text_primary:"#000",
        searchinput: "#bbb",
      }
    },
  },
  plugins: [

  
    require('@tailwindcss/line-clamp'),

  ],
};
