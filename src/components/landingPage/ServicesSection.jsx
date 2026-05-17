import { useEffect, useRef, useState, useContext } from "react";
import { Box, Button, Container, Typography, Stack, Chip } from "@mui/material";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeContext } from "../../appConstant";
import { useAppointment } from "../../context/AppointmentContext";

// ─── Services Data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "⚡",
    badge: "React & Next.js",
    badgeColor: "#3B6EF8",
    title: "Website Development",
    desc: "High-performance websites that reflect your brand and convert users optimized for speed, security, and scalability.",
    features: ["Design + Framer Development", "Interactive Elements"],
    cta: false,
  },
  {
    icon: "✦",
    badge: "Shopify & Custom",
    badgeColor: "#8B5CF6",
    title: "E-commerce Solutions",
    desc: "Robust online stores with seamless shopping experiences, custom features, and backend systems built to grow with your business.",
    features: ["Files + Branding Assets", "Easy to Edit and Access"],
    cta: false,
  },
  {
    icon: "✦",
    badge: "Multi-Tenant Systems",
    badgeColor: "#8B5CF6",
    title: "CMS & SaaS Platforms",
    desc: "End-to-end development of scalable platforms from content management tools to subscription-based SaaS products with multi-user access.",
    features: ["Files + Branding Assets", "Easy to Edit and Access"],
    cta: false,
  },
  {
    icon: "✦",
    badge: "Real-time Insights",
    badgeColor: "#8B5CF6",
    title: "ERP & Business Dashboards",
    desc: "Custom internal systems to track operations, visualize data, and support decision-making with real-time dashboards.",
    features: ["Branding Assets", "User-Friendly Interface"],
    cta: false,
  },
  {
    icon: "✦",
    badge: "Interactive Portals",
    badgeColor: "#8B5CF6",
    title: "Custom Web Applications",
    desc: "Fully tailored web apps aligned with your business logic from client portals to booking systems and workflow tools.",
    features: ["Files + Branding Assets", "Easy to Edit and Access"],
    cta: false,
  },
  {
    icon: "◈",
    badge: "Figma & Wireframes",
    badgeColor: "#3B6EF8",
    title: "UX/UI Design",
    desc: "User-first design that enhances functionality and builds trust every screen, flow, and detail crafted for clarity and experience.",
    features: ["HTML + JavaScript + React Code", "Database and Back-End"],
    cta: false,
  },
];

// ─── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const { openDialog } = useAppointment();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isPurple = service.badgeColor === "#8B5CF6";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        // position: "sticky",
        // top: 88 + index * 20,
        // zIndex: index + 1,
        marginBottom: 20,
      }}
    >
      <Box
        sx={{
          borderRadius: "16px",
          border: "1px solid rgba(59,110,248,0.13)",
          background:
            "linear-gradient(148deg, rgba(10,18,58,0.94) 0%, rgba(6,11,34,0.97) 100%)",
          backdropFilter: "blur(20px)",
          p: { xs: 3, md: 3.5 },
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 8px 40px rgba(0,0,24,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: isPurple
              ? "rgba(139,92,246,0.4)"
              : "rgba(59,110,248,0.38)",
            boxShadow: isPurple
              ? "0 16px 56px rgba(0,0,36,0.65), 0 0 0 1px rgba(139,92,246,0.22), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "0 16px 56px rgba(0,0,36,0.65), 0 0 0 1px rgba(59,110,248,0.22), inset 0 1px 0 rgba(255,255,255,0.07)",
          },
        }}
      >
        {/* Inner glow blob */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: isPurple
              ? "radial-gradient(ellipse at 15% 40%, rgba(139,92,246,0.12) 0%, transparent 55%)"
              : "radial-gradient(ellipse at 15% 40%, rgba(59,110,248,0.11) 0%, transparent 55%)",
          }}
        />

        {/* Icon + Badge row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: isPurple
                ? "rgba(139,92,246,0.13)"
                : "rgba(59,110,248,0.12)",
              border: `1px solid ${isPurple ? "rgba(139,92,246,0.28)" : "rgba(59,110,248,0.26)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: isPurple ? "#b794ff" : "#7da4ff",
            }}
          >
            {service.icon}
          </Box>
          <Chip
            label={service.badge}
            size="small"
            sx={{
              background: isPurple
                ? "rgba(139,92,246,0.15)"
                : "rgba(59,110,248,0.13)",
              border: `1px solid ${isPurple ? "rgba(139,92,246,0.32)" : "rgba(59,110,248,0.28)"}`,
              color: isPurple ? "#b794ff" : "#7da4ff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.4,
              "& .MuiChip-label": { px: 1.5 },
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            color: "#fff",
            mb: 1.2,
            position: "relative",
            zIndex: 1,
          }}
        >
          {service.title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: 13.5,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.75,
            mb: 2.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          {service.desc}
        </Typography>

        {/* Price + Duration pills */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ mb: 2.5, position: "relative", zIndex: 1 }}
        >
        {service.price &&  <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              display: "flex",
              alignItems: "baseline",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{

                fontWeight: 800,
                fontSize: 15,
                color: "#fff",
              }}
            >
              {service.price}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
              / Project
            </Typography>
          </Box>}
         {service.duration&& <Box
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
              }}
            >
              {service.duration} Week
            </Typography>
          </Box>}
        </Stack>

        {/* Feature list */}
        <Stack
          spacing={1}
          sx={{ mb: service.cta ? 3 : 0, position: "relative", zIndex: 1 }}
        >
          {service.features.map((f) => (
            <Stack key={f} direction="row" spacing={1.2} alignItems="center">
              <CheckCircleIcon
                sx={{ color: service.badgeColor, fontSize: 15, flexShrink: 0 }}
              />
              <Typography
                sx={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 500,
                }}
              >
                {f}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* CTA — only on last card */}
        {service.cta && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ position: "relative", zIndex: 1, display: "inline-block" }}
          >
            <Button
              variant="contained"
              onClick={openDialog}
              sx={{
                px: 3,
                py: 1.2,
                fontSize: 13.5,
                fontWeight: 700,
                background: "linear-gradient(135deg, #3B6EF8, #5b8fff)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.14)",
                textTransform: "none",
                boxShadow:
                  "0 4px 18px rgba(59,110,248,0.38), inset 0 1px 0 rgba(255,255,255,0.18)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2a5ce8, #4a7ef0)",
                  boxShadow: "0 6px 26px rgba(59,110,248,0.52)",
                },
              }}
            >
              Book an Appointment
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
}

// ─── ServicesSection — default export ─────────────────────────────────────────
// Usage: import ServicesSection from "./ServicesSection";
// Requires: @mui/material, framer-motion, @mui/icons-material
// Theme: dark background #020718, accent #3B6EF8, font Syne + Plus Jakarta Sans
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.04, 1, 1.04],
  );

  const { scrollY } = useContext(ThemeContext);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [layout, setLayout] = useState({ absoluteTop: 0, maxScroll: 0 });

  useEffect(() => {
    const updateMeasurements = () => {
      const right = rightRef.current;
      const left = leftRef.current;
      if (!right || !left) return;
      const rightRect = right.getBoundingClientRect();
      const leftRect = left.getBoundingClientRect();

      setLayout({
        absoluteTop: rightRect.top + scrollY.get(),
        maxScroll: Math.max(0, rightRect.height - leftRect.height)
      });
    };

    setTimeout(updateMeasurements, 100);
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, [scrollY]);

  // Framer Motion automatically batches this useTransform with the global smooth scroll update!
  const stickyY = useTransform(scrollY, (currentScrollY) => {
    if (layout.maxScroll === 0) return 0;
    const topOffset = typeof window !== "undefined" ? window.innerHeight * 0.20 : 150;
    const scrolled = currentScrollY - layout.absoluteTop + topOffset;
    return Math.max(0, Math.min(scrolled, layout.maxScroll));
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        background: "#020718",
        position: "relative",
        clipPath: "inset(0)", // replaces overflow: "hidden" to allow position: sticky
        py: { xs: 8, md: 14 },
      }}
    >
      {/* Ambient glows */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "-8%",
          width: { xs: 220, md: 500 },
          height: { xs: 220, md: 500 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,110,248,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "-5%",
          width: { xs: 180, md: 380 },
          height: { xs: 180, md: 380 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 6, lg: 10, xl: 14 },
            alignItems: "flex-start",
          }}
        >
          {/* ── Left: sticky image + copy ── */}
          <Box
            component={motion.div}
            ref={leftRef}
            style={{ y: stickyY }}
            sx={{
              flex: "0 0 auto",
              width: { xs: "100%", lg: "42%", xl: "44%" },
              alignSelf: "flex-start",
              willChange: "transform",
            }}
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
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
                  OUR SERVICES
                </Typography>
              </Stack>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "2.8rem",
                    xl: "3.2rem",
                  },
                  color: "#fff",
                  lineHeight: 1.15,
                  mb: 1.5,
                }}
              >
                End-to-End Development,
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "2.8rem",
                    xl: "3.2rem",
                  },
                  color: "#3B6EF8",
                  lineHeight: 1.15,
                  mb: 3,
                }}
              >
                From Idea to Deployment
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15.5 },
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  mb: { xs: 4, lg: 5 },
                  maxWidth: 460,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Whether you're starting from scratch or scaling an existing product, we cover every layer of the stack — so you work with one trusted team, not a patchwork of vendors.
              </Typography>
            </motion.div>
          </Box>

          {/* ── Right: stacking cards ── */}
          <Box ref={rightRef} sx={{ flex: 1 }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
