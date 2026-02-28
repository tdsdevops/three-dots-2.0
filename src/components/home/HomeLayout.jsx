import React, { createContext, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import DynamicSmoothScrolling from "../../shared/components/DynamicSmoothScrolling";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3B6EF8" },
    background: { default: "#020718", paper: "#060d24" },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.55)" },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Syne', sans-serif",
    h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'Syne', sans-serif", fontWeight: 800 },
    h3: { fontFamily: "'Syne', sans-serif", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: 0.3,
        },
      },
    },
  },
});

function HomeLayout() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />

        <DynamicSmoothScrolling>
          <Outlet />
        </DynamicSmoothScrolling>
      </div>
    </>
  );
}

export default HomeLayout;
