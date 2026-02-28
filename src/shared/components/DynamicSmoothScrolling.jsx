import { Box } from "@mui/material";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Footer from "../../components/home/Footer";
import { ThemeContext } from "../../appConstant";

function DynamicSmoothScrolling({ children }) {
  const { proxyRef, contentRef, contentY } = useContext(ThemeContext);

  return (
    <>
      <Box
        ref={proxyRef}
        sx={{
          position: "fixed",
          inset: 0,
          overflowY: "scroll",
          overflowX: "hidden",
          zIndex: -1,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {/* Spacer — height set dynamically by ResizeObserver */}
        <div />
      </Box>

      {/* Fixed viewport — clips the lerp-transformed content */}
      <Box sx={{ position: "fixed", inset: 0, overflow: "clip" }}>
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
