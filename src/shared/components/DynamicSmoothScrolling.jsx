import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import Footer from "../../components/home/Footer";
import { ThemeContext } from "../../appConstant";

function DynamicSmoothScrolling({ children }) {
  const { proxyRef, contentRef, contentY, resetScroll } = useContext(ThemeContext);
  const location = useLocation();

  // Reset scroll to top when pathname/route changes
  useEffect(() => {
    if (resetScroll) {
      resetScroll();
    }
  }, [location.pathname, resetScroll]);

  return (
    <>
      <Box
        ref={proxyRef}
        sx={{
          position: "fixed",
          inset: 0,
          overflowY: "scroll",
          overflowX: "hidden",
          zIndex: -1, // Keep behind page elements
          opacity: 0, // Invisible
          pointerEvents: "none", // Let clicks pass through to content
        }}
      >
        {/* Spacer — height set dynamically by ResizeObserver */}
        <div />
      </Box>

      {/* Fixed viewport — clips the lerp-transformed content */}
      <Box sx={{ position: "fixed", inset: 0, overflow: "clip", zIndex: 0 }}>
        {/* Content: moved by transform driven by scrollY MotionValue */}
        <motion.div
          ref={contentRef}
          style={{ y: contentY, willChange: "transform" }}
        >
          {children}
          <Footer />
        </motion.div>
      </Box>
    </>
  );
}

export default DynamicSmoothScrolling;
