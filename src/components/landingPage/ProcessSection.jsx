import { useContext, useRef } from "react";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { motion, useInView, useTransform } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import AppButton from "../../shared/AppButton";
import LinkButton from "../../shared/LinkButton";
import BookAppointmentButton from "../../shared/buttons/BookAppointmentButton";
// ─── Process / How We Work Section ────────────────────────────────────────────
const STAGES = [
  {
    number: "Stage 1",
    icon: "◎",
    title: "Kickoff",
    desc: "The kickoff stage is where everything begins. We align with you to understand your goals, vision, and expectations. Through in-depth discussions and thorough research.",
    tags: ["Comprehensive Consultation", "Project Roadmap"],
  },
  {
    number: "Stage 2",
    icon: "⊞",
    title: "Execution",
    desc: "With a clear strategy in place, we move into the execution phase, where ideas come to life. Our team works high-efficiently and collaboratively to implement the plan.",
    tags: ["Seamless Integration", "Real Time Collaboration"],
  },
  {
    number: "Stage 3",
    icon: "⟳",
    title: "Handoff",
    desc: "Once the design and development are finalized, we seamlessly transition to the handoff stage. Here, we provide you with all the assets, documentation, and support for a smooth launch.",
    tags: ["Ongoing Support", "Documentation"],
  },
];

function StageCard({ stage, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "sticky",
        top: `${80 + index * 24}px`,
        zIndex: index + 1,
      }}
    >
      <Box
        sx={{
          mb: 3,
          borderRadius: 3,
          border: "1px solid rgba(59,110,248,0.15)",
          background:
            "linear-gradient(145deg, rgba(8,16,52,0.92) 0%, rgba(6,12,38,0.96) 100%)",
          backdropFilter: "blur(16px)",
          p: { xs: 3, md: 3.5 },
          boxShadow:
            "0 8px 40px rgba(0,0,20,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "clip",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: "rgba(59,110,248,0.35)",
            boxShadow:
              "0 12px 50px rgba(0,0,30,0.6), 0 0 0 1px rgba(59,110,248,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.4,
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(59,110,248,0.12) 0%, transparent 60%)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "rgba(59,110,248,0.15)",
              border: "1px solid rgba(59,110,248,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "#7da4ff",
            }}
          >
            {stage.icon}
          </Box>
          <Chip
            label={stage.number}
            size="small"
            sx={{
              background: "rgba(59,110,248,0.12)",
              border: "1px solid rgba(59,110,248,0.25)",
              color: "#7da4ff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.4rem" },
            color: "#fff",
            mb: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          {stage.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 13.5,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
            mb: 2.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          {stage.desc}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          gap={1}
          sx={{ position: "relative", zIndex: 1 }}
        >
          {stage.tags.map((tag) => (
            <Box
              key={tag}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                fontSize: 12,
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {tag}
            </Box>
          ))}
        </Stack>
      </Box>
    </motion.div>
  );
}
function ProcessSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollY } = useContext(ThemeContext);

  const imageY = useTransform(scrollY, (v) => {
    if (!sectionRef.current) return 0;
    const progress =
      v / (document.body.scrollHeight - globalThis.innerHeight || 1);
    return (progress - 0.5) * 60;
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        background: "#020718",
        position: "relative",
        overflow: "clip",
        py: { xs: 8, md: 14 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,110,248,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
              HOW WE WORK
            </Typography>
          </Stack>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 6, lg: 10, xl: 14 },
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3rem",
                    xl: "3.4rem",
                  },
                  color: "#fff",
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                We Simplify The Journey
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3rem",
                    xl: "3.4rem",
                  },
                  color: "#3B6EF8",
                  lineHeight: 1.1,
                  mb: 4,
                }}
              >
                From Design To Launch.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15 },
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  mb: 6,
                  maxWidth: 440,
                }}
              >
                We make it easy to bring your ideas to life, guiding you from
                concept to a fully launched product.
              </Typography>
            </motion.div>
            <Box sx={{ position: "relative" }}>
              {STAGES.map((stage, i) => (
                <StageCard key={stage.title} stage={stage} index={i} />
              ))}
            </Box>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Box sx={{ mt: 4 }}>
                <BookAppointmentButton />
              </Box>
            </motion.div>
          </Box>

          <Box
            sx={{
              position: "sticky",
              top: 120,
              alignSelf: "flex-start",
              zIndex: 1,
            }}
          >
            <motion.div
              ref={imageRef}
              style={{
                y: imageY,
                alignItems: "center",
                display: "flex",
                flexFlow: "row",
                gap: "10px",
                height: "534px",
                overflow: "visible",
                padding: "0px",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 30px 80px rgba(0,0,20,0.6)",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80"
                    alt="Team working"
                    sx={{
                      width: "100%",
                      display: "block",
                      aspectRatio: "4/3",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(2,7,24,0.6) 100%)",
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      background: "rgba(6,13,36,0.85)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(59,110,248,0.25)",
                      borderRadius: 12,
                      padding: "10px 16px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "#7da4ff",
                        fontWeight: 700,
                        letterSpacing: 1,
                        mb: 0.3,
                      }}
                    >
                      PROJECTS LAUNCHED
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 20,

                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      500+
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ProcessSection;
