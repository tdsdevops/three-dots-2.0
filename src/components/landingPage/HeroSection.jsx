import { useTransform } from "motion/react";
import React, { useContext, useRef } from "react";
import bgVdo from "../../assets/bgVdo.mp4";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";

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
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={bgVdo} type="video/mp4" />
        </video>
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
            alignItems: { lg: "center" },
            gap: { xs: 6, lg: 4 },
            minHeight: "80vh",
          }}
        >
          <Box sx={{ flex: 1, maxWidth: { lg: "55%" } }}>
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
          <Stack
            direction="row"
            spacing={{ xs: 3, md: 6 }}
            alignItems="center"
            sx={{
              mt: { xs: 4, md: 2 },
              pt: 3,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {["GOGO", "AMERICAN EXPRESS", "IPSUM"].map((brand) => (
              <Typography
                key={brand}
                sx={{
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 700,
                  fontSize: { xs: 10, md: 12 },
                  letterSpacing: 2,
                }}
              >
                {brand}
              </Typography>
            ))}
            <Box
              sx={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.08)",
                display: { xs: "none", md: "block" },
              }}
            />
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}

export default HeroSection;
