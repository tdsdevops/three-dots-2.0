import { useContext, useRef } from "react";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { motion, useInView, useTransform } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import { useAppointment } from "../../context/AppointmentContext";
// ─── Process / How We Work Section ────────────────────────────────────────────
const STAGES = [
  {
    number: "01 Discovery & scoping",
    icon: "◎",
    title: "Discovery & scoping",
    desc: "We map your requirements, goals, and constraints into a clear technical brief. No assumptions, no vague estimates.",
    tags: ["Technical Brief", "Clear Requirements", "Zero Assumptions"],
  },
  {
    number: "02 Design & architecture",
    icon: "⊞",
    title: "Design & architecture",
    desc: "Wireframes, system design, and tech stack decisions are made before development begins — keeping costly rework off the table.",
    tags: ["Wireframing", "System Architecture", "Tech Stack Choices"],
  },
  {
    number: "03 Agile development",
    icon: "⚡",
    title: "Agile development",
    desc: "Two-week sprints with working software at every checkpoint. You see real progress, not status updates.",
    tags: ["2-Week Sprints", "Working Checkpoints", "Real Progress"],
  },
  {
    number: "04 QA, launch & handover",
    icon: "⟳",
    title: "QA, launch & handover",
    desc: "Rigorous testing, staged deployment, and a clean handover — including documentation, training, and optional ongoing retainer support.",
    tags: ["Rigorous QA", "Staged Launch", "Clean Handover"],
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
  const { openDialog } = useAppointment();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollY } = useContext(ThemeContext);

  const imageY = useTransform(scrollY, (v) => {
    if (!sectionRef.current) return 0;
    const progress = v / (document.body.scrollHeight - window.innerHeight || 1);
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
                    sm: "2.4rem",
                    md: "2.8rem",
                    xl: "3.2rem",
                  },
                  color: "#fff",
                  lineHeight: 1.15,
                  mb: 1.5,
                }}
              >
                A Process Built for Clarity,
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "2.8rem",
                    xl: "3.2rem",
                  },
                  color: "#3B6EF8",
                  lineHeight: 1.15,
                  mb: 4,
                }}
              >
                Not Complexity.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15.5 },
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  mb: 6,
                  maxWidth: 460,
                }}
              >
                We follow a structured delivery process that keeps you informed and in control — from the first discovery session to post-launch support.
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
                <Button
                  variant="contained"
                  onClick={openDialog}
                  sx={{
                    px: 3.5,
                    py: 1.5,
                    fontSize: 14,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #3B6EF8, #5b8fff)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow:
                      "0 4px 20px rgba(59,110,248,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                    borderRadius: 2.5,
                    "&:hover": {
                      background: "linear-gradient(135deg, #2a5ce8, #4a7ef0)",
                      boxShadow: "0 6px 28px rgba(59,110,248,0.5)",
                    },
                  }}
                >
                  Book an Appointment
                </Button>
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
