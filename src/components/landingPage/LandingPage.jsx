import React, { useContext } from "react";
import HeroSection from "./HeroSection";
import { ThemeContext } from "../../appConstant";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import RequestQuoteSection from "./RequestQuoteSection";
import BenefitsSection from "./BenefitsSection";
import { Box } from "@mui/material";
import ProcessSection from "./ProcessSection";
import Footer from "../home/Footer";
import DynamicSmoothScrolling from "../../shared/components/DynamicSmoothScrolling";
import TestimonialsSection from "./TestimonialsSection";
import InstagramShowcase from "./InstagramShowcase";
import SEO from "../SEO";

function LandingPage() {
  const { proxyRef, contentRef, contentY } = useContext(ThemeContext);
  return (
    <>
      <SEO pageKey="home" />
      <HeroSection />
      <Box  sx={{ overflowX: "clip" ,px:{xs:2,md:2,lg:4,xl:7}}}>
        <AboutSection />
        <ServicesSection />
        <RequestQuoteSection />
        <BenefitsSection />
        <TestimonialsSection />
        <InstagramShowcase />
      </Box>
      {/* </motion.div>
      </Box> */}
    </>
  );
}

export default LandingPage;
