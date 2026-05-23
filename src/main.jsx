import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Box } from "@mui/material";
import SmoothNav from "./components/SmoothNav.jsx";
import ThemeContextProvider from "./shared/context/ThemeContextProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Box height="100vh">
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </Box>
    </HelmetProvider>
  </React.StrictMode>,
);

// Hide the loader with fade out effect
const hideLoader = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    // Remove from DOM after fade out animation completes
    setTimeout(() => loader.remove(), 500);
  }
};

// Hide loader immediately upon mount to solve Core Web Vitals issues
// instead of waiting for all images to load.
if (typeof window !== "undefined") {
  setTimeout(hideLoader, 50);
}

