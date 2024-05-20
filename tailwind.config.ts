import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-1": "#F8F8F8",
        "grey-1": "#616161",
        "grey-2": "#E5E7EB",
        "blue-1": "#2563EB",
        "blue-2": "#E9F5FE",
        "blue-3": "#F5F7F9",
        "red-1": "#FF0000",
        "nexus-blue": "#253858",
      },
    },
  },
  plugins: [],
});
