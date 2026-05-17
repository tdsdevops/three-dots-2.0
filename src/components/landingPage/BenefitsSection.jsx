import React, { useRef } from "react";
import { Box, Button, Container, Typography, Stack, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useAppointment } from "../../context/AppointmentContext";

const TAGS_ROW1 = ["Senior-Led", "Complete Transparency", "Full IP Transfer", "GDPR Ready", "OWASP Secure", "Reliable Delivery"];

// Glass card wrapper
function GlassCard({ children, sx = {}, glowColor = "#3B6EF8", delay = 0, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "100%" }}
    >
      <Box sx={{
        height: "100%",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(148deg, rgba(8,16,52,0.85) 0%, rgba(5,10,30,0.92) 100%)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 8px 40px rgba(0,0,20,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: `${glowColor}55`,
          transform: "translateY(-4px)",
          boxShadow: `0 20px 60px rgba(0,0,30,0.7), 0 0 0 1px ${glowColor}25, inset 0 1px 0 rgba(255,255,255,0.08)`,
        },
        ...sx,
      }}>
        {/* Ambient inner glow */}
        <Box sx={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at 20% 30%, ${glowColor}10 0%, transparent 60%)`,
        }} />
        {children}
      </Box>
    </motion.div>
  );
}

export default function BenefitsSection() {
  const { openDialog } = useAppointment();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const benefits = [
    {
      title: "Senior-led engineering, always",
      desc: "Your project is handled by experienced engineers — not handed off to juniors after the sales call. We maintain high quality at every stage of delivery.",
      image: "benefit_senior_led.png",
      glowColor: "#3B6EF8"
    },
    {
      title: "Complete transparency on progress and cost",
      desc: "Weekly updates, shared project boards, and no surprise invoices. You know exactly where your product stands and what it costs — at all times.",
      image: "benefit_transparency.png",
      glowColor: "#8B5CF6"
    },
    {
      title: "Code you actually own",
      desc: "Clean, documented, well-tested code delivered with full IP transfer. Your codebase is an asset — we make sure it stays one long after our engagement ends.",
      image: "benefit_ownership.png",
      glowColor: "#10B981"
    },
    {
      title: "Security and compliance baked in",
      desc: "OWASP-aligned development practices, GDPR-ready data handling, and security reviews are standard — not optional add-ons.",
      image: "benefit_security.png",
      glowColor: "#F59E0B"
    }
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{ background: "#020718", position: "relative", overflow: "hidden", py: { xs: 10, md: 16 } }}
    >
      {/* Decorative ambient glows */}
      <Box sx={{ position: "absolute", top: "15%", left: "20%", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,110,248,0.06) 0%, transparent 70%)", filter: "blur(90px)", pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: "10%", right: "8%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <Container maxWidth="xl">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#3B6EF8", boxShadow: "0 0 8px #3B6EF8" }} />
            <Typography sx={{ fontSize: 12, color: "#7da4ff", fontWeight: 700, letterSpacing: 1.5, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              BENEFITS
            </Typography>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.08 }}>
          <Typography sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
            color: "#fff", lineHeight: 1.15, mb: 1.5,
          }}>
            Why Clients Choose
          </Typography>
          <Typography sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
            color: "#3B6EF8", lineHeight: 1.15, mb: 4,
          }}>
            Three Dots
          </Typography>
        </motion.div>

        {/* ── Tag pills ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18 }}>
          <Stack direction="row" flexWrap="wrap" gap={1.2} sx={{ mb: 6 }}>
            {TAGS_ROW1.map((tag) => (
              <Box key={tag} sx={{
                px: 1.8, py: 0.6, borderRadius: "8px", fontSize: 12, fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.03)",
                transition: "border-color 0.25s, color 0.25s",
                "&:hover": { borderColor: "rgba(59,110,248,0.4)", color: "#fff" },
                cursor: "default",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{tag}</Box>
            ))}
          </Stack>
        </motion.div>

        {/* ── Bento Grid (2x2 Balanced layout) ── */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}>
          {benefits.map((b, i) => (
            <GlassCard key={i} glowColor={b.glowColor} delay={0.1 * i} inView={inView}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Hero image with neon color overlay */}
                <Box sx={{ position: "relative", height: { xs: 180, sm: 220, md: 240 }, overflow: "hidden" }}>
                  <Box
                    component="img"
                    src={b.image}
                    alt={b.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.7) saturate(1.1)",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.03)"
                      }
                    }}
                  />
                  {/* Subtle neon gradient mask */}
                  <Box sx={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(180deg, rgba(2,7,24,0) 20%, rgba(2,7,24,0.7) 100%)`,
                  }} />
                </Box>

                {/* Card Description */}
                <Box sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography sx={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: "1.15rem", md: "1.3rem" },
                      color: "#fff",
                      mb: 1.5
                    }}>
                      {b.title}
                    </Typography>
                    <Typography sx={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      {b.desc}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </GlassCard>
          ))}
        </Box>

      </Container>
    </Box>
  );
}