import { useTransform } from "framer-motion";
import React, { useContext, useRef } from "react";
import bgVdo from "../../assets/bgVdo.mp4";
import { Box, Button, Chip, Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import LiquidEther from "../../reactbits/LiquidEther";
import { useAppointment } from "../../context/AppointmentContext";

// Stylized vector-based brands in monochrome white
const BRANDS = [
  {
    name: "MS industries",
    logo: "msi_logo.png"
  },
  {
    name: "Smatal",
    logo: "smatalLogo.svg"
  },
  {
    name: "velaivendum",
    logo: "velaivendumlogo.png"
  },
  {
    name: "Brandmicmedia",
    logo: "brandmicmedialogo.png"
  },
  {
    name:"three dots",
    logo:"TTM_Black Letter-b0a3f4ec.svg"
  }
];

function HeroSection() {
  const { openDialog } = useAppointment();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { scrollY, fadeUp } = useContext(ThemeContext);
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  const handleScrollToQuote = () => {
    const el = document.getElementById("request-quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "clip",
      }}
    >
      <motion.div
        style={{
          opacity: videoOpacity,
          scale: videoScale,
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
      <div style={{ width: '100%', height:"100%", position: 'relative' }}>
        <LiquidEther
          colors={[ '#5227FF', '#6366F1', '#6366F1' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          iterationsPoisson={16}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
        <Box sx={{ position: "absolute", inset: 0 }} />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "35%",
          }}
        />
      </motion.div>

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: { xs: 200, md: 380 },
          height: { xs: 200, md: 380 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,110,248,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "0%",
          width: { xs: 150, md: 280 },
          height: { xs: 150, md: 280 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,110,248,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          pt: { xs: "100px", md: "140px" },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { lg: "start" },
            justifyContent: "center",
            gap: { xs: 6, lg: 4 },
            minHeight: "80vh",
          }}
        >
          <Box textAlign="center"  sx={{ flex: 1, maxWidth: { lg: "55%" } }}>
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
            >
             
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.2rem",
                    sm: "3.2rem",
                    md: "4rem",
                    xl: "4.8rem",
                  },
                  lineHeight: 1.15,
                  mb: 2.5,
                  color: "#fff",
                  textShadow: "0 0 80px rgba(59,110,248,0.3)",
                  fontWeight: 700,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  textAlign: "center",  
                }}
              >
                We Build Software That Works — Exactly as Intended
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  color: "text.secondary",
                  maxWidth: 720,
                  lineHeight: 1.7,
                  mb: 4,
                  fontWeight: 400,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  textAlign:"center"  ,
                  margin:"1rem auto"
                }}
              >
                Three Dots is a product-focused software development company helping startups and growing businesses ship reliable, scalable digital products — on time and without the guesswork.
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                gap={1.5}
                justifyContent={"center"}
                margin={"1rem 0"}
              >
                <Button
                  variant="contained"
                  onClick={handleScrollToQuote}
                  fullWidth={isMobile ? true:false}
                   sx={{
                    px: 4,
                    py: 1.4,
                    fontSize: 14,
                    background: "#3B6EF8",
                    "&:hover": { background: "#2a5ce8" },
                    alignSelf: "flex-start",
                  }}
                >
                  Request a quote
                </Button>
                <Button
                  variant="outlined"
                  onClick={openDialog}
                  fullWidth={false}
                  sx={{
                    borderColor: "#3B6EF8",
                    color: "#3B6EF8",
                    px: { xs: 3.5, md: 4 },
                    py: 1.4,
                    fontSize: 14.5,
                    "&:hover": {
                      borderColor: "#3B6EF8",
                      background: "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  Book free consultation
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Box>

        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              mt: { xs: 6, md: 4 },
              pt: 4,
              overflow: "hidden",
              position: "relative",
              width: "100%",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                width: { xs: "40px", md: "100px" },
                zIndex: 2,
                pointerEvents: "none",
              },
              "&::before": {
                left: 0,
                background: "linear-gradient(to right, #000000 10%, rgba(0,0,0,0) 100%)",
              },
              "&::after": {
                right: 0,
                background: "linear-gradient(to left, #000000 10%, rgba(0,0,0,0) 100%)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                gap: { xs: "60px", md: "100px" },
                alignItems: "center",
                animation: "marquee 25s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
                "@keyframes marquee": {
                  "0%": { transform: "translateX(0%)" },
                  "100%": { transform: "translateX(-33.3333%)" },
                },
              }}
            >
              {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
                <Box
                  key={`${brand.name}-${idx}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "& img": {
                      height: { xs: "32px", md: "46px" },
                      width: "auto",
                      maxWidth: "180px",
                      objectFit: "contain",
                      filter: "grayscale(100%) brightness(0) invert(1) opacity(0.35)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    "&:hover img": {
                      filter: "grayscale(100%) brightness(0) invert(1) opacity(0.95) drop-shadow(0 0 12px rgba(255,255,255,0.5))",
                      transform: "scale(1.05) translateY(-2px)",
                    },
                  }}
                >
                  {brand?.logo && <img src={brand.logo} alt={brand.name} />}
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default HeroSection;
