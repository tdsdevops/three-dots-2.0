import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/home/HomeLayout";
import { AppointmentProvider } from "./context/AppointmentContext";
import { Box, CircularProgress } from "@mui/material";
import DotLoader from './shared/loader/DotLoader'
import QrGenerator from "./components/tools/QrGenerator";
// Code splitting / Lazy loading components for page speed & Core Web Vitals optimization
const LandingPage = lazy(() => import("./components/landingPage/LandingPage"));
const About = lazy(() => import("./components/about/About"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const ToolsPage = lazy(() => import("./components/tools/ToolsPage"));
const ContactUs = lazy(() => import("./components/contactUs/ContactUs"));
const Blog = lazy(() => import("./components/blog/Blog"));
const BlogDetails = lazy(() => import("./components/blog/BlogDetails"));
const TermsAndConditions = lazy(() => import("./components/terms/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./components/privacy/PrivacyPolicy"));
const InvoiceGenerator = lazy(() => import("./components/tools/InvoiceGenerator"));

const WarehouseSoftware = lazy(() => import("./components/services/WarehouseSoftware"));
const FranchiseSoftware = lazy(() => import("./components/services/FranchiseSoftware"));
const CustomSoftware = lazy(() => import("./components/services/CustomSoftware"));
const ErpDevelopment = lazy(() => import("./components/services/ErpDevelopment"));
const InventorySoftware = lazy(() => import("./components/services/InventorySoftware"));

// Premium dark fallback loader for lazy-loaded route transitions
const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      bgcolor: "#000",
    }}
  >
    <CircularProgress sx={{ color: "#3B6EF8" }} />
  </Box>
);

function App() {
  return (
    <AppointmentProvider>
      <BrowserRouter>
        <Suspense fallback={<DotLoader />}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="about" element={<About />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetails />} />
              <Route path="terms" element={<TermsAndConditions />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="tools/qr-generator" element={<QrGenerator />} />
              <Route path="tools/free-qr-code-generator" element={<QrGenerator seoKey="qr-landing" />} />
              <Route path="tools/invoice-generator" element={<InvoiceGenerator />} />
              <Route path="tools/gst-invoice-generator" element={<InvoiceGenerator seoKey="gst-invoice-landing" />} />
              
              <Route path="services/warehouse-management-software" element={<WarehouseSoftware />} />
              <Route path="services/franchise-management-software" element={<FranchiseSoftware />} />
              <Route path="services/custom-software-development" element={<CustomSoftware />} />
              <Route path="services/erp-development" element={<ErpDevelopment />} />
              <Route path="services/inventory-management-software" element={<InventorySoftware />} />
              
              <Route path="*" element={<LandingPage />} /> {/* Fallback to LandingPage for unknown routes */}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppointmentProvider>
  );
}

export default App;