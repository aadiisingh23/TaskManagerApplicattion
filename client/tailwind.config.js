/** @type {import('tailwindcss').Config} */
// tailwind.config.js — Tailwind CSS Configuration
// This tells Tailwind which files to scan for CSS class names.
// Tailwind only includes CSS for classes you actually use — this keeps the file small.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Scan all JS/JSX files in src/
  ],
  theme: {
    extend: {},  // Add custom colors or sizes here if needed later
  },
  plugins: [],
};
