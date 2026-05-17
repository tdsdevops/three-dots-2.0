import { useTransform } from "motion/react";
import React, { useContext, useRef } from "react";
import bgVdo from "../../assets/bgVdo.mp4";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import LiquidEther from "../../reactbits/LiquidEther";

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
  const videoRef = useRef(null);
  const { scrollY, fadeUp } = useContext(ThemeContext);
  const videoOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "clip",
        background: "#000000",
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
              <Chip
                label="No. 1 Studio of 2025"
                size="small"
                sx={{
                  mb: 3,
                  background: "rgba(59,110,248,0.15)",
                  border: "1px solid rgba(59,110,248,0.4)",
                  color: "#7da4ff",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: 0.5,
                  "& .MuiChip-label": { px: 1.5 },
                    textAlign:"center"
                }}
              />
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
                    xs: "2.6rem",
                    sm: "3.5rem",
                    md: "4.5rem",
                    xl: "5.5rem",
                  },
                  lineHeight: 1.08,
                  mb: 2.5,
                  color: "#fff",
                  textShadow: "0 0 80px rgba(59,110,248,0.3)",
                  fontWeight: 400,
                  fontFamily: "DM Sans",
                  textAlign: "center",  
                }}
              >
                Build Better.
                <br />
                Grow Smarter.
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
                  fontSize: { xs: 14, md: 15.5 },
                  color: "text.secondary",
                  maxWidth: 400,
                  lineHeight: 1.7,
                  mb: 4,
                  fontWeight: 400,
                  fontFamily: "DM Sans",
                  textAlign:"center"  ,
                  margin:"auto"
                }}
              >
                We help businesses launch reliable websites, powerful software,
                and scalable online stores — all under one roof.
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
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#fff",
                    px: { xs: 2.5, md: 3 },
                    py: 1.2,
                    fontSize: 14,
                    "&:hover": {
                      borderColor: "#fff",
                      background: "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  Connect With Us
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "rgba(59,110,248,0.18)",
                    border: "1px solid rgba(59,110,248,0.4)",
                    color: "#7da4ff",
                    px: { xs: 2.5, md: 3 },
                    py: 1.2,
                    fontSize: 14,
                    "&:hover": { background: "rgba(59,110,248,0.3)" },
                  }}
                >
                  What is Landin?
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
              borderTop: "1px solid rgba(255,255,255,0.07)",
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
