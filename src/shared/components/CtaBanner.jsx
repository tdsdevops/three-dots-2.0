import { Box, Button, Chip, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import bgVdo from "../../assets/bgVdo.mp4";
import BookAppointmentButton from "../buttons/BookAppointmentButton";
import SectionChip from "./SectionChip";

const M = motion(Box);
function CtaBanner() {
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
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Container maxWidth="md"> */}
      <M
        {...fadeUp(0)}
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            borderRadius: { xs: 4, md: 5 },
            border: "1px solid rgba(255,255,255,0.12)",
            p: { xs: 5, sm: 7, md: 9 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 80px rgba(37,99,235,0.22)",
            width: "70%",
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
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SectionChip label="Join Us Now" />
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.4rem",
                  md: "3rem",
                  lg: "3.4rem",
                },
                lineHeight: 1.15,
                color: "#fff",
                mb: 2,
              }}
            >
              Each Project we Undertake{" "}
              <Box component="span" sx={{ color: "#cbd5e1", display: "block" }}>
                is a Unique Opportunity.
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "#cbd5e1",
                fontFamily: "DM Sans",
                fontSize: { xs: "0.875rem", md: "1rem" },
                maxWidth: "60%",
                mx: "auto",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Ready to take the next step? Join us now and start transforming
              your vision into reality with expert support.
            </Typography>
            <M
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block" }}
            >
              <BookAppointmentButton />
            </M>
          </Box>
        </Box>
      </M>
      {/* </Container> */}
    </Box>
  );
}

export default CtaBanner;
