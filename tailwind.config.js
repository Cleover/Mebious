const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".shadow-0": {
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        ".shadow-opacity-half": {
          shadowOpacity: 0.5,
        },
        ".shadow-opacity-1": {
          shadowOpacity: 1,
        },
      });
    }),
  ],
};
