import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import WebIcon from "@mui/icons-material/Web";
import SecurityIcon from "@mui/icons-material/Security";
import BoltIcon from "@mui/icons-material/Bolt";
import SEO from "../SEO";
import { useAppointment } from "../../context/AppointmentContext";

const MBox = motion(Box);
const MCard = motion(Card);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function CustomSoftware() {
  const { openDialog } = useAppointment();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const features = [
    {
      icon: <WebIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Scalable Web Applications",
      desc: "High-performance business portals, SaaS products, and workflow solutions built on modern tech stacks like React, Node.js, and Supabase."
    },
    {
      icon: <SettingsSuggestIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Business Process Automation",
      desc: "Replace error-prone spreadsheets and manual procedures with automated digital pipelines designed around your workflows."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Secure Client & Partner Portals",
      desc: "Provide customers, staff, and external partners with role-based, password-protected portals to access documents, bills, and data."
    },
    {
      icon: <BoltIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "API Integrations & Pipelines",
      desc: "Synchronize data between SMS gateways, payment gateways (Razorpay), CRM hubs, accounting systems, and custom databases."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "How do you charge for custom software development?",
      answer: "We offer both fixed-price project quotes and time-and-materials engagement models. After mapping out your exact system architecture, we provide a detailed proposal detailing phase deliverables and pricing."
    },
    {
      id: "panel2",
      question: "Do I own the source code of the developed software?",
      answer: "Yes, 100%. Upon final project delivery and payment settlement, full copyright and source code ownership are transferred to your business."
    },
    {
      id: "panel3",
      question: "What is your typical software development lifecycle?",
      answer: "We follow an agile development lifecycle: 1. Requirement gathering & interactive Figma wireframing; 2. Sprints & builds; 3. Security audits & QA checks; 4. Deployment and monthly maintenance."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#020718", minHeight: "100vh", py: { xs: 8, md: 12 }, color: "#fff", overflowX: "hidden" }}>
      <SEO pageKey="custom-software" />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <MBox {...fadeUp(0)}>
              <Chip
                label="● SOFTWARE DEVELOPMENT"
                sx={{
                  bgcolor: "rgba(59,110,248,0.1)",
                  color: "#3B6EF8",
                  border: "1px solid rgba(59,110,248,0.2)",
                  fontWeight: 600,
                  mb: 3,
                  fontFamily: "DM Sans"
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 3,
                  fontFamily: "DM Sans",
                  background: "linear-gradient(90deg, #ffffff 0%, #a2b9f8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Custom Software Development Company Chennai
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Crafting software engineered to scale your operations. From modern customer portals to customized automation pipelines, we design robust software tailored exactly to your workflow logic.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#3B6EF8", px: 4, py: 1.5, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#2a5ce8" } }}
                >
                  Consult an Expert
                </Button>
              </Box>
            </MBox>
          </Grid>
          <Grid item xs={12} md={5} width={"100%"}>
            <MBox
              {...fadeUp(0.2)}
              sx={{
                position: "relative",
                borderRadius: "24px",
                border: "1px solid rgba(59,110,248,0.2)",
                background: "linear-gradient(145deg, rgba(59,110,248,0.05) 0%, rgba(13,22,60,0.4) 100%)",
                p: 4,
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#fff", fontFamily: "DM Sans" }}>
                The Three Dots Difference
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "Clean code architecture with zero boilerplate",
                  "Direct communication with core technical engineers",
                  "Mobile-first responsive layouts on every screen",
                  "Comprehensive manual and automated QA tests",
                  "Robust cloud deployment & devops automation"
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#3B6EF8" }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ style: { fontSize: 15, fontFamily: "Plus Jakarta Sans" } }} />
                  </ListItem>
                ))}
              </List>
            </MBox>
          </Grid>
        </Grid>
      </Container>

      {/* Services Section */}
      <Box id="features" sx={{ bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Our Software Engineering Offerings
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 650, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Whether you need to modernize legacy code or build a new software product, our team delivers robust execution.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} key={idx} width={"100%"}>
                <MCard
                  {...fadeUp(idx * 0.1)}
                  sx={{
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    p: 2,
                    boxShadow: "none"
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 1.5, fontFamily: "DM Sans" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontFamily: "Plus Jakarta Sans" }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </MCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* EEAT Block: Expertise & Process */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center" sx={{ bgcolor: "linear-gradient(135deg, rgba(2,7,24,0.8) 0%, rgba(13,22,60,0.5) 100%)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: "#3B6EF8", fontWeight: 700, letterSpacing: 1.5 }}>
              OUR METHODOLOGY
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3, fontFamily: "DM Sans" }}>
              High-Velocity Agile Development
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, mb: 3, fontFamily: "Plus Jakarta Sans" }}>
              We build iterative releases in 2-week sprints. You can test and monitor the active staging branch anytime. No black boxes, just transparent delivery.
            </Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>
                <Typography variant="h2" sx={{ color: "#3B6EF8", fontWeight: 800, fontFamily: "DM Sans" }}>100%</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Staging Visibility</Typography>
              </Box>
              <Box>
                <Typography variant="h2" sx={{ color: "#3B6EF8", fontWeight: 800, fontFamily: "DM Sans" }}>Weekly</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Status Calls</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid width={"100%"} item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80" alt="Agile developer planning custom software UI UX" sx={{ width: "100%", maxWidth: 450, borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.6)" }} />
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ pb: 12 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "Plus Jakarta Sans" }}>
            Answers to common questions about hiring custom software developers in Chennai.
          </Typography>
        </Box>

        <Box>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleAccordionChange(faq.id)}
              sx={{
                bgcolor: "rgba(255,255,255,0.02)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "8px",
                mb: 2,
                boxShadow: "none",
                "&:before": { display: "none" },
                "&.Mui-expanded": { bgcolor: "rgba(59,110,248,0.04)", borderColor: "rgba(59,110,248,0.2)" }
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, fontFamily: "DM Sans" }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontSize: 15, fontFamily: "Plus Jakarta Sans" }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
