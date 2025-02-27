const { url } = require("inspector");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    extend: {
      colors: {
        custom_orange: {
          100: '#fff1ef',
          200: '#fff1ef',
          300: '#F6AB9F',
          400: '#FFD3CC',
          500: '',
          600: '',
          700: '#FF735C',
          800: '#FF735C',
          900: '#FF735C',
        },
        custom_black: {
          100: '',
          200: '#212832',
          300: '#28313d',
          400: '',
          500: '#52565b',
          600: '',
          700: '#848886',
          800: '',
          900: '#939090',
          1000: '#efefef',
        }
      },
      keyframes: {
        custom_spin: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        custom_wiggle: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-40px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        down: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(40px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        left: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-40px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        right: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(40px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        sticky: {
          "0%": {
            transform: "translateY(-100%)"
          },

          "100%": {
            transform: "translateY(0%)"
          }
        }
      },
      animation: {
        "custom-spin": " custom_spin 8s infinite linear ",
        "custom-wiggle": " custom_wiggle 5s linear infinite ",
        down: "down 5s linear 0s infinite normal forwards",
        left: "left 5s linear 0s infinite normal forwards",
        right: "right 5s linear 0s infinite normal forwards",
        sticky: "sticky 1s"
      },
    },
    backgroundImage: {
      shape_1: "url('/src/assets/images/shape-1.webp')",
      shape_2: "url('/src/assets/images/shape-2.webp')",
      shape_4: "url('/src/assets/images/shape-4.webp')",
      shape_11: "url('/src/assets/images/shape-11.webp')",
    },
    
  },
  plugins: [
    require("tailwindcss-labeled-groups")([ "menu", "1" ]),
    require("tailwindcss-labeled-groups")([ "sub", "2" ]),
  ],
  safelist: [
    {pattern: /(text|bg|ring)-(blue|red|green|yellow|gray)-(700|100|400|800|900|500|200)/,}
  ]
};
