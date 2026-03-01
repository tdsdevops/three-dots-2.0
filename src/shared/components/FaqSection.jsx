import { useState } from "react";
import { Box, Container, Grid, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SectionChip from "./SectionChip";
const MotionBox = motion(Box);
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
        bgcolor: "rgba(255,255,255,0.05)",
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
            fontWeight: 400,
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
function FaqSection() {
  /* ─── FAQ Data ───────────────────────────────────────────────── */
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
  /* ─── FAQ Item ───────────────────────────────────────────────── */

  const [openFaq, setOpenFaq] = useState(faqs[0].id);

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "#000" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 6, md: 8 },
            alignItems: "flex-start",
          }}
        >
          {/* Left: heading */}
          <Box sx={{ flex: { xs: 1, md: "0 0 41.666%" } }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {/* <Chip

              label="• How We Work?"
              variant="outlined"
              sx={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.15)",
                fontSize: "0.75rem",
                mb: 3,
                borderRadius: "20px",
              }}
            /> */}
                <SectionChip label="How We Work" />
                <Typography
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem", xl: "4rem" },
                    fontWeight: 400,
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
              </Box>
            </MotionBox>
          </Box>

          {/* Right: FAQs */}
          <Box
            sx={{
              flex: { xs: 1, md: "0 0 58.333%" },
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={i}
                isOpen={openFaq === faq.id}
                onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default FaqSection;
