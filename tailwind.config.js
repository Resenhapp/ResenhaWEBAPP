/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 10px #FF1493',
      },
      animation: {
        'zoom-in-out': 'zoom-in-out 5s ease-in-out infinite',
        'up-down': 'up-down 5s ease-in-out infinite',
        'left-right': 'left-right 5s ease-in-out infinite',
        'fade': 'fade 5s ease-in-out infinite',
        fadeout: 'fadeout 3s',
      },
      keyframes: {
        fadeout: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'zoom-in-out': {
          '0%, 100%': { transform: 'scale(1.5)' },
          '50%': { transform: 'scale(1.8)' },
        },
        'up-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-150px)' },
        },
        'left-right': {
          '0%, 100%': { transform: 'translateX(-50px)' },
          '50%': { transform: 'translateX(100px)' },
        },
        'fade': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },

      },
      animation: {
        'slide-up': 'slideUp 0.05s ease-out'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%) translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0%) translateX(-50%)', opacity: '1' }
        }
      },
      colors: {
        blackT1: "#212121",
        blackT2: "#4D4D4D",
        blueT1: "#0A387C",
        blueT2: "#054CB8",
        blueT3: "#0085FF",
        blueT4: "#4DB4FF",
        blueT5: "#A3F9FF",
        grayT0: "#8A8A8A",
        greenT1: "#50791B",
        greenT2: "#649822",
        greenT3: "#80CC1F",
        greenT4: "#A6E554",
        greenT5: "#D8FFA7",
        orangeT1: "#92360F",
        orangeT2: "#BD4B1A",
        orangeT3: "#E45D23",
        orangeT4: "#FB7E48",
        orangeT5: "#F9A987",
        purpleT0: "#200039",
        purpleT1: "#5900A0",
        purpleT01: "#48047E",
        purpleT2: "#6805B8",
        purpleT3: "#8E00FF",
        purpleT4: "#B04DFF",
        purpleT5: "#D6A3FF",
        redT1: "#681C1C",
        redT2: "#AE2626",
        redT3: "#DA3535",
        redT4: "#ED5A5A",
        redT5: "#FBB4B4",
        whiteT1: "#F1F1F1",
        whiteT2: "#DDDDDD",
        yellowT1: "#865A17",
        yellowT2: "#B4771C",
        yellowT3: "#EFB520",
        yellowT4: "#EEBF45",
        yellowT5: "#F9DE9A",
        altPurpleT1: "#2B1745",
        altPurpleT2: "#3D1C68",
        altPurpleT3: "#51228D",
        altPurpleT4: "#7635C9",
        altPurpleT5: "#A05CF6",
        pinkT1: "#681C37",
        pinkT2: "#AE264F",
        pinkT3: "#DA3570",
        pinkT4: "#ED5A8F",
        pinkT5: "#FBB4CD",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}