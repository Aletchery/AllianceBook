/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto Mono, monospace"],
    },
    extend: {
      backgroundImage: {
        header:
          "url('https://as2.ftcdn.net/v2/jpg/04/45/20/01/1000_F_445200123_rydkgcOC65owA0j1B9Khb5p8CyfLTcD2.jpg')",
        body: "url('https://st2.depositphotos.com/5320642/9272/i/450/depositphotos_92724840-stock-photo-space-environment-ready-for-comp.jpg')",
      },
    },
  },
  plugins: [],
};
