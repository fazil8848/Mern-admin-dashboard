/** @type {import('tailwindcss').Config} */ import withMT from "@material-tailwind/react/utils/withMT";
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default withMT(tailwindConfig);
