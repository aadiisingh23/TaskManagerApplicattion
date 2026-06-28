// ============================================================
// src/main.jsx — React Entry Point
// ============================================================
// WHY THIS FILE EXISTS:
// This is where React "starts". It finds the <div id="root">
// in index.html and mounts your entire app inside it.
// You don't change this file often — it's just the launch pad.
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Import Tailwind CSS (must be here!)

// ReactDOM.createRoot() targets the <div id="root"> in index.html
// .render() injects your App component into that div
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*
      React.StrictMode is a development helper.
      It shows extra warnings in the console if you write problematic code.
      It doesn't affect the visible UI — it's just a safety checker.
    */}
    <App />
  </React.StrictMode>
);
