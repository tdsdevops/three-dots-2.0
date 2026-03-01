import React, { useContext } from "react";
import HeroSection from "./HeroSection";
import { ThemeContext } from "../../appConstant";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import BenefitsSection from "./BenefitsSection";
import { Box } from "@mui/material";
import ProcessSection from "./ProcessSection";
import Footer from "../home/Footer";
import DynamicSmoothScrolling from "../../shared/components/DynamicSmoothScrolling";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "../../shared/components/FaqSection";
import CtaBanner from "../../shared/components/CtaBanner";

function LandingPage() {
  const { proxyRef, contentRef, contentY } = useContext(ThemeContext);
  return (
    <>
      {/* <DynamicSmoothScrolling> */}
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <ServicesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
      {/* </DynamicSmoothScrolling> */}
      {/* </motion.div>
      </Box> */}
    </>
  );
}

export default LandingPage;
