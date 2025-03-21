/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "h-100": "32rem",
      },
      screens: {
        "2xl": { max: "1535px" },

        "max-xl": { max: "1325px" },

        "min-xl": { min: "1325px" },

        "max-ex": { max: "1044px" },

        "max-lg": { max: "1023px" },

        "max-medium": { max: "842px" },

        "max-md": { max: "820px" },

        "max-sm": { max: "639px" },

        "max-xsm": { max: "471px" },

        "max-xxsm": { max: "375px" },
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(0)" },
          "100%": { opacity: "1", transform: "translateY(20px)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out",
        fadeOutDown: "fadeOutDown 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
