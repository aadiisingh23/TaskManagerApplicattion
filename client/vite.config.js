// vite.config.js — Vite Build Tool Configuration
// Vite is the tool that runs your React development server.
// This file tells Vite to use the React plugin.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // The server runs on port 5173 by default
  // You can change this here if needed
});
