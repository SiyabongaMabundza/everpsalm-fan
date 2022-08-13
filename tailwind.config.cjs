const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily: {
      // 'display1': ['"Kanisah"', 'serif'],
      'display2': ['"EB Garamond"', 'serif'],
      'body': ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
    },
    colors: {
      'primary': '#FF3E41', // orange
      'secondary': '#FCBF49', // yellow
      'on-tinted-bg': '#FFF7E8', // off-white
      'on-light-bg': '#564138', // brown
      'white-light-bg': '#FFF7E8', // off-white
      'purple-tinted-bg': '#A7799D', // light purple
      'green-tinted-bg': '#6E9887' // light green
    }
  },

  plugins: [],
};

module.exports = config;
