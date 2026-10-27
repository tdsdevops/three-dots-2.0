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
  ListItemText,
  Stack,
  Divider
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import WebIcon from "@mui/icons-material/Web";
import SecurityIcon from "@mui/icons-material/Security";
import BoltIcon from "@mui/icons-material/Bolt";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
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

  const solutionTypes = [
    {
      icon: <WebIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Scalable Web Applications",
      desc: "High-performance business portals, client management hubs, and customer-facing web platforms built with React, Node.js, and modern cloud databases."
    },
    {
      icon: <SettingsSuggestIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Business Process Automation",
      desc: "Replace fragmented spreadsheets and repetitive manual workflows with reliable digital pipelines tailored specifically to your company's operational rules."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Secure Client & Partner Portals",
      desc: "Empower customers, suppliers, and field teams with password-protected, role-based portals to track orders, download invoices, and exchange documentation."
    },
    {
      icon: <StorageIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Enterprise WMS & ERP Systems",
      desc: "Purpose-built inventory, warehouse, and resource planning software that fits your exact physical storage layout, billing cycles, and reporting needs."
    },
    {
      icon: <BoltIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "API Integrations & Pipelines",
      desc: "Connect your core software with Indian payment gateways (Razorpay), SMS/WhatsApp providers, accounting tools (Tally, Zoho Books), and courier platforms."
    },
    {
      icon: <CodeIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "SaaS MVP Engineering",
      desc: "Turn your software product concept into a market-ready MVP with clean multi-tenant architecture, subscription billing, and enterprise security."
    }
  ];

  const developmentSteps = [
    {
      num: "01",
      title: "Discovery & Technical Architecture",
      desc: "We analyze your existing workflows, document core business rules, design database schemas, and define precise milestone deliverables."
    },
    {
      num: "02",
      title: "Interactive UI/UX Wireframing",
      desc: "We prototype every user journey in Figma so you can review, test, and approve interface layouts and interactions before writing code."
    },
    {
      num: "03",
      title: "Agile Sprint Development",
      desc: "Our Chennai engineering team builds software in 2-week iterations. You have continuous access to an active staging environment to test progress."
    },
    {
      num: "04",
      title: "Quality Assurance & Security Checks",
      desc: "Rigorous manual and automated test suites verify functional correctness, data validation, response speed, and access security."
    },
    {
      num: "05",
      title: "Deployment & Knowledge Handover",
      desc: "We configure production cloud infrastructure, automate backups, provide team training, and transfer 100% source code ownership."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "How does Three Dots approach custom software development in Chennai?",
      answer: "We are a hands-on, product-focused development team in Chennai. Rather than handing off projects to junior contractors, your software is built directly by experienced full-stack engineers who collaborate with you through weekly status reviews, live staging builds, and transparent sprint milestones."
    },
    {
      id: "panel2",
      question: "Do I own the source code and intellectual property of the software?",
      answer: "Yes, 100%. Upon project completion and final milestone settlement, all repository code, database designs, assets, and intellectual property belong entirely to your business. We never lock you into proprietary hosting."
    },
    {
      id: "panel3",
      question: "How do you charge for custom software projects?",
      answer: "We primarily work on structured, fixed-price milestone agreements based on an agreed functional scope. For evolving enterprise products, we also offer dedicated monthly agile sprint engagements with transparent delivery schedules."
    },
    {
      id: "panel4",
      question: "What technologies do you use for building custom software?",
      answer: "We build on battle-tested, high-performance tech stacks: React, Next.js, Node.js, PostgreSQL/Supabase, REST/GraphQL APIs, and secure cloud environments on AWS, Render, and Cloudflare. This ensures your software loads fast, scales easily, and remains maintainable."
    },
    {
      id: "panel5",
      question: "How do we get started with a consultation?",
      answer: "Simply click 'Consult an Expert' or contact us through our website. We will arrange a free technical discovery call to review your workflow requirements, explain possible system architectures, and deliver a detailed project proposal."
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
                label="● SOFTWARE DEVELOPMENT CHENNAI"
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
                component="h1"
                sx={{
                  fontSize: { xs: "2.3rem", sm: "3.2rem", md: "3.8rem" },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 3,
                  fontFamily: "DM Sans",
                  background: "linear-gradient(90deg, #ffffff 0%, #a2b9f8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Custom Software Development Company in Chennai
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Engineered to match your business workflows. Three Dots is a custom software development company in Chennai building bespoke web applications, enterprise operations platforms, WMS, and client portals that scale without unnecessary bloat.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#3B6EF8", px: 4, py: 1.6, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#2a5ce8" } }}
                >
                  Consult an Expert
                </Button>
                <Button
                  component={RouterLink}
                  to="/portfolio"
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    px: 3,
                    py: 1.6,
                    fontSize: 15,
                    fontWeight: 600,
                    "&:hover": { borderColor: "#3B6EF8", bgcolor: "rgba(59,110,248,0.05)" }
                  }}
                >
                  View Client Work
                </Button>
              </Stack>
            </MBox>
          </Grid>
          <Grid item xs={12} md={5} width={"100%"}>
            <MBox
              {...fadeUp(0.2)}
              sx={{
                position: "relative",
                borderRadius: "24px",
                border: "1px solid rgba(59,110,248,0.2)",
                background: "linear-gradient(145deg, rgba(59,110,248,0.06) 0%, rgba(13,22,60,0.5) 100%)",
                p: { xs: 3, md: 4 },
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}
            >
              <Typography variant="h2" sx={{ fontSize: "1.4rem", fontWeight: 800, mb: 2, color: "#fff", fontFamily: "DM Sans" }}>
                The Three Dots Engineering Advantage
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "Clean, modular architecture with zero boilerplate debt",
                  "Direct communication with core technical developers",
                  "Weekly sprint demos on active test staging environments",
                  "100% source code and intellectual property ownership",
                  "Continuous post-launch support and security maintenance"
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#3B6EF8", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ style: { fontSize: 14.5, fontFamily: "Plus Jakarta Sans" } }} />
                  </ListItem>
                ))}
              </List>
            </MBox>
          </Grid>
        </Grid>
      </Container>

      {/* Solution Types Section */}
      <Box id="features" sx={{ bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Custom Software Development Services
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 680, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Whether replacing legacy spreadsheets, modernizing outdated systems, or building a new product from scratch, our team provides reliable execution.
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {solutionTypes.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} width={"100%"}>
                <MCard
                  {...fadeUp(idx * 0.08)}
                  sx={{
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "16px",
                    p: 1.5,
                    boxShadow: "none",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                      borderColor: "rgba(59,110,248,0.4)",
                      transform: "translateY(-4px)"
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", mb: 1.5, fontFamily: "DM Sans" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontFamily: "Plus Jakarta Sans" }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </MCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Engineering Process Steps */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography variant="overline" sx={{ color: "#3B6EF8", fontWeight: 700, letterSpacing: 1.5 }}>
            STRUCTURED METHODOLOGY
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.7rem" }, fontWeight: 800, mt: 1, mb: 2, fontFamily: "DM Sans" }}>
            How We Build Software: Our 5-Stage Process
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.65)", maxWidth: 650, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
            Transparent delivery with no surprises. Every project is broken down into structured, verifiable stages.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {developmentSteps.map((step, idx) => (
            <Grid item xs={12} sm={6} md={2.4} key={idx} width="100%">
              <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3, p: 2, height: "100%" }}>
                <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: 900, color: "#3B6EF8", mb: 1, fontFamily: "DM Sans" }}>
                  {step.num}
                </Typography>
                <Typography variant="h3" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1.5, color: "#fff", fontFamily: "DM Sans" }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontSize: 13.5 }}>
                  {step.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Internal Links & Contextual Resources */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800, mb: 3, textAlign: "center", fontFamily: "DM Sans" }}>
          Explore Specific Software Capabilities
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/warehouse-management-software" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Warehouse Management Software →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Receiving, dynamic bin allocation, barcode scanner picking, and dispatch workflow automation.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/franchise-management-software" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Franchise Management Software →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Centralized multi-branch control, automated royalty billing, student records, and branch reporting.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/inventory-management-software" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Inventory Management Software →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Real-time SKU visibility, automated safety stock thresholds, and HSN compliance.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ pb: 12, pt: 4 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
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

        {/* Bottom CTA Block */}
        <Box sx={{ textAlign: "center", mt: 6, p: 4, bgcolor: "rgba(255,255,255,0.02)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.06)" }}>
          <Typography variant="h3" sx={{ fontSize: "1.4rem", fontWeight: 700, mb: 1.5, fontFamily: "DM Sans" }}>
            Have a Software Idea or Business Workflow to Automate?
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)", mb: 3, maxWidth: 500, mx: "auto" }}>
            Talk directly to our software engineering team in Chennai. We will evaluate your technical requirements and provide an actionable roadmap.
          </Typography>
          <Button
            variant="contained"
            onClick={openDialog}
            sx={{ bgcolor: "#3B6EF8", px: 4, py: 1.4, fontWeight: 700, "&:hover": { bgcolor: "#2a5ce8" } }}
          >
            Request Free Technical Consultation
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
