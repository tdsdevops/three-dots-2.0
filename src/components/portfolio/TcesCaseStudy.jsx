import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DevicesIcon from "@mui/icons-material/Devices";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import SEO from "../SEO";
import { sendEmail } from "../../utils/sendEmail";

const MotionBox = motion(Box);

export default function TcesCaseStudy() {
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <Box
      component="article"
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "DM Sans",
        pt: { xs: 10, md: 14 },
        pb: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SEO pageKey="tces-case-study" />

      {/* Ambient background glows */}
      <Box
        sx={{
          position: "absolute",
          top: "5%",
          left: "-15%",
          width: { xs: "350px", md: "600px" },
          height: { xs: "350px", md: "600px" },
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: { xs: "300px", md: "550px" },
          height: { xs: "300px", md: "550px" },
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Back navigation */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/portfolio")}
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 4,
              textTransform: "none",
              fontSize: "0.95rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              px: 2.5,
              py: 0.8,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            Back to Portfolio
          </Button>
        </MotionBox>

        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, mb: 3 }}>
            <Chip
              label="Case Study"
              sx={{
                bgcolor: "#2563EB",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.85rem",
                px: 1,
              }}
            />
            <Chip
              label="TCES Exports × Three Dots"
              variant="outlined"
              sx={{
                color: "rgba(255,255,255,0.9)",
                borderColor: "rgba(255,255,255,0.25)",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            />
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
              Chennai, India • 2026
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.3rem", sm: "3.2rem", md: "4.2rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#fff",
              mb: 3,
            }}
          >
            From Farmers to the World: Building a Digital Presence for TCES Exports
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              color: "#EA580C",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              mb: 4,
            }}
          >
            TCES Exports × Three Dots • Website Design • Development • SEO • Digital Experience
          </Typography>

          {/* Quick Project Metadata Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              gap: 2.5,
              p: 3,
              borderRadius: "16px",
              bgcolor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              mb: 6,
            }}
          >
            <Box>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>
                Client
              </Typography>
              <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                TCES Exports
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                Transcontinental Export Services
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>
                Industry
              </Typography>
              <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                Spice Export & Agro Trade
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                Global B2B Supply
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>
                Services
              </Typography>
              <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                Web Design & Full-Stack
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                UI/UX • SEO • Performance
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>
                Focus
              </Typography>
              <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                Buyer Trust & Enquiries
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                International B2B Conversion
              </Typography>
            </Box>
          </Box>

          {/* Hero Mockup Image */}
          <Box
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(234, 88, 12, 0.15)",
              bgcolor: "#111",
              position: "relative",
            }}
          >
            <Box
              component="img"
              src="/tces-exports-spice-exporter-website.webp"
              alt="TCES Exports spice export website design and development by Three Dots"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Box>
        </MotionBox>

        {/* Narrative Section 1: The Core Mission */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ maxWidth: 880, mx: "auto", mb: { xs: 8, md: 12 } }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "#fff",
              lineHeight: 1.6,
              fontWeight: 500,
              mb: 3,
            }}
          >
            When a company is taking Indian spices to international markets, a website cannot simply be a collection of product photographs and contact details.
          </Typography>

          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              bgcolor: "rgba(37, 99, 235, 0.08)",
              borderLeft: "4px solid #3B6EF8",
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.15rem", md: "1.35rem" },
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.5,
              }}
            >
              For an overseas buyer, the first question is often much simpler:
              <br />
              <span style={{ color: "#60A5FA" }}>“Can I trust this supplier?”</span>
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.8)",
              mb: 3,
            }}
          >
            That was the thinking behind our work with <strong>TCES Exports</strong>, a Chennai-based Indian spice exporter focused on connecting carefully sourced Indian spices with buyers across international markets.
          </Typography>

          <Typography
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            The goal was not to make another generic exporter website. It was to create a digital presence that felt like TCES itself — <strong>straightforward, dependable and rooted in the journey of the product.</strong>
          </Typography>
        </MotionBox>

        {/* Section 2: The Challenge */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "24px",
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.6rem" },
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                mb: 3,
              }}
            >
              The Challenge Was Bigger Than Just Designing a Website
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
                mb: 4,
                maxWidth: 820,
              }}
            >
              TCES had the products, the sourcing network and the ambition to work with international buyers. But all of that needs to come across clearly when a potential buyer lands on a website for the first time.
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
                mb: 4,
                maxWidth: 820,
              }}
            >
              A buyer should not have to search through several pages to understand what the company does, what it supplies, where its products come from or how to start a conversation. So we looked at the website from the buyer's perspective:
            </Typography>

            <Grid container spacing={2.5}>
              {[
                { q: "Where does the product come from?", desc: "Direct origin tracing from farmers and agricultural belts across India." },
                { q: "What does TCES actually supply?", desc: "Clear distinction between whole export spices and custom-formulated ground powders." },
                { q: "How does the company approach quality?", desc: "Certifications, laboratory testing, grading, and moisture-controlled packaging." },
                { q: "Can I find the product I need?", desc: "Instant search and effortless category navigation with detailed export specs." },
                { q: "What happens if I want a quotation or sample?", desc: "A frictionless enquiry journey tailored to volume, destination, and product." }
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Box
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: "16px",
                      bgcolor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Typography sx={{ color: "#EA580C", fontWeight: 700, fontSize: "1.05rem", mb: 1 }}>
                      {item.q}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </MotionBox>

        {/* Section 3: Story Behind Spices */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  mb: 2.5,
                }}
              >
                We Started With the Story Behind the Spices
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                  mb: 3,
                }}
              >
                The strongest part of TCES was never just the product catalogue. It was the journey behind the products. From farmers and producer groups to sourcing, selection, packing and shipment, there is a story behind every export.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                  mb: 3,
                }}
              >
                We brought that story closer to the surface. The idea was simple:
              </Typography>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "12px",
                  bgcolor: "rgba(234, 88, 12, 0.1)",
                  borderLeft: "4px solid #EA580C",
                  mb: 3,
                }}
              >
                <Typography sx={{ color: "#FDBA74", fontWeight: 700, fontSize: "1.15rem" }}>
                  “From the source, not just from the market.”
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                This gave the website a more human identity and helped move the conversation away from simply selling spices towards showing where the business comes from and how it works.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
                }}
              >
                <Box
                  component="img"
                  src="/tces-exports-indian-spices-website.webp"
                  alt="TCES Exports Indian spices product listing website"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Section 4: Making Products Easier to Explore */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Grid container spacing={5} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
                }}
              >
                <Box
                  component="img"
                  src="/tces-exports-product-page.webp"
                  alt="TCES Exports Indian spices product listing website"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  mb: 2.5,
                }}
              >
                Making Products Easier to Explore
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                  mb: 3,
                }}
              >
                An international buyer visiting an export website usually comes with a requirement already in mind. They may be looking for black pepper, cardamom, turmeric, or a particular spice powder.
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.8)",
                  mb: 3,
                }}
              >
                The website therefore needed to make product discovery quick and uncomplicated. We structured the product experience around <strong>whole spices</strong> and <strong>spice powders</strong>, with individual product pages designed to give buyers useful information before they make an enquiry.
              </Typography>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "12px",
                  bgcolor: "rgba(37, 99, 235, 0.1)",
                  border: "1px solid rgba(37, 99, 235, 0.3)",
                  mb: 2,
                }}
              >
                <Typography sx={{ color: "#93C5FD", fontWeight: 700, fontSize: "1.05rem", textAlign: "center" }}>
                  Product → Information → Requirement → Conversation
                </Typography>
              </Box>
              <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
                Instead of overwhelming visitors with unnecessary fluff, the focus stayed on what actually helps a buyer move forward.
              </Typography>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Section 5: Trust & Enquiry Journey */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  borderRadius: "20px",
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: "1.5rem", md: "1.9rem" },
                    fontWeight: 800,
                    color: "#fff",
                    mb: 2.5,
                  }}
                >
                  Turning Trust Into Something Buyers Can See
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "1.05rem", mb: 3 }}>
                  Trust is easy to say. It is harder to communicate. For an export business, registrations, sourcing practices, quality processes, documentation and buyer support all contribute to that trust.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "1.05rem", mb: 3 }}>
                  The website brings these elements into the experience rather than hiding them away. TCES presents its registrations and certifications, talks about direct sourcing and quality-focused selection, and explains its approach to packing, documentation and shipment.
                </Typography>
                <Typography sx={{ color: "#60A5FA", fontWeight: 700, fontSize: "1.05rem" }}>
                  “The product matters. But the way you handle the product matters too.”
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  height: "100%",
                  borderRadius: "20px",
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: "1.5rem", md: "1.9rem" },
                    fontWeight: 800,
                    color: "#fff",
                    mb: 2.5,
                  }}
                >
                  Designing Around the Enquiry
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "1.05rem", mb: 3 }}>
                  A website for an exporter should not leave the buyer wondering what to do next. That is why the enquiry journey became an important part of the design.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "1.05rem", mb: 3 }}>
                  Instead of ending with a simple “Contact Us”, the website speaks directly to the buyer's requirement:
                </Typography>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: "12px",
                    bgcolor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    mb: 2,
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", mb: 0.5 }}>
                    Looking for Indian Spices for Your Market?
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                    Tell us what you need — product, quantity, port requirement, or a larger sourcing conversation.
                  </Typography>
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
                  The website makes that next step visible, welcoming and friction-free.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </MotionBox>

        {/* Section 6: Visual Direction & Mobile Experience */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "24px",
              bgcolor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    mb: 3,
                  }}
                >
                  The Visual Direction
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.8, fontSize: "1.05rem", mb: 3 }}>
                  For the visual language, we wanted the website to feel like <strong>India meeting the global market</strong>. Warm spice photography brings the products to life, while the overall interface stays clean and professional.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                  {[
                    "Indian origin + international business",
                    "Traditional products + modern presentation",
                    "Human sourcing + professional export capability"
                  ].map((balanceItem, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#EA580C" }} />
                      <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "1.05rem" }}>
                        {balanceItem}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Typography sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, fontSize: "1rem" }}>
                  That balance was important. The website needed to feel authentic to an Indian spice business without looking old-fashioned, while still giving international buyers the confidence to start a business conversation.
                </Typography>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
                  }}
                >
                  <Box
                    component="img"
                    src="/tces-exports-mobile-website-design.webp"
                    alt="Responsive mobile website design for TCES Exports"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Full Homepage Showcase */}
            <Box sx={{ mt: 6, pt: 6, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem", md: "1.4rem" },
                  fontWeight: 700,
                  color: "#fff",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Homepage Interface Design
              </Typography>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
                }}
              >
                <Box
                  component="img"
                  src="/tces-exports-website-homepage.webp"
                  alt="TCES Exports Indian spice exporter website homepage designed by Three Dots"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </MotionBox>

        {/* Section 7: The Result */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{
            maxWidth: 880,
            mx: "auto",
            mb: { xs: 8, md: 12 },
            textAlign: "center",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              mb: 3,
            }}
          >
            The Result
          </Typography>

          <Typography
            sx={{
              fontSize: "1.15rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.85)",
              mb: 3,
            }}
          >
            The result is not simply a website that displays spices. It is a digital presence that gives TCES Exports a clearer way to introduce itself to the world.
          </Typography>

          <Typography
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.75)",
              mb: 4,
            }}
          >
            A place where buyers can understand the company, discover its products, see how it approaches quality and sourcing, and take the next step towards an enquiry. Most importantly, the website gives the business a story that can travel beyond its physical network: from Indian farms and sourcing partners to buyers around the world.
          </Typography>

          <Box
            sx={{
              p: 3.5,
              borderRadius: "16px",
              bgcolor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "inline-block",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem", mb: 0.5 }}>
              From Farmers to the World.
            </Typography>
            <Typography sx={{ color: "#3B6EF8", fontWeight: 700, fontSize: "1rem" }}>
              TCES Exports × Three Dots
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", mt: 0.5 }}>
              Website Design • Development • SEO • Digital Experience
            </Typography>
          </Box>
        </MotionBox>

        {/* Section 8: Related SEO Blog Cross-Link */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            mb: 8,
            p: { xs: 3.5, md: 4.5 },
            borderRadius: "20px",
            bgcolor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#3B6EF8",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mb: 0.5,
              }}
            >
              Industry Perspective & Guide
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: "1.15rem", md: "1.35rem" },
                mb: 1,
              }}
            >
              Building a website for an export business?
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.95rem",
                maxWidth: 620,
                lineHeight: 1.6,
              }}
            >
              We also wrote about the key things international buyers look for when visiting an Indian spice exporter website.
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/blog/indian-spice-exporter-website"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: "#fff",
              borderColor: "rgba(255, 255, 255, 0.3)",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              px: 3,
              py: 1.3,
              borderRadius: "10px",
              whiteSpace: "nowrap",
              "&:hover": {
                borderColor: "#3B6EF8",
                bgcolor: "rgba(59, 110, 248, 0.1)",
              },
            }}
          >
            Read: What Makes a Good Website for an Indian Spice Exporter?
          </Button>
        </MotionBox>

        {/* Section 9: CTA Section */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            bgcolor: "rgba(37, 99, 235, 0.1)",
            border: "1px solid rgba(37, 99, 235, 0.35)",
            backdropFilter: "blur(14px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              mb: 2,
              position: "relative",
            }}
          >
            Looking to Build a Website That Actually Represents Your Business?
          </Typography>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.75)",
              fontSize: { xs: "1rem", md: "1.15rem" },
              maxWidth: 680,
              mx: "auto",
              lineHeight: 1.7,
              mb: 4,
              position: "relative",
            }}
          >
            Your website should do more than look good. It should help people understand your business, trust your work and know what to do next. Let's build something that works for your business.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setContactOpen(true)}
            sx={{
              bgcolor: "#2563EB",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              px: 4.5,
              py: 1.6,
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 6px 25px rgba(37, 99, 235, 0.5)",
              position: "relative",
              "&:hover": {
                bgcolor: "#1d4ed8",
                boxShadow: "0 8px 30px rgba(37, 99, 235, 0.6)",
              },
            }}
          >
            Start a Project →
          </Button>
        </MotionBox>
      </Container>

      {/* Project Consultation Dialog */}
      <Dialog open={contactOpen} onClose={() => setContactOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Start a Project With Three Dots</DialogTitle>
        <DialogContent>
          <form
            id="case-study-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const functionName = import.meta.env.VITE_EDGE_FUNCTION_NAME || "email-services";
              const payload = {
                to: import.meta.env.VITE_CONTACT_EMAIL,
                from: import.meta.env.VITE_FROM_EMAIL,
                subject: `TCES Case Study Inquiry from ${form.name.value}`,
                html: `<p><strong>Name:</strong> ${form.name.value}</p><p><strong>Phone:</strong> ${form.phone.value}</p><p><strong>Company:</strong> ${form.company.value}</p><p><strong>Email:</strong> ${form.email.value}</p><p><strong>Description:</strong> ${form.description.value}</p>`,
              };
              try {
                await sendEmail(functionName, payload);
                alert("Your project inquiry has been sent successfully!");
              } catch (err) {
                console.error(err);
                alert("Failed to send request. Please try again later.");
              }
              setContactOpen(false);
            }}
          >
            <TextField required fullWidth label="Full Name" name="name" margin="dense" />
            <TextField required fullWidth label="Email" name="email" type="email" margin="dense" />
            <TextField required fullWidth label="Phone Number" name="phone" margin="dense" type="tel" />
            <TextField fullWidth label="Company / Business Name" name="company" margin="dense" />
            <TextField
              fullWidth
              label="Tell us about your project requirements"
              name="description"
              multiline
              rows={3}
              margin="dense"
            />
          </form>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setContactOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button type="submit" form="case-study-form" variant="contained" sx={{ bgcolor: "#2563EB" }}>
            Submit Inquiry
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
