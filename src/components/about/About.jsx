import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { motion } from "framer-motion";
import bgVdo from "../../assets/bgVdo.mp4";
import CtaBanner from "../../shared/components/CtaBanner";
import { useAppointment } from "../../context/AppointmentContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2563EB" },
    background: { default: "#000000" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
  },
  typography: { fontFamily: "'Syne', 'DM Sans', sans-serif" },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
});

const M = motion(Box);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

/* ── Shared: Section header ── */
function SectionHeader({ badge, title, titleGray, subtitle, cta, ctaLabel }) {
  const { openDialog } = useAppointment();
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
      <M {...fadeUp(0)}>
        <Chip
          label={`● ${badge}`}
          sx={{
            bgcolor: "#111",
            color: "#fff",
            border: "1px solid #333",
            fontFamily: "DM Sans",
            fontSize: { xs: "0.72rem", md: "0.8rem" },
            mb: 3,
          }}
        />
      </M>
      <M {...fadeUp(0.1)}>
        <Typography
          sx={{
            
            fontWeight: 800,
            fontSize: {
              xs: "2rem",
              sm: "2.6rem",
              md: "3.2rem",
              lg: "3.8rem",
              xl: "4.2rem",
            },
            lineHeight: 1.15,
            mb: 2,
          }}
        >
          {title}
          {titleGray && (
            <Box component="span" sx={{ color: "#6b7280", display: "block" }}>
              {titleGray}
            </Box>
          )}
        </Typography>
      </M>
      {subtitle && (
        <M {...fadeUp(0.2)}>
          <Typography
            sx={{
              color: "#9ca3af",
              fontFamily: "DM Sans",
              fontSize: { xs: "0.875rem", md: "1rem" },
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.7,
              mb: cta ? 3.5 : 0,
            }}
          >
            {subtitle}
          </Typography>
        </M>
      )}
      {cta && (
        <M {...fadeUp(0.3)}>
          <M
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: "inline-block" }}
          >
            <Button
              variant="contained"
              onClick={openDialog}
              sx={{
                bgcolor: "#2563EB",
                color: "#fff",
                fontFamily: "DM Sans",
                fontWeight: 700,
                px: { xs: 3, md: 4 },
                py: 1.4,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: { xs: "0.875rem", md: "0.95rem" },
                boxShadow: "0 0 24px rgba(37,99,235,0.45)",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              {ctaLabel}
            </Button>
          </M>
        </M>
      )}
    </Box>
  );
}

/* ── Shared: Angular corner decoration ── */
function CornerDeco() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "10%",
        display: "flex",
        justifyContent: "space-between",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: { xs: 100, md: 200, lg: 260 },
          height: { xs: 70, md: 130 },
          background:
            "linear-gradient(135deg, #1a2a6c88 0%, #0d1a4a66 60%, transparent 100%)",
          clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)",
        }}
      />
      <Box
        sx={{
          width: { xs: 100, md: 200, lg: 260 },
          height: { xs: 70, md: 130 },
          background:
            "linear-gradient(225deg, #1a2a6c88 0%, #0d1a4a66 60%, transparent 100%)",
          clipPath: "polygon(45% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </Box>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        px: { xs: 2, sm: 3, md: 5 },
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(14px)",
        bgcolor: "rgba(0,0,0,0.65)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Typography
        sx={{
          
          fontWeight: 800,
          fontSize: { xs: "1.2rem", md: "1.4rem" },
          color: "#fff",
          letterSpacing: "-0.02em",
        }}
      >
        Landin
      </Typography>
      {!isSm && (
        <Box sx={{ display: "flex", gap: { md: 3, lg: 4 } }}>
          {["Home", "About", "Team", "Tools", "Contact"].map((item) => (
            <Typography
              key={item}
              sx={{
                fontFamily: "DM Sans",
                color: "#9ca3af",
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "color .2s",
                "&:hover": { color: "#fff" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )}
      <Button
        variant="contained"
        size="small"
        sx={{
          bgcolor: "#2563EB",
          color: "#fff",
          fontFamily: "DM Sans",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 2,
          px: { xs: 2, md: 2.5 },
          fontSize: { xs: "0.78rem", md: "0.875rem" },
          boxShadow: "none",
          "&:hover": { bgcolor: "#1d4ed8" },
        }}
      >
        Get Started
      </Button>
    </Box>
  );
}

/* ── SECTION 1: Hero ── */
function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 12, md: 14 },
        pb: { xs: 6, md: 10 },
        px: 2,
        position: "relative",
        overflow: "hidden",
        bgcolor: "#000",
      }}
    >
      {/* Background video */}
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
      {/* Dark gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Blue radial glow */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 300, md: 700 },
          height: { xs: 300, md: 700 },
          borderRadius: "50%",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* All content above video */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <M
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Chip
            label="2025  Dig Deep About Us"
            sx={{
              bgcolor: "#2563EB",
              color: "#fff",
              fontFamily: "DM Sans",
              fontWeight: 600,
              fontSize: { xs: "0.7rem", md: "0.8rem" },
              px: 1,
              mb: 4,
            }}
          />
        </M>

        <M
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          sx={{ textAlign: "center", maxWidth: 760 }}
        >
          <Typography
            sx={{
              
              fontWeight: 800,
              fontSize: {
                xs: "2.2rem",
                sm: "3rem",
                md: "4rem",
                lg: "4.8rem",
                xl: "5.5rem",
              },
              lineHeight: 1.1,
              color: "#fff",
              mb: 3,
            }}
          >
            Learn More About Landin
            <Box component="span" sx={{ display: "block" }}>
              Let's Deep Dive!
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontFamily: "DM Sans",
              maxWidth: 440,
              mx: "auto",
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            Landin is your go-to agency for creative thinking and marketing
            ideas. We specialize in digital business solutions.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <M whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  fontFamily: "DM Sans",
                  fontWeight: 600,
                  px: { xs: 2.5, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  backdropFilter: "blur(6px)",
                  bgcolor: "rgba(255,255,255,0.05)",
                  "&:hover": {
                    borderColor: "#2563EB",
                    bgcolor: "rgba(37,99,235,0.12)",
                  },
                }}
              >
                Connect With Us
              </Button>
            </M>
            <M whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(10,10,20,0.7)",
                  color: "#fff",
                  fontFamily: "DM Sans",
                  fontWeight: 600,
                  px: { xs: 2.5, md: 3 },
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "none",
                  backdropFilter: "blur(6px)",
                  "&:hover": { bgcolor: "rgba(20,20,40,0.8)" },
                }}
              >
                What is Landin?
              </Button>
            </M>
          </Box>
        </M>

        <M
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          sx={{
            mt: { xs: 5, md: 7 },
            width: "100%",
            maxWidth: { xs: "100%", sm: 580, md: 720, lg: 860, xl: 960 },
            mx: "auto",
          }}
        >
          <Box
            sx={{
              borderRadius: { xs: 3, md: 4 },
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 0 80px rgba(37,99,235,0.2)",
              aspectRatio: "16/9",
              position: "relative",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(ellipse at 60% 70%, #0d1a4a 0%, #050510 60%)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 60% 40% at 40% 60%, rgba(37,99,235,0.3) 0%, transparent 70%)",
              }}
            />
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              style={{ position: "absolute", opacity: 0.85 }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polygon
                points="80,15 95,60 145,60 105,88 120,130 80,103 40,130 55,88 15,60 65,60"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                filter="url(#glow)"
              />
            </svg>
            <M
              whileHover={{ scale: 1.12 }}
              style={{
                zIndex: 2,
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </M>
          </Box>
        </M>
      </Box>
    </Box>
  );
}

/* ── SECTIONS 2 & 3: About blocks ── */
function StarRating({ count }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box sx={{ display: "flex", gap: 0.4 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="#facc15"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </Box>
      <Typography
        sx={{
          color: "#9ca3af",
          fontFamily: "DM Sans",
          fontSize: { xs: "0.8rem", md: "0.875rem" },
        }}
      >
        {count}
      </Typography>
    </Box>
  );
}

function AboutBlock({
  imageRight = false,
  title,
  titleGray,
  points,
  ratingCount,
}) {
  const { openDialog } = useAppointment();
  const imgEl = (
    <M
      {...fadeUp(0)}
      sx={{
        flex: { md: "0 0 46%" },
        width: "100%",
        maxWidth: { xs: "100%", md: "46%" },
        order: { xs: 1, md: imageRight ? 2 : 1 },
      }}
    >
      <Box
        sx={{
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 60px rgba(37,99,235,0.2)",
          aspectRatio: "4/3",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="55%" height="55%" viewBox="0 0 200 200" opacity="0.22">
          <circle cx="100" cy="65" r="35" fill="#6b7280" />
          <ellipse cx="100" cy="165" rx="65" ry="50" fill="#6b7280" />
        </svg>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(to top, rgba(37,99,235,0.3) 0%, transparent 100%)",
          }}
        />
      </Box>
    </M>
  );

  const contentEl = (
    <M
      {...fadeUp(0.1)}
      sx={{ flex: 1, order: { xs: 2, md: imageRight ? 1 : 2 } }}
    >
      <Chip
        label="● About Landin"
        sx={{
          bgcolor: "#111",
          color: "#fff",
          border: "1px solid #333",
          fontFamily: "DM Sans",
          fontSize: { xs: "0.72rem", md: "0.8rem" },
          mb: 3,
        }}
      />
      <Typography
        sx={{
          
          fontWeight: 800,
          fontSize: {
            xs: "1.9rem",
            sm: "2.5rem",
            md: "3rem",
            lg: "3.5rem",
            xl: "4rem",
          },
          lineHeight: 1.15,
          mb: 4,
        }}
      >
        {title}
        <Box component="span" sx={{ color: "#6b7280", display: "block" }}>
          {titleGray}
        </Box>
      </Typography>
      {points.map((p, i) => (
        <M key={i} {...fadeUp(0.2 + i * 0.12)} sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontWeight: 700,
              fontSize: { xs: "0.95rem", md: "1rem" },
              color: "#fff",
              mb: 0.75,
            }}
          >
            {p.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              color: "#9ca3af",
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            {p.body}
          </Typography>
        </M>
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mt: 4,
          flexWrap: "wrap",
        }}
      >
        <M whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="contained"
            onClick={openDialog}
            sx={{
              bgcolor: "#2563EB",
              color: "#fff",
              fontFamily: "DM Sans",
              fontWeight: 700,
              px: { xs: 3, md: 4 },
              py: { xs: 1.2, md: 1.5 },
              borderRadius: 2.5,
              textTransform: "none",
              fontSize: { xs: "0.875rem", md: "1rem" },
              boxShadow: "0 0 24px rgba(37,99,235,0.4)",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            Book an Appointment
          </Button>
        </M>
        <StarRating count={ratingCount} />
      </Box>
    </M>
  );

  return (
    <Box
      sx={{
        bgcolor: "#000",
        py: { xs: 8, md: 12 },
        px: 2,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 5, md: 8, lg: 12 },
          }}
        >
          {imgEl}
          {contentEl}
        </Box>
      </Container>
    </Box>
  );
}

/* ── SECTION 4: Team ── */
const team = [
  { name: "Sairam Srinivasan", role: "Founder, Software Engineer", color: "#7c5c3a" },
  { name: "Lokesh S", role: "Developer, Tech Lead", color: "#3a5c7c" },
  { name: "Krithika R", role: "UX/UI Specialist", color: "#5c4a3a" },
  { name: "Balavignesh E", role: "QA lead, Software Engineer", color: "#3a4a5c" },
  { name: "Ashok Kumar S", role: "Content Creator, Writer", color: "#5c3a4a" },
  { name: "Abiniya Sri", role: "Marketing, Organizer", color: "#4a5c4a" },

];

function TeamCard({ member, index }) {
  return (
    <M
      {...fadeUp(index * 0.07)}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      sx={{
        borderRadius: { xs: 3, md: 3.5 },
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        bgcolor: "#0d0d0d",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
        transition: "border-color 0.25s",
        "&:hover": { borderColor: "rgba(37,99,235,0.35)" },
      }}
    >
      <Box
        sx={{
          aspectRatio: "1/1.1",
          background: `linear-gradient(160deg, ${member.color}55 0%, #080810 100%)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <svg width="48%" height="68%" viewBox="0 0 100 130" opacity="0.3">
          <circle cx="50" cy="35" r="28" fill="#9ca3af" />
          <ellipse cx="50" cy="105" rx="42" ry="35" fill="#9ca3af" />
        </svg>
        {/* shimmer overlay on hover */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 40%, ${member.color}33 100%)`,
          }}
        />
      </Box>
      <Box
        sx={{
          px: { xs: 1.8, md: 2 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "rgba(8,8,20,0.95)",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontWeight: 700,
              fontSize: { xs: "0.78rem", sm: "0.82rem", md: "0.875rem" },
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            {member.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontSize: { xs: "0.68rem", md: "0.74rem" },
              color: "#9ca3af",
            }}
          >
            {member.role}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            bgcolor: "#12122a",
            border: "1px solid rgba(37,99,235,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Box>
      </Box>
    </M>
  );
}

function TeamSection() {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        py: { xs: 8, md: 12 },
        px: 2,
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <CornerDeco />
      {/* Bottom blue glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeader
          badge="Team Members"
          title="Meet the Team Making"
          titleGray="Things Happen Every Day"
          subtitle="Our team is made up of passionate professionals who bring their expertise and creativity to every project."
          cta
          ctaLabel="Book a 15-min call"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {team.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ── SECTION 5: Tools ── */
const tools = [
  {
    name: "MongoDB",
    category: "Database",
    desc: "A powerful, flexible, and scalable NoSQL database for modern applications.",
    color: "#47A248",
    icon: "Mo",
    textColor: "#fff",
  },
  {
    name: "Express.js",
    category: "Backend",
    desc: "Fast, unopinionated, minimalist web framework for Node.js.",
    color: "#252525",
    icon: "Ex",
    textColor: "#fff",
  },
  {
    name: "React",
    category: "Frontend",
    desc: "A JavaScript library for building dynamic user interfaces.",
    color: "#61DAFB",
    icon: "Re",
    textColor: "#000",
  },
  {
    name: "Node.js",
    category: "Backend",
    desc: "A JavaScript runtime built for scalable network applications.",
    color: "#339933",
    icon: "No",
    textColor: "#fff",
  },
  {
    name: "Next.js",
    category: "Framework",
    desc: "The React framework for production with powerful server rendering capabilities.",
    color: "#000000",
    icon: "Nx",
    textColor: "#fff",
  },
  {
    name: "Shopify",
    category: "E-commerce",
    desc: "A complete commerce platform that lets you start, grow, and manage a business.",
    color: "#96bf48",
    icon: "Sh",
    textColor: "#fff",
  },
  {
    name: "Razorpay",
    category: "Payments",
    desc: "A frictionless payment gateway to accept, process and disburse payments.",
    color: "#02042b",
    icon: "Rz",
    textColor: "#fff",
  },
  {
    name: "Wati",
    category: "Communication",
    desc: "A comprehensive WhatsApp API solution for customer engagement and support.",
    color: "#25D366",
    icon: "Wa",
    textColor: "#fff",
  },
  {
    name: "Zapier",
    category: "Automation",
    desc: "Zapier connects your favorite apps and automates your workflows.",
    pro: true,
    color: "#f4631e",
    icon: "Z",
    textColor: "#fff",
  },
  {
    name: "Slack",
    category: "Communication",
    desc: "Slack is our go-to platform for real-time communication and collaboration.",
    color: "#4a154b",
    icon: "S",
    textColor: "#fff",
  },
  {
    name: "Dropbox",
    category: "Cloud Storage",
    desc: "Dropbox provides secure cloud storage, enabling us to share files and collaborate.",
    color: "#0061fe",
    icon: "D",
    textColor: "#fff",
  },
  {
    name: "Stripe",
    category: "Payments",
    desc: "Stripe is our payment processing tool, providing a secure way to transactions.",
    color: "#635bff",
    icon: "S",
    textColor: "#fff",
  },
  {
    name: "Mailchimp",
    category: "Email Marketing",
    desc: "Mailchimp helps us craft effective email marketing campaigns to nurture clients.",
    pro: true,
    color: "#ffe01b",
    icon: "M",
    textColor: "#000",
  },
  {
    name: "Github",
    category: "Version Control",
    desc: "GitHub is our version control system, enabling smooth collaboration.",
    color: "#333",
    icon: "G",
    textColor: "#fff",
  },
];

function ToolCard({ tool, index }) {
  return (
    <M
      {...fadeUp(index * 0.08)}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      sx={{
        borderRadius: { xs: 2.5, md: 3 },
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "#07070f",
        p: { xs: 2.5, md: 3 },
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s",
        "&:hover": {
          borderColor: "rgba(37,99,235,0.4)",
          boxShadow: "0 0 30px rgba(37,99,235,0.1)",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 14, right: 14, opacity: 0.35 }}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </Box>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: tool.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
          
          fontWeight: 800,
          fontSize: "1rem",
          color: tool.textColor,
          flexShrink: 0,
        }}
      >
        {tool.icon}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <Typography
          sx={{
            fontFamily: "DM Sans",
            fontWeight: 700,
            fontSize: { xs: "0.9rem", md: "0.95rem" },
            color: "#fff",
          }}
        >
          {tool.name}
        </Typography>
        {tool.pro && (
          <Chip
            label="PRO"
            size="small"
            sx={{
              bgcolor: "#2563EB",
              color: "#fff",
              fontFamily: "DM Sans",
              fontWeight: 700,
              fontSize: "0.6rem",
              height: 17,
              px: 0.2,
              "& .MuiChip-label": { px: 1 },
            }}
          />
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: "DM Sans",
          color: "#6b7280",
          fontSize: "0.78rem",
          mb: 2,
        }}
      >
        {tool.category}
      </Typography>
      <Typography
        sx={{
          fontFamily: "DM Sans",
          color: "#9ca3af",
          fontSize: { xs: "0.8rem", md: "0.85rem" },
          lineHeight: 1.65,
        }}
      >
        {tool.desc}
      </Typography>
    </M>
  );
}

function ToolsSection() {
  return (
    <Box
      sx={{
        bgcolor: "#000",
        py: { xs: 8, md: 12 },
        px: 2,
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <CornerDeco />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(37,99,235,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeader
          badge="Tools"
          title="Tools and Technologies"
          titleGray="Powering Our Productivity"
          subtitle="Our toolkit is made up of the latest and most reliable tech to ensure your project is executed to perfection."
          cta
          ctaLabel="Book an Appointment"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {tools.map((t, i) => (
            <ToolCard key={t.name} tool={t} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}



/* ── APP ── */
export default function App() {
  return (
    <>
      <HeroSection />
      <AboutBlock
        title="An Agency With Classic"
        titleGray="Revolutionary Skills!"
        points={[
          {
            title: "Your Success, Our Priority",
            body: "At Landin, we believe in empowering our clients to achieve their goals. Our team works closely with you.",
          },
          {
            title: "Partners You Can Rely On",
            body: "Landin is here to ensure your success with expert guidance and collaborative teamwork.",
          },
        ]}
        ratingCount="200+ Agencies Rated"
      />
      <AboutBlock
        imageRight
        title="Work Smarter Not Harder"
        titleGray="in Every Minutes!"
        points={[
          {
            title: "Guided Every Step",
            body: "We ensure a smooth journey from concept to completion, providing expert support to bring your vision to life effortlessly.",
          },
          {
            title: "Support Beyond Delivery",
            body: "Our commitment doesn't end at launch—Landin is here to support you with ongoing updates and expertise whenever you need it.",
          },
        ]}
        ratingCount="900+ People Rated"
      />
      <TeamSection />
      <ToolsSection />
      <CtaBanner />
    </>
  );
}
