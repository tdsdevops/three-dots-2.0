import { use, useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../../appConstant";
import CtaBanner from "../../shared/components/CtaBanner";
import FaqSection from "../../shared/components/FaqSection";

const portfolioItems = [
  {
    id: 1,
    title: "Way Fields",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    id: 2,
    title: "Raven Studio",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    id: 3,
    title: "White Stag",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    span: { xs: 12, md: 6, lg: 6 },
  },
];

const faqs = [
  {
    id: 1,
    question: "What do I need to get started?",
    answer:
      "To get started, simply share your project details and goals with us. We'll guide you through the process and provide the tools and support needed to bring your vision to life.",
  },
  {
    id: 2,
    question: "What kind of customization is available?",
    answer:
      "We offer full design and development customization including branding, UX flows, animations, and feature development tailored to your needs.",
  },
  {
    id: 3,
    question: "How easy is it to edit for beginners?",
    answer:
      "Our deliverables come with clean, documented code and a CMS setup that's beginner-friendly. We also offer onboarding sessions.",
  },
  {
    id: 4,
    question: "Let me know more about moneyback guarantee?",
    answer:
      "We offer a 14-day money-back guarantee if you're not satisfied with our initial deliverables. No questions asked.",
  },
  {
    id: 5,
    question: "Do I need to know how to code?",
    answer:
      "Not at all. We handle all technical aspects. You just need to share your vision and feedback.",
  },
  {
    id: 6,
    question: "What will I get after purchasing the template?",
    answer:
      "You'll receive the full source code, design files, documentation, and 30 days of post-purchase support.",
  },
];

const MotionBox = motion(Box);

function PortfolioCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    // <Grid item xs={item.span.xs} md={item.span.md} lg={item.span.lg}>
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "#111",
        aspectRatio: { xs: "4/3", md: "16/10" },
      }}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 2, md: 2.5 },
          background:
            "linear-gradient(to top, rgba(0,10,30,0.9) 0%, transparent 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: { xs: "0.85rem", md: "0.95rem" },
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
          {item.year}
        </Typography>
      </Box>
    </MotionBox>
    // </Grid>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      sx={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        overflow: "hidden",
        bgcolor: isOpen ? "rgba(255,255,255,0.05)" : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      <Box
        onClick={onToggle}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: 2.5, md: 3 },
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: isOpen ? 700 : 500,
            fontSize: { xs: "0.9rem", md: "1rem" },
            letterSpacing: "-0.01em",
            pr: 2,
          }}
        >
          {faq.question}
        </Typography>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {isOpen ? (
            <CloseIcon
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 20,
                flexShrink: 0,
              }}
            />
          ) : (
            <AddIcon
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 20,
                flexShrink: 0,
              }}
            />
          )}
        </motion.div>
      </Box>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontSize: { xs: "0.85rem", md: "0.9rem" },
                px: { xs: 2.5, md: 3 },
                pb: 3,
                lineHeight: 1.7,
              }}
            >
              {faq.answer}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionBox>
  );
}

export default function Portfolio() {
  const [openFaq, setOpenFaq] = useState(faqs[0].id);
  const { bgVdo } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* ───── PORTFOLIO SECTION ───── */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
        }}
      >
        {/* ── Background video — covers only the top 50% (hero area) ── */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%", // only the upper half
            overflow: "hidden",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Box
            component="video"
            autoPlay
            loop
            muted
            playsInline
            src={bgVdo}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Gradient fade-out at the bottom edge of the video area */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
            }}
          />
          {/* Gradient fade-out at top */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
            }}
          />
        </Box>

        {/* Blue glow overlays (on top of video) */}
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "-10%",
            width: { xs: "300px", md: "500px" },
            height: { xs: "300px", md: "500px" },
            background:
              "radial-gradient(circle, rgba(20,40,180,0.45) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "-5%",
            width: { xs: "200px", md: "350px" },
            height: { xs: "200px", md: "350px" },
            background:
              "radial-gradient(circle, rgba(10,20,120,0.35) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            <Chip
              label="Explore Our Portfolio"
              sx={{
                bgcolor: "#2563EB",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 1,
                height: 30,
                borderRadius: "20px",
              }}
            />
          </MotionBox>

          {/* Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            sx={{ textAlign: "center", mb: 3 }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "2.4rem",
                  sm: "3.5rem",
                  md: "5rem",
                  xl: "6rem",
                },
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
              }}
            >
              Check Out Some
              <br />
              Extra–Ordinary Work.
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            sx={{ textAlign: "center", mb: 5 }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.45)",
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                maxWidth: 440,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              From startups to established brands, we create tailored solutions
              that drive success and make a real impact.
            </Typography>
          </MotionBox>

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 6, md: 8 },
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#2563EB",
                px: 4,
                py: 1.5,
                fontSize: "0.9rem",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              Build Your Product
            </Button>
          </MotionBox>

          {/* Portfolio Grid */}
          {/* <Grid container spacing={{ xs: 2, md: 3 }}> */}
          <Box width={"100%"}>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              gap={3}
              justifyContent={"center"}
            >
              {portfolioItems.map((item, i) => (
                <PortfolioCard key={item.id} item={item} index={i} />
              ))}
            </Box>
          </Box>
          {/* </Grid> */}
        </Container>
      </Box>

      <FaqSection/>

      <CtaBanner />
    </Box>
  );
}
