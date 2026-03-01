import React from "react";
import { HashRouter, Route, Routes } from "react-router";
import LandingPage from "./components/landingPage/LandingPage";
import HomeLayout from "./components/home/HomeLayout";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import ContactUs from "./components/contactUs/ContactUs";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<LandingPage />} /> {/* Fallback to LandingPage for unknown routes */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;