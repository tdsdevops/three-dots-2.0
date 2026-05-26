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

export default function PrivacyPolicy() {
  const lastUpdated = "May 22, 2026";

  return (
    <>
      <SEO pageKey="privacy" />
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
                PRIVACY MATTERS
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
                Privacy Policy
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
                    Key Commitments
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#3B6EF8", fontWeight: 600 }}>
                        Data Protection
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        We implement industry-standard technical measures to encrypt and protect your confidential information.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#3B6EF8", fontWeight: 600 }}>
                        No Data Selling
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        We never sell, trade, rent, or monetize your personal or business data to third-party advertisers.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: "#3B6EF8", fontWeight: 600 }}>
                        User Control
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        You have full control to request access, correction, or deletion of your information from our databases.
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
                      1. Overview & Commitment
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      At <strong>{generalInfo.companyName}</strong>, accessible via https://three-dots.in, one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document outlines the types of information we collect, record, and how we utilize and safeguard it.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      If you have any questions or require more information about our Privacy Policy, please do not hesitate to contact us. This policy applies to our online activities and website usage, as well as offline communication during software consulting.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      2. Information We Collect
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      We collect information to deliver premium consulting and software development services. This details:
                    </Typography>
                    <Typography component="div" variant="body1" sx={{ lineHeight: 1.7, pl: 2 }}>
                      <ul>
                        <li><strong>Personal Identification Details:</strong> Name, business email, contact phone number, company name when you request a quote or book a consultation.</li>
                        <li><strong>Project Specifications:</strong> Core feature details, business flow requirements, branding files, and system designs provided during engagement.</li>
                        <li><strong>Log Files & Analytics:</strong> Standard usage stats including IP address, browser type, referral URL, page activity, and timestamps gathered through analytics.</li>
                      </ul>
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      3. How We Use Your Information
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      We utilize the collected information to support our operations and improve your experience, specifically to:
                    </Typography>
                    <Typography component="div" variant="body1" sx={{ lineHeight: 1.7, pl: 2 }}>
                      <ul>
                        <li>Provide, operate, and maintain our custom software services and deliverables.</li>
                        <li>Enhance, personalize, and expand our website layout, speeds, and content.</li>
                        <li>Respond to inquiries, send project updates, and communicate system announcements.</li>
                        <li>Send professional marketing emails and service updates (which you can opt-out of at any time).</li>
                        <li>Identify, prevent, and mitigate security threats, fraud, or system exploits.</li>
                      </ul>
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      4. Data Security & Storage
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      We employ comprehensive technical and administrative security measures (such as SSL encryption, firewalls, and secure databases) to protect your personal and project information against unauthorized access, loss, or alteration.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      5. Sharing & Disclosure
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      We do not sell, trade, or lease your personal or business data. We may share information with trusted third-party subcontractors, hosting providers, or tool integrations under strictly binding Non-Disclosure Agreements (NDAs) to complete project work.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      We reserve the right to disclose information if required by law, to enforce our site policies, or to protect our rights, safety, or properties.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      6. Cookies and Tracking Technologies
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      Our website utilizes standard "cookies" to store information about visitor preferences and pages accessed. This optimizes the webpage interface and customizes content dynamically based on your browser type.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      You can choose to disable cookies through your individual browser options. However, some sections of our digital interfaces may not function at optimal speed or usability.
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      7. Your Rights & Data Choices
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                      Depending on your location, you may have specific data rights, including:
                    </Typography>
                    <Typography component="div" variant="body1" sx={{ lineHeight: 1.7, pl: 2 }}>
                      <ul>
                        <li>The right to request copies of your personal data held by us.</li>
                        <li>The right to request correction of any inaccurate or incomplete details.</li>
                        <li>The right to request that we delete or erase your personal details under certain conditions.</li>
                        <li>The right to request restriction or object to the processing of your data.</li>
                      </ul>
                    </Typography>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontFamily: "DM Sans", fontWeight: 700, color: "#fff", mb: 2 }}
                    >
                      8. Contacting Our Data Officer
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      If you wish to access, change, or request removal of your personal information, or if you have questions about our data practices, please reach out to us:
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
