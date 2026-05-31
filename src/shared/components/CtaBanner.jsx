import { Box, Button, Chip, Container, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import bgVdo from "../../assets/bgVdo.mp4";
import { useAppointment } from "../../context/AppointmentContext";

function CtaBanner() {
  const { openDialog } = useAppointment();
  const M = motion(Box);
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  });
  return (
    <Box
      sx={{
        bgcolor: "#000",
        py: { xs: 6, md: 10 },
        px: 2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Container maxWidth="md">
        <M {...fadeUp(0)}>
          <Box
            sx={{
              borderRadius: { xs: 4, md: 5 },
              border: "1px solid rgba(255,255,255,0.12)",
              p: { xs: 5, sm: 7, md: 9 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 0 80px rgba(37,99,235,0.22)",
            }}
          >
            {/* ── Background video ── */}
            <Box
              component="video"
              src={bgVdo}
              autoPlay
              muted
              loop
              playsInline
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                opacity: 0.45,
              }}
            />

            {/* Dark + blue overlay so text stays readable */}
            {/* <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(6,6,20,0.72) 0%, rgba(10,10,62,0.68) 50%, rgba(6,6,20,0.72) 100%)", zIndex: 1, pointerEvents: "none" }} /> */}
            {/* Bottom glow */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(37,99,235,0.35) 0%, transparent 65%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* Content — sits above video & overlays */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Chip
                label="● Join Us Now"
                sx={{
                  bgcolor: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontFamily: "DM Sans",
                  fontSize: { xs: "0.72rem", md: "0.8rem" },
                  mb: 3,
                  backdropFilter: "blur(6px)",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: 800,
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2.4rem",
                    md: "3rem",
                    lg: "3.4rem",
                  },
                  lineHeight: 1.15,
                  color: "#fff",
                  mb: 2.5,
                }}
              >
                Ready to Build <br />
                <Box
                  component="span"
                  sx={{ color: "#3B6EF8", display: "inline" }}
                >
                  Something That Lasts?
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  maxWidth: 580,
                  mx: "auto",
                  lineHeight: 1.7,
                  mb: 4.5,
                }}
              >
                Tell us what you're working on. We'll review your project requirements and get back to you within one business day with an honest assessment — no sales pitch, no obligation.
              </Typography>
              <Stack

                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <M
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    variant="contained"
                    onClick={openDialog}
                    sx={{
                      background: "#3B6EF8",
                      color: "#fff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      px: { xs: 3.5, md: 4.5 },
                      py: { xs: 1.4, md: 1.7 },
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      boxShadow: "0 4px 20px rgba(59,110,248,0.35)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2a5ce8, #4a7ef0)",
                        boxShadow: "0 6px 26px rgba(59,110,248,0.5)",
                      },
                    }}
                  >
                    Book a free consultation
                  </Button>
                </M>
                <M
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    variant="outlined"
                    href="mailto:threedotssoftwaredevelopment@gmail.com"
                    sx={{
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      px: { xs: 3.5, md: 4.5 },
                      py: { xs: 1.4, md: 1.7 },
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      "&:hover": {
                        borderColor: "#fff",
                        background: "rgba(255,255,255,0.06)",
                      },
                    }}
                  >
                    Email us
                  </Button>
                </M>
              </Stack>
            </Box>
          </Box>
        </M>
      </Container>
    </Box>
  );
}

export default CtaBanner;
