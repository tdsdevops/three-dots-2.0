import React from "react";
import { Box, Container, Typography, Stack, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import CtaBanner from "../../shared/components/CtaBanner";
import generalInfo from "../../data/generalInfo.json";
import SEO from "../SEO";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TermsAndConditions() {
  const lastUpdated = "May 22, 2026";

  return (
    <>
      <SEO pageKey="terms" />
      <Box
        sx={{
          bgcolor: "#020718",
          minHeight: "100vh",
          pt: { xs: 16, md: 20 },
          pb: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Glow */}
        <Box
          sx={{
            position: "absolute",
            width: { xs: 250, md: 600 },
            height: { xs: 250, md: 600 },
            borderRadius: "50%",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(59,110,248,0.15) 0%, transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Section */}
            <MotionBox variants={itemVariants} sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#3B6EF8",
                  fontWeight: 700,
                  letterSpacing: 2,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                }}
              >
                LEGAL AGREEMENT
              </Typography>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  color: "#fff",
                  lineHeight: 1.1,
                  mt: 1.5,
                  mb: 3,
                }}
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: { xs: "0.85rem", md: "0.95rem" } }}
              >
                Last Updated: {lastUpdated}
              </Typography>
            </MotionBox>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: { xs: 6, md: 8 } }} />

            {/* Grid Layout for Content */}
            <Grid container spacing={{ xs: 4, md: 6 }}>
              {/* Left Column - Navigation/Highlights */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    position: { md: "sticky" },
                    top: "120px",
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.06)",
                    bgcolor: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "DM Sans",
                      fontWeight: 700,
                      color: "#fff",
                      mb: 2.5,
                    }}
                  >
                    Quick Summary
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#3B6EF8", fontWeight: 600 }}>
                        Agreement to Terms
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        By engaging with {generalInfo.companyName}, you agree to comply with and be bound by these Terms & Conditions.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#3B6EF8", fontWeight: 600 }}>
                        Services & Scope
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        We deliver professional software development and design services according to defined, agreed-upon scopes of work.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#3B6EF8", fontWeight: 600 }}>
                        Intellectual Property
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        Upon full payment, ownership of custom deliverables transfers to the client, while core toolkits remain with ThreeDots.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* Right Column - Full Policy Content */}
              <Grid item xs={12} md={8}>
                <Stack spacing={5} sx={{ color: "text.secondary", fontFamily: "DM Sans" }}>
                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      1. Welcome & Introduction
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      Welcome to <strong>{generalInfo.studioName || generalInfo.companyName}</strong>. By accessing our website (https://three-dots.in) or utilizing our bespoke software development, design, and digital consulting services, you accept and agree to follow these Terms & Conditions in full.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      If you disagree with any part of these terms, you must not use our website or services. These terms form a legally binding contract between you (the client) and {generalInfo.companyName}.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      2. Project Scope & Deliverables
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      We provide custom web development, mobile app engineering, UI/UX design, cloud solutions, and optimization services. Each project requires a mutually signed Scope of Work (SOW) or Service Level Agreement (SLA) outlining exact timelines, costs, and deliverables.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      Any request for feature modifications, design adjustments, or extensions outside the initial SOW will be documented as a Change Request and may result in additional charges and timeline adjustments.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      3. Client Responsibilities & Input
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      To ensure seamless project completion, you agree to provide timely design assets, functional requirements, feedback, and credentials. Delays in client feedback or provision of assets will result in proportional timeline extensions.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      You are solely responsible for ensuring you have all legal rights to any content, media, credentials, or branding materials you supply to us for inclusion in your project.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      4. Payments, Milestones & Invoicing
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      Payments are structured around milestones as outlined in your SOW. Typically, an upfront deposit is required to initiate work. Invoices must be settled within the timeframe specified in the project agreement.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      Late payments may result in temporary project suspension. All deposits and milestone payments are non-refundable once work on that specific milestone has commenced.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      5. Intellectual Property Rights
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      Upon receipt of full final payment, ownership of custom deliverables (e.g., source code, design assets, and database schemas) will transfer to the client.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {generalInfo.companyName} retains ownership of all pre-existing tools, open-source libraries, modules, frameworks, and generic scripts created by {generalInfo.companyName} prior to or during the project, granting the client a non-exclusive, perpetual license to use them within the deliverables.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      6. Confidentiality
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      Both parties agree to treat all business information, source code, strategies, customer lists, and system architectures shared during the project as strictly confidential. Neither party will disclose proprietary details to third parties without prior written consent, except as required by law.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      7. Limitation of Liability
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      To the maximum extent permitted by law, {generalInfo.companyName} is not liable for any indirect, incidental, special, or consequential damages, including loss of profits, data loss, or server downtime, arising out of the use or inability to use our software deliverables. Our total liability is capped at the total amount paid by the client for the specific project milestone in question.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      8. Governing Law & Dispute Resolution
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      These Terms & Conditions are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Chennai, Tamil Nadu, India</strong>.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      9. Contacting Us
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      If you have any questions or require clarification on these Terms & Conditions, please contact our legal team at:
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1.5, color: "#fff", fontWeight: 600 }}>
                      Email: {generalInfo.email}
                      <br />
                      Phone: {generalInfo.phone}
                      <br />
                      Address: {generalInfo.address.line1}, {generalInfo.address.line2}, {generalInfo.address.country}
                    </Typography>
                  </MotionBox>
                </Stack>
              </Grid>
            </Grid>
          </MotionBox>
        </Container>
      </Box>
      <CtaBanner />
    </>
  );
}
