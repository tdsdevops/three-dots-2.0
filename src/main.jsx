import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Box } from "@mui/material";
import SmoothNav from "./components/SmoothNav.jsx";
import ThemeContextProvider from "./shared/context/ThemeContextProvider.jsx";

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Box height="100vh">
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Box>
  </React.StrictMode>,
);

// Wait for all images to load before hiding loader
const waitForImages = () => {
  const images = Array.from(document.querySelectorAll("img"));

  // If no images, hide loader immediately
  if (images.length === 0) {
    hideLoader();
    return;
  }

  // Create promises for each image
  const imagePromises = images.map((img) => {
    return new Promise((resolve) => {
      if (img.complete) {
        // Image already loaded
        resolve();
      } else {
        // Wait for image to load
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block
      }
    });
  });

  // Wait for all images to complete
  Promise.all(imagePromises).then(() => {
    hideLoader();
  });
};

// Hide the loader with fade out effect
const hideLoader = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    // Remove from DOM after fade out animation completes
    setTimeout(() => loader.remove(), 500);
  }
};

// Give React a moment to render, then check for images
setTimeout(waitForImages, 100);
