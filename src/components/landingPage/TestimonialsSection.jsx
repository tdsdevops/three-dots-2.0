import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";


function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "linear-gradient(150deg, rgba(12,20,60,0.85) 0%, rgba(6,10,32,0.92) 100%)",
          backdropFilter: "blur(12px)",
          p: { xs: 2.8, md: 3.2 },
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 30px rgba(0,0,20,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            borderColor: "rgba(59,110,248,0.28)",
            boxShadow: "0 12px 48px rgba(0,0,30,0.6), 0 0 0 1px rgba(59,110,248,0.15), inset 0 1px 0 rgba(255,255,255,0.07)",
            transform: "translateY(-3px)",
          },
          display:"flex",
          justifyContent:"space-between",
          flexDirection:"column",
       
        }}
      >
        {/* Subtle inner glow */}
        <Box sx={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 10% 30%, rgba(59,110,248,0.08) 0%, transparent 55%)",
        }} />

        {/* Top row: avatar + X icon */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, position: "relative", zIndex: 1 }}>
        {t.avatar ? <Box
          component="img"
          src={t.avatar}
          alt={t.name}
          sx={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(59,110,248,0.3)", objectFit: "cover" }}
        />:<Box
          component="img"
          src={"https://cdn-icons-png.flaticon.com/512/8345/8345328.png?w=200&h=200&fit=crop"}
          alt={t.name}
          sx={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(59,110,248,0.3)", objectFit: "cover" }}
        />}
          {/* X / Twitter icon */}
          <Box sx={{
            width: 28, height: 28, borderRadius: "6px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 700, fontFamily: "monospace",
            cursor: "pointer",
            "&:hover": { color: "#fff", background: "rgba(255,255,255,0.1)" },
          }}>
            𝕏
          </Box>
        </Box>

        {/* Stars */}
        <Stack direction="row" spacing={0.3} sx={{ mb: 1.8, position: "relative", zIndex: 1 }}>
          {[...Array(t.stars)].map((_, i) => (
            <StarIcon key={i} sx={{ color: "#FFA928", fontSize: 15 }} />
          ))}
        </Stack>

        {/* Quote */}
        <Typography sx={{
          fontSize: { xs: 13, md: 13.5 },
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.72,
          mb: 2.5,
          position: "relative", zIndex: 1,
          fontStyle: "italic",
        }}>
          "{t.quote}"
        </Typography>

        {/* Divider */}
        <Box sx={{ height: "1px", background: "rgba(255,255,255,0.06)", mb: 2, position: "relative", zIndex: 1 }} />

        {/* Author */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <Typography sx={{  fontWeight: 700, fontSize: 13.5, color: "#fff" }}>
              {t.name}
            </Typography>
            <Box sx={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
            <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
              {t.role}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.35)", mt: 0.3 }}>
            {t.company}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

// ─── Testimonials Section ─────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    avatar: "",
    stars: 5,
    quote: "Much awaited and revolutionary change @msindustries.chennai . Thanks to BIM Automation, real-time stock updates & quicker turnarounds are now LIVE! 🛠️ Your orders just got a major upgrade. Amazing work by @threedotssoftwaredevelopment , delivering fast and smart design results"    ,
    name: "Fatema Anjarwala",
    role: "Director",
    company: "MS Industries",
  },
  {
    avatar: "",
    stars: 5,
    quote: "The team understood our complex requirements and provided a user-friendly, high-performing franchise management system",
    name: "Senthil Nathan",
    role: "Director, CEO",
    company: "Smatal Computer Academy",
  },
  {
    avatar: "",
    stars: 5,
    quote: "Three Dots transformed our digital presence with a sleek, user-friendly website that has enhanced customer engagement and streamlined our business operations.",
    name: "Sachithanantham Santhosam",
    role: "Founder & CEO",
    company: "Velaivendum.com",
  }
];

const BRANDS = ["IPSUM", "∞∞", "GOGO", "AMEX"];
  return (
    <Box
      ref={sectionRef}
      sx={{
        background: "#020718",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, md: 14 },
        pb: { xs: 10, md: 16 },
      }}
    >
      {/* Top separator line */}
      <Box sx={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
      }} />

      {/* Background glows */}
      <Box sx={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: { xs: 300, md: 700 }, height: { xs: 200, md: 400 },
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(59,110,248,0.09) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      {/* Bottom V-shape glow (matches screenshot) */}
      <Box sx={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "80%", height: { xs: 120, md: 220 },
        background: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(59,110,248,0.14) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <Container maxWidth="xl">
        {/* ── Header ── */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#3B6EF8", boxShadow: "0 0 8px #3B6EF8" }} />
              <Typography sx={{ fontSize: 12, color: "#7da4ff", fontWeight: 700, letterSpacing: 1.5 }}>
                TESTIMONIAL
              </Typography>
            </Stack>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.08 }}>
            <Typography sx={{
              fontSize: { xs: "1.9rem", sm: "2.5rem", md: "3rem", lg: "3.4rem" },
              color: "#fff", lineHeight: 1.15, mb: 0.5,
            }}>
              Customer Reviews About
            </Typography>
            <Typography sx={{
              fontSize: { xs: "1.9rem", sm: "2.5rem", md: "3rem", lg: "3.4rem" },
              color: "rgba(255,255,255,0.75)", lineHeight: 1.15, mb: 2.5,
            }}>
              Work, Usability and Design.
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.16 }}>
            <Typography sx={{
              fontSize: { xs: 14, md: 15 }, color: "rgba(255,255,255,0.45)",
              maxWidth: 460, mx: "auto", lineHeight: 1.75, mb: 4,
            }}>
              Hear from our happy clients! See how we've helped them achieve their goals and create lasting impact.
            </Typography>
          </motion.div>

          {/* Brand logos strip */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.22 }}>
            <Stack
              direction="row" spacing={{ xs: 3, md: 5 }}
              justifyContent="center" alignItems="center"
              sx={{ mb: 4, flexWrap: "wrap", gap: 2 }}
            >
              {BRANDS.map((b) => (
                <Typography key={b} sx={{
                  color: "rgba(255,255,255,0.18)", fontWeight: 700,
                  fontSize: { xs: 11, md: 13 }, letterSpacing: 2,
                  fontFamily: b === "∞∞" ? "Syne" : "inherit",
                }}>
                  {b}
                </Typography>
              ))}
            </Stack>
          </motion.div>

          {/* View About Landin button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.28 }}
            style={{ display: "inline-block" }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
              <Button
                variant="contained"
                sx={{
                  px: { xs: 3, md: 4 }, py: { xs: 1.2, md: 1.5 },
                  fontSize: { xs: 13.5, md: 14.5 }, fontWeight: 700,
                  background: "linear-gradient(135deg, #3B6EF8, #5b8fff)",
                  borderRadius: "10px",
                  textTransform: "none",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 4px 20px rgba(59,110,248,0.38), inset 0 1px 0 rgba(255,255,255,0.18)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2a5ce8, #4a7ef0)",
                    boxShadow: "0 6px 28px rgba(59,110,248,0.55)",
                  },
                }}
              >
                View About Landin
              </Button>
            </motion.div>
          </motion.div>
        </Box>

        {/* ── Testimonial Grid ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default TestimonialsSection