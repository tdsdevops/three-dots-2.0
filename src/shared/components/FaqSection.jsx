import { useState } from "react";
import { Box, Container, Grid, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import faqs from "../../data/faqs.json";

function FaqSection() {
  /* ─── FAQ Data ───────────────────────────────────────────────── */
  /* ─── FAQ Item ───────────────────────────────────────────────── */
  /* ─── FAQ Item ───────────────────────────────────────────────── */
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
  const [openFaq, setOpenFaq] = useState(faqs[0].id);
const MotionBox = motion(Box);

  return (
    // {/* ───── FAQ SECTION ───── */}
    <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#000" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="flex-start">
          {/* Left: heading */}
          <Grid item xs={12} md={5}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="• How We Work?"
                variant="outlined"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  borderColor: "rgba(255,255,255,0.15)",
                  fontSize: "0.75rem",
                  mb: 3,
                  borderRadius: "20px",
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem", xl: "4rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  mb: 3,
                }}
              >
                <Box component="span" sx={{ color: "#fff" }}>
                  Frequently
                </Box>
                <br />
                <Box component="span" sx={{ color: "rgba(255,255,255,0.3)" }}>
                  Asked Questions
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: { xs: "0.85rem", md: "0.9rem" },
                  lineHeight: 1.7,
                  maxWidth: 380,
                }}
              >
                Have questions? Our FAQ section has you covered with quick
                answers to the most common inquiries.
              </Typography>
            </MotionBox>
          </Grid>

          {/* Right: FAQs */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={i}
                  isOpen={openFaq === faq.id}
                  onToggle={() =>
                    setOpenFaq(openFaq === faq.id ? null : faq.id)
                  }
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FaqSection;
