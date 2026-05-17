import {useRef} from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, useInView } from 'framer-motion';


function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "clip",
        py: { xs: 8, md: 14 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: { xs: 300, md: 700 },
          height: { xs: 300, md: 500 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,110,248,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" ref={ref}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            gap: { xs: 6, md: 10, xl: 14 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1 }}
          >
            <Box
              sx={{
                position: "relative",
                maxWidth: { xs: "100%", md: 440, xl: 520 },
              }}
            >
              <Box
                component="img"
                src="about_halftone_human.png"
                alt="Blue halftone tech illustration with human network"
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  display: "block",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  position: "absolute",
                  bottom: -24,
                  right: -24,
                  background: "rgba(6,13,36,0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(59,110,248,0.25)",
                  borderRadius: 16,
                  padding: "14px 20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#7da4ff",
                    fontWeight: 700,
                    letterSpacing: 1,
                    mb: 0.5,
                  }}
                >
                  GROWTH
                </Typography>
                <Typography
                  sx={{
                    fontSize: 22,
                    
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  +47%
                </Typography>
                <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                  New Customers
                </Typography>
              </motion.div>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 2.5 }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#3B6EF8",
                    boxShadow: "0 0 8px #3B6EF8",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#7da4ff",
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  ABOUT THREEDOTS
                </Typography>
              </Stack>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3rem",
                    xl: "3.6rem",
                  },
                  color: "#fff",
                  lineHeight: 1.12,
                  mb: 1,
                  fontWeight: 400,
                  fontFamily: "DM Sans",
                }}
              >
                From Heart to Code
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3rem",
                    xl: "3.6rem",
                  },
                  color: "#3B6EF8",
                  lineHeight: 1.12,
                  mb: 3,
                  fontWeight: 400,
                  fontFamily: "DM Sans",
                }}
              >
                We believe technology should feel human.
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.75,
                  fontSize: { xs: 14, md: 15 },
                  mb: 4,
                  maxWidth: 480,
                }}
              >
                We're a small team with big hearts, crafting websites and
                software with care — like it's our own. Every project is a
                partnership, not just a task.
              </Typography>
              <Stack spacing={2} sx={{ mb: 5 }}>
                {[
                  "We're not just building code",
                  "we're building your dream, dot by dot.",
                ].map((item) => (
                  <Stack
                    key={item}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                  >
                    <CheckCircleIcon
                      sx={{ color: "#3B6EF8", fontSize: 18, flexShrink: 0 }}
                    />
                    <Typography
                      sx={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems={{ sm: "center" }}
              >
                <Button
                  variant="contained"
                  href="about"
                  sx={{
                    px: 4,
                    py: 1.4,
                    fontSize: 14,
                    background: "#3B6EF8",
                    "&:hover": { background: "#2a5ce8" },
                    alignSelf: "flex-start",
                  }}
                >
                  View more
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection