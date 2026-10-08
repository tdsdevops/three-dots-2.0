import { use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ThemeContext } from "../../appConstant";
import CtaBanner from "../../shared/components/CtaBanner";
import FaqSection from "../../shared/components/FaqSection";
import faqs from "../../data/faqs.json";
import SEO from "../SEO";
import { sendEmail } from "../../utils/sendEmail";

const SEGMENTS = [
  { id: "all", label: "All Work" },
  { id: "website", label: "Websites" },
  { id: "portal", label: "Portals" },
  { id: "software", label: "Custom Software" },
];

const portfolioItems = [
  {
    id: "tces-exports",
    title: "TCES Exports - Indian Spice Exporter Website",
    categoryLabel: "Website",
    year: "2026",
    image: "/tces-exports-desktop-mobile-mockup.jpg",
    link: "/portfolio/tces-exports-website-design-development",
    isFeatured: true,
    tag: "Case Study",
    categories: ["website"],
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    id: 1,
    title: "MS Industries WMS",
    categoryLabel: "WMS Software",
    year: "2024",
    image: "msindustries.png",
    tag: "Warehouse Software",
    categories: ["portal", "software"],
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    id: 2,
    title: "Smatal Franchise Portal",
    categoryLabel: "Franchise Portal",
    year: "2025",
    image: "smatal.png",
    tag: "Multi-Branch Portal",
    categories: ["portal", "software"],
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    id: 3,
    title: "Velai Vendum Portal",
    categoryLabel: "Job Portal",
    year: "2026",
    image: "velaivendum.png",
    tag: "Recruitment Platform",
    categories: ["portal"],
    span: { xs: 12, md: 6, lg: 6 },
  },
  {
    id: 4,
    title: "Brand Mic Media Website",
    categoryLabel: "Brand Website",
    year: "2026",
    image: "brandmicmedia.png",
    tag: "Media Agency",
    categories: ["website"],
    span: { xs: 12, md: 6, lg: 6 },
  }
];

const MotionBox = motion(Box);

function PortfolioCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    // <Grid item xs={item.span.xs} md={item.span.md} lg={item.span.lg}>
    <MotionBox
      layout
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => {
        if (item.link) {
          navigate(item.link);
        }
      }}
      sx={{
        width: { xs: "100%", md: "75%", lg: "90%" },
        maxWidth: "900px",
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: item.link ? "pointer" : "default",
        border: item.isFeatured ? "1px solid rgba(59, 110, 248, 0.45)" : "1px solid rgba(255,255,255,0.08)",
        bgcolor: "#111",
        aspectRatio: { xs: "4/3", md: "16/10" },
        boxShadow: hovered
          ? "0 0 45px rgba(37, 99, 235, 0.7), 0 0 15px rgba(37, 99, 235, 0.5)"
          : item.isFeatured
          ? "0 0 25px rgba(37, 99, 235, 0.25)"
          : "0 10px 30px rgba(0,0,0,0.5)",
        transition: "box-shadow 0.4s ease-in-out, transform 0.4s ease-in-out, border 0.4s ease-in-out",
        transform: hovered ? "translateY(-6px)" : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Category and Tag badges */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 2,
          display: "flex",
          gap: 1,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {item.categoryLabel && (
          <Box
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              px: 1.6,
              py: 0.5,
              borderRadius: "20px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {item.categoryLabel}
          </Box>
        )}
        {item.tag && (
          <Box
            sx={{
              bgcolor: item.isFeatured ? "#2563EB" : "rgba(37, 99, 235, 0.8)",
              color: "#fff",
              px: 1.6,
              py: 0.5,
              borderRadius: "20px",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            {item.tag}
          </Box>
        )}
      </Box>
      <motion.img
        src={item.image}
        alt={item.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
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
          p: { xs: 2.5, md: 3 },
          background: "rgba(15, 35, 90, 0.65)", // Blue translucent color
          backdropFilter: "blur(14px)", // Glassmorphism blur
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(255,255,255,0.15)", // Premium glass edge
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            component="h3"
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </Typography>
          {item.link && (
            <ArrowForwardIcon sx={{ color: "#3B6EF8", fontSize: "1.1rem" }} />
          )}
        </Box>
        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 500 }}>
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
  const [productOpen, setProductOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState("all");
  const { bgVdo } = useContext(ThemeContext);

  const filteredItems =
    activeSegment === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.categories?.includes(activeSegment));

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "DM Sans",
      }}
    >
      <SEO pageKey="portfolio" />
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

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
          {/* Section Reference Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ display: "flex", justifyContent: "center", mb: 2.5 }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                px: 2,
                py: 0.7,
                borderRadius: "50px",
                bgcolor: "rgba(59, 110, 248, 0.08)",
                border: "1px solid rgba(59, 110, 248, 0.22)",
                boxShadow: "0 0 15px rgba(59, 110, 248, 0.12)",
              }}
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
                  textTransform: "uppercase",
                }}
              >
                OUR WORK & PORTFOLIO
              </Typography>
            </Stack>
          </MotionBox>

          {/* Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            sx={{ textAlign: "center", mb: 2.5 }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2.2rem",
                  sm: "3.2rem",
                  md: "4.2rem",
                  lg: "4.8rem",
                },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#fff",
                maxWidth: 950,
                mx: "auto",
              }}
            >
              Check Out Some <br />
              <Box component="span" sx={{ color: "#3B6EF8" }}>
                Extra–Ordinary Work.
              </Box>
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                maxWidth: 540,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              From high-growth startups to established enterprises, explore our bespoke
              websites, internal portals, and custom software solutions.
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
              onClick={() => setProductOpen(true)}
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
          {/* Product Dialog */}
          <Dialog open={productOpen} onClose={() => setProductOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Contact & Requirements</DialogTitle>
            <DialogContent>
              <form id="product-form" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const functionName = import.meta.env.VITE_EDGE_FUNCTION_NAME || "email-services";
                const payload = {
                 to: import.meta.env.VITE_CONTACT_EMAIL,
        from: import.meta.env.VITE_FROM_EMAIL,
                  subject: `Product Inquiry from ${form.name.value}`,
                  html: `<p><strong>Name:</strong> ${form.name.value}</p> <p><strong>Phone:</strong> ${form.phone.value}</p> <p><strong>Company:</strong> ${form.company.value}</p> <p><strong>Email:</strong> ${form.email.value}</p> <p><strong>Description:</strong> ${form.description.value}</p>`
                };
                try {
                  await sendEmail(functionName, payload);
                  alert('Your request has been sent successfully!');
                } catch (err) {
                  console.error(err);
                  alert('Failed to send request. Please try again later.');
                }
                setProductOpen(false);
              }}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  margin="dense"
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="dense"
                />
                                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  margin="dense"
                  type="number"
                />  
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Brief Project Description"
                  name="description"
                  multiline
                  rows={3}
                  margin="dense"
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setProductOpen(false)} color="inherit">Cancel</Button>
              <Button type="submit" form="product-form" variant="contained" color="primary">Submit</Button>
            </DialogActions>
          </Dialog>

          {/* Category Segmentation Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 1.5 },
              mb: { xs: 5, md: 7 },
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 0.8, sm: 1.2 },
                p: "6px",
                borderRadius: "50px",
                bgcolor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
              }}
            >
              {SEGMENTS.map((seg) => {
                const isActive = activeSegment === seg.id;
                const count =
                  seg.id === "all"
                    ? portfolioItems.length
                    : portfolioItems.filter((item) => item.categories?.includes(seg.id)).length;

                return (
                  <Box
                    key={seg.id}
                    component="button"
                    onClick={() => setActiveSegment(seg.id)}
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: { xs: 2, sm: 2.5 },
                      py: { xs: 0.9, sm: 1.1 },
                      borderRadius: "40px",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: { xs: "0.82rem", sm: "0.9rem" },
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "DM Sans, sans-serif",
                      color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                      bgcolor: isActive ? "#2563EB" : "transparent",
                      boxShadow: isActive
                        ? "0 0 20px rgba(37, 99, 235, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        : "none",
                      transition: "all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)",
                      "&:hover": {
                        color: "#ffffff",
                        bgcolor: isActive ? "#1d4ed8" : "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                  >
                    <span>{seg.label}</span>
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        px: 0.9,
                        py: 0.2,
                        borderRadius: "10px",
                        bgcolor: isActive
                          ? "rgba(255, 255, 255, 0.22)"
                          : "rgba(255, 255, 255, 0.08)",
                        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.6)",
                        lineHeight: 1.3,
                        transition: "all 0.25s ease",
                      }}
                    >
                      {count}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Portfolio Grid */}
          <Box width={"100%"}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: { xs: 3, md: 4 },
                width: "100%",
                justifyItems:"center"
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <PortfolioCard key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </Box>
            {filteredItems.length === 0 && (
              <Box textAlign="center" py={8} color="rgba(255,255,255,0.5)">
                <Typography variant="body1">No projects found in this category.</Typography>
              </Box>
            )}
          </Box>

          {/* Related Blog Cross-link */}
          <Box
            sx={{
              mt: { xs: 8, md: 10 },
              width: "100%",
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              bgcolor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2.5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#3B6EF8",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 0.5,
                }}
              >
                Export Website Insights
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: { xs: "1.05rem", md: "1.2rem" },
                  mb: 0.5,
                }}
              >
                Building a website for an export business?
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.65)",
                  fontSize: "0.9rem",
                  maxWidth: 520,
                  lineHeight: 1.6,
                }}
              >
                We also wrote about the key things international buyers look for when visiting an Indian spice exporter website.
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/blog/indian-spice-exporter-website"
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "rgba(255, 255, 255, 0.3)",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                px: 3,
                py: 1.2,
                borderRadius: "10px",
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "#3B6EF8",
                  bgcolor: "rgba(59, 110, 248, 0.1)",
                },
              }}
            >
           Read the full guide
            </Button>
          </Box>
        </Container>
      </Box>

      <FaqSection />

      <CtaBanner />
    </Box>
  );
}
