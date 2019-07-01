module.exports = {
  theme: {
    inset: {
      "1/2": "50%"
    },
    extend: {
      height: {
        "3/4": "75%"
      },
      maxWidth: {
        xxs: "18.5rem"
      },
      boxShadow: {
        "card-shadow": "0px 4px 6px -2px rgba(0, 0, 0, .15)",
        "card-shadow-active": "0px 4px 6px -2px rgba(0,0,0,.35)"
      },
      width: {
        "190": "190px",
        "175": "175px"
      },
      backgroundColor: {
        "1/2black": "rgba(0,0,0,.35)"
      }
    },
    screens: {
      "xs-land": "568px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    }
  },
  variants: {
    opacity: ["hover", "group-hover"],
    backgroundColor: ["hover", "group-hover"],
    borderStyle: ["hover"],
    boxShadow: ["hover"]
  },
  plugins: []
};