import React from "react";
import { HashRouter, Route, Routes } from "react-router";
import LandingPage from "./components/landingPage/LandingPage";
import HomeLayout from "./components/home/HomeLayout";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import ContactUs from "./components/contactUs/ContactUs";
import Blog from "./components/blog/Blog";
import BlogDetails from "./components/blog/BlogDetails";
import { AppointmentProvider } from "./context/AppointmentContext";

function App() {
  return (
    <AppointmentProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<About />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetails />} />
            <Route path="*" element={<LandingPage />} /> {/* Fallback to LandingPage for unknown routes */}
          </Route>
        </Routes>
      </HashRouter>
    </AppointmentProvider>
  );
}

export default App;