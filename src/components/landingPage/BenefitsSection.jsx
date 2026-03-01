import { useRef } from "react";
import { Box, Button, Container, Typography, Stack, Chip } from "@mui/material";
import { motion, useInView } from "framer-motion";
import BookAppointmentButton from "../../shared/buttons/BookAppointmentButton";
import LinkButton from "../../shared/LinkButton";
import AppButton from "../../shared/AppButton";

// ─── Data ──────────────────────────────────────────────────────────────────────
const TAGS_ROW1 = [
  "Enhanced UX",
  "Boosted Conversions",
  "Fast Loading",
  "SEO Optimized",
  "Customisable",
  "Scalable",
];
const TAGS_ROW2 = [
  "Increased Engagement",
  "Expandable",
  "Secure",
  "User-Friendly",
];

const FEATURE_CARDS = [
  {
    id: "requests",
    size: "large", // spans full left column top
    image:
      "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=700&auto=format&fit=crop&q=80",
    imageOverlay: true,
    glowColor: "#3B6EF8",
    label: null,
    badge: null,
    title: "Submit Unlimited Requests",
    desc: "Enjoy the freedom to submit unlimited requests without any restrictions. Whether you need design tweaks, we're here to assist you at every step.",
    cta: true,
  },
  {
    id: "revisions",
    size: "small-top",
    image: null,
    iconRow: ["F", "A"],
    iconLabels: ["Framer", "App Store"],
    glowColor: "#3B6EF8",
    badge: "NEW",
    title: "Requests & Revisions",
    desc: "Our process includes multiple rounds of requests and revisions, ensuring that your feedback is incorporated and that the final product meets your expectations.",
  },
  {
    id: "turnaround",
    size: "small-bottom-left",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
    imageStyle: "dark-number",
    glowColor: "#3B6EF8",
    badge: "NEW",
    title: "Quick Turnaround",
    desc: "We prioritize efficiency without compromising quality.",
  },
  {
    id: "publish",
    size: "small-bottom-mid",
    image:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&auto=format&fit=crop&q=80",
    glowColor: "#2563EB",
    badge: null,
    title: "Publish in Seconds",
    desc: "Publish your site in seconds with our streamlined process.",
  },
  {
    id: "pricing",
    size: "small-bottom-right",
    image: null,
    icon3d: "💎",
    glowColor: "#8B5CF6",
    badge: "NEW",
    title: "Worry-Free Pricing",
    desc: "Whether you're just starting or scaling up, our flexible pricing plans are designed to fit your needs and budget, so you can get started without any financial stress.",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function GlowBadge({ label, color = "#3B6EF8" }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.2,
        py: 0.35,
        borderRadius: "6px",
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.8,
        background:
          color === "#8B5CF6" ? "rgba(139,92,246,0.2)" : "rgba(59,110,248,0.2)",
        border: `1px solid ${color === "#8B5CF6" ? "rgba(139,92,246,0.4)" : "rgba(59,110,248,0.4)"}`,
        color: color === "#8B5CF6" ? "#c4b5fd" : "#7da4ff",
      }}
    >
      NEW
    </Box>
  );
}

