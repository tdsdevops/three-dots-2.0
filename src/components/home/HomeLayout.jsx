import React, { createContext, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import DynamicSmoothScrolling from "../../shared/components/DynamicSmoothScrolling";

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