// Glass card wrapper
function GlassCard({
  children,
  sx = {},
  glowColor = "#3B6EF8",
  delay = 0,
  inView,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.07)",
          background:
            "linear-gradient(148deg, rgba(10,18,52,0.92) 0%, rgba(6,10,30,0.96) 100%)",
          backdropFilter: "blur(18px)",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 8px 40px rgba(0,0,20,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "border-color 0.3s, box-shadow 0.3s",
          "&:hover": {
            borderColor: `${glowColor}44`,
            boxShadow: `0 16px 56px rgba(0,0,30,0.65), 0 0 0 1px ${glowColor}28, inset 0 1px 0 rgba(255,255,255,0.07)`,
          },
          ...sx,
        }}
      >
        {/* Ambient inner glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(ellipse at 20% 30%, ${glowColor}14 0%, transparent 60%)`,
          }}
        />
        {children}
      </Box>
    </motion.div>
  );
}

// ─── BenefitsSection ──────────────────────────────────────────────────────────
export default function BenefitsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <Box
      ref={sectionRef}
      sx={{
        background: "#020718",
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 14 },
      }}
    >
      {/* Ambient glows */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "30%",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,110,248,0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
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
              THREEDOTS BENEFITS
            </Typography>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem", xl: "3.5rem" },
              color: "#fff",
              lineHeight: 1.1,
              mb: 0.5,
            }}
          >
            We Just Don't Design, We Build.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem", xl: "3.5rem" },
              color: "#fff",
              lineHeight: 1.1,
              mb: 4,
            }}
          >
            If You Can Dream It, We Can Play It!
          </Typography>
        </motion.div>

        {/* ── Tag pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1 }}>
            {TAGS_ROW1.map((tag) => (
              <AppButton
                key={tag}
                btnText={tag}
                bgColor={"#ffffff26"}
                color="#ffffff"
                showBoxShadow={false}
              />
            ))}
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 6 }}>
            {TAGS_ROW2.map((tag) => (
              <AppButton
                key={tag}
                btnText={tag}
                bgColor={"#ffffff26"}
                color="#ffffff"
                showBoxShadow={false}
              />
            ))}
            <LinkButton
              to={"/contact"}
              element={<AppButton btnText={"Contact now"} />}
            />
          </Stack>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gridTemplateRows: { lg: "auto auto" },
            gap: 2,
          }}
        >
          {/* ── Card 1: Submit Unlimited Requests (large, spans 2 rows left) ── */}
          <GlassCard
            glowColor="#3B6EF8"
            delay={0.1}
            inView={inView}
            sx={{ gridRow: { lg: "1 / 3" } }}
          >
            {/* Hero image */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 200, sm: 220, lg: 260 },
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=700&auto=format&fit=crop&q=80"
                alt="Next button"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.75) saturate(1.3)",
                }}
              />
              {/* Blue neon glow overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(59,110,248,0.15) 0%, rgba(2,7,24,0.55) 100%)",
                }}
              />
              {/* Glowing arrow / "Next" text effect */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: 40, md: 52 },
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.12)",
                    textShadow: "0 0 60px rgba(59,110,248,0.8)",
                    letterSpacing: -2,
                  }}
                >
                  ❯
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                  color: "#fff",
                  mb: 1.2,
                }}
              >
                Submit Unlimited Requests
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  mb: 3,
                }}
              >
                Enjoy the freedom to submit unlimited requests without any
                restrictions. Whether you need design tweaks, we're here to
                assist you at every step.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                gap={1}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <BookAppointmentButton />
                </motion.div>
                <AppButton
                  btnText={"What is Three Dots?"}
                  bgColor={"#ffffff26"}
                  color="#ffffff"
                  showBoxShadow={false}
                />
              </Stack>
            </Box>
          </GlassCard>

          {/* ── Card 2: Requests & Revisions (top right area, spans 2 cols on lg) ── */}
          <GlassCard
            glowColor="#3B6EF8"
            delay={0.18}
            inView={inView}
            sx={{ gridColumn: { lg: "2 / 4" } }}
          >
            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                alignItems: "flex-start",
              }}
            >
              {/* App icons */}
              <Box sx={{ flexShrink: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {[
                    { letter: "F", color: "#3B6EF8", label: "Framer" },
                    { letter: "A", color: "#1C75DF", label: "App Store" },
                  ].map(({ letter, color, label }) => (
                    <Box key={letter} sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "14px",
                          background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
                          border: "1px solid rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          fontWeight: 900,
                          color: "#fff",
                          boxShadow: `0 4px 18px ${color}44`,
                          mb: 0.5,
                        }}
                      >
                        {letter}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 9,
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: 0.3,
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1.2 }}
                >
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}
                  >
                    Requests & Revisions
                  </Typography>
                  <GlowBadge />
                </Stack>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.75,
                  }}
                >
                  Our process includes multiple rounds of requests and
                  revisions, ensuring that your feedback is incorporated and
                  that the final product meets your expectations.
                </Typography>
              </Box>
            </Box>
          </GlassCard>

          {/* ── Card 3: Quick Turnaround ── */}
          <GlassCard glowColor="#3B6EF8" delay={0.26} inView={inView}>
            <Box sx={{ position: "relative", height: 120, overflow: "hidden" }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=400&auto=format&fit=crop&q=80"
                alt="Quick"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.5) saturate(0.8)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 36,
                    color: "rgba(255,255,255,0.9)",
                    textShadow: "0 0 30px rgba(59,110,248,0.6)",
                    letterSpacing: -1,
                  }}
                >
                  100,000
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(10,18,52,0.9) 100%)",
                }}
              />
            </Box>
            <Box sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}
                >
                  Quick Turnaround
                </Typography>
                <GlowBadge />
              </Stack>
              <Typography
                sx={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                }}
              >
                We prioritize efficiency without compromising quality.
              </Typography>
            </Box>
          </GlassCard>

          {/* ── Card 4: Publish in Seconds ── */}
          <GlassCard glowColor="#2563EB" delay={0.32} inView={inView}>
            <Box sx={{ position: "relative", height: 120, overflow: "hidden" }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80"
                alt="Publish"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.45) saturate(0.7)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(6,10,30,0.9) 100%)",
                }}
              />
              {/* Fake code/button UI overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-60%)",
                  px: 2,
                  py: 0.8,
                  borderRadius: "8px",
                  background: "rgba(59,110,248,0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 20px rgba(59,110,248,0.5)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: 0.5,
                  }}
                >
                  Publish
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: 2.5 }}>
              <Typography
                sx={{ fontWeight: 700, fontSize: "1rem", color: "#fff", mb: 1 }}
              >
                Publish in Seconds
              </Typography>
              <Typography
                sx={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                }}
              >
                Publish your site in seconds with our streamlined process.
              </Typography>
            </Box>
          </GlassCard>

          {/* ── Card 5: Worry-Free Pricing (spans full bottom-right on lg) ── */}
          <GlassCard glowColor="#8B5CF6" delay={0.38} inView={inView}>
            <Box
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 3D icon area */}
              <Box
                sx={{
                  width: "100%",
                  height: 120,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Purple glow bg */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.2) 0%, transparent 70%)",
                    borderRadius: "12px",
                  }}
                />
                {/* Orbiting circles decoration */}
                <Box
                  sx={{
                    position: "relative",
                    width: 90,
                    height: 90,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      border: "1px dashed rgba(139,92,246,0.3)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      width: 65,
                      height: 65,
                      borderRadius: "50%",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 34,
                      lineHeight: 1,
                      filter: "drop-shadow(0 0 16px rgba(139,92,246,0.8))",
                    }}
                  >
                    💎
                  </Typography>
                  {/* Orbiting dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      position: "absolute",
                      width: 90,
                      height: 90,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#8B5CF6",
                        boxShadow: "0 0 8px #8B5CF6",
                        mt: "-4px",
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1.2 }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}
                >
                  Worry-Free Pricing
                </Typography>
                <GlowBadge color="#8B5CF6" />
              </Stack>
              <Typography
                sx={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                }}
              >
                Whether you're just starting or scaling up, our flexible pricing
                plans are designed to fit your needs and budget, so you can get
                started without any financial stress.
              </Typography>
            </Box>
          </GlassCard>
        </Box>
      </Container>
    </Box>
  );
}
