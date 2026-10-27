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
  Stack
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GridViewIcon from "@mui/icons-material/GridView";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Inventory2Icon from "@mui/icons-material/Inventory2";
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

export default function FranchiseSoftware() {
  const { openDialog } = useAppointment();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const features = [
    {
      icon: <GridViewIcon sx={{ fontSize: 36, color: "#8B5CF6" }} />,
      title: "Centralized Multi-Branch Oversight",
      desc: "Supervise all franchise locations, batches, and operations from a single franchisor command center without manual reporting delays."
    },
    {
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 36, color: "#8B5CF6" }} />,
      title: "Role-Based Access Control (RBAC)",
      desc: "Branch franchisees only see their own local branch data and students, while master administrators maintain complete network visibility."
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 36, color: "#8B5CF6" }} />,
      title: "Student, Member & Staff Portals",
      desc: "Streamline student enrollments, course schedules, batch allocations, staff attendance, and digital certificate issuances across branches."
    },
    {
      icon: <ReceiptLongIcon sx={{ fontSize: 36, color: "#8B5CF6" }} />,
      title: "Royalty & Billing Automation",
      desc: "Automatically calculate monthly or revenue-share royalties, generate GST invoices for franchise fees, and track fee collection status."
    },
    {
      icon: <Inventory2Icon sx={{ fontSize: 36, color: "#8B5CF6" }} />,
      title: "Branch Inventory & Kit Requisitions",
      desc: "Coordinate course kits, uniforms, branded assets, and materials requested by branches with dispatch tracking and stock logs."
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 36, color: "#8B5CF6" }} />,
      title: "Comparative Branch Analytics",
      desc: "Compare performance across centers: enrollment velocity, revenue trends, dropout rates, and staff efficiency metrics."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "What is custom franchise management software and who needs it?",
      answer: "Custom franchise management software is a centralized cloud web application designed for brands operating across multiple franchisee locations—such as training academies, educational institutes, coaching networks, and retail franchises. It unifies operations, branch communication, fee collections, and data governance under one system."
    },
    {
      id: "panel2",
      question: "Can individual franchisees access data from other branches?",
      answer: "No. Our platforms implement strict Role-Based Access Control (RBAC). Branch managers, center heads, and franchisees can only view and manage records belonging to their assigned center, while the master brand owner maintains full cross-network reporting."
    },
    {
      id: "panel3",
      question: "How does automated royalty calculation work in the software?",
      answer: "You define the royalty structure—such as a fixed monthly franchise fee, a percentage of gross branch enrollments, or tiered sales volumes. When branch fees or sales are logged, the system automatically computes royalty liabilities and generates GST-compliant invoices for the franchisee."
    },
    {
      id: "panel4",
      question: "Can the software handle student admissions and course batch allocations?",
      answer: "Yes. For educational and training academies, the system includes modules for student enquiry tracking, batch allocation, course curriculum progress, teacher attendance, fee installments, and digital certificate generation."
    },
    {
      id: "panel5",
      question: "Can we integrate this with WhatsApp notifications and payment gateways?",
      answer: "Yes, we integrate Indian payment gateways (like Razorpay) for direct fee payments and WhatsApp/SMS notification APIs to send automatic payment receipts, renewal reminders, and batch schedule alerts."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#020718", minHeight: "100vh", py: { xs: 8, md: 12 }, color: "#fff", overflowX: "hidden" }}>
      <SEO pageKey="franchise-software" />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <MBox {...fadeUp(0)}>
              <Chip
                label="● FRANCHISE SOFTWARE SOLUTIONS"
                sx={{
                  bgcolor: "rgba(139,92,246,0.1)",
                  color: "#8B5CF6",
                  border: "1px solid rgba(139,92,246,0.2)",
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
                  background: "linear-gradient(90deg, #ffffff 0%, #d8b4fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Custom Franchise Management Software Solutions
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Unify your franchise network. We engineer secure web platforms for educational academies, training centers, and multi-location businesses to coordinate branches, automate royalty billing, and monitor performance from a single central hub.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#8B5CF6", px: 4, py: 1.6, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#7c3aed" } }}
                >
                  Schedule Franchise Demo
                </Button>
                <Button
                  component={RouterLink}
                  to="/services/custom-software-development"
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    px: 3,
                    py: 1.6,
                    fontSize: 15,
                    fontWeight: 600,
                    "&:hover": { borderColor: "#8B5CF6", bgcolor: "rgba(139,92,246,0.05)" }
                  }}
                >
                  Explore Custom Software
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
                border: "1px solid rgba(139,92,246,0.2)",
                background: "linear-gradient(145deg, rgba(139,92,246,0.06) 0%, rgba(20,12,45,0.5) 100%)",
                p: { xs: 3, md: 4 },
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}
            >
              <Typography variant="h2" sx={{ fontSize: "1.4rem", fontWeight: 800, mb: 2, color: "#fff", fontFamily: "DM Sans" }}>
                Key Operational Benefits
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "100% centralized brand monitoring across all outlets",
                  "Consolidated billing and automated royalty invoicing",
                  "Role-based security ensuring branch data confidentiality",
                  "Central student admissions and batch scheduling system",
                  "Scales seamlessly from 2 to 200+ franchise branches"
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#8B5CF6", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ style: { fontSize: 14.5, fontFamily: "Plus Jakarta Sans" } }} />
                  </ListItem>
                ))}
              </List>
            </MBox>
          </Grid>
        </Grid>
      </Container>

      {/* Modules Section */}
      <Box id="features" sx={{ bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Engineered for Multi-Location Franchise Workflows
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 680, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Standard generic tools lack the flexibility to handle royalty structures, branch kit requisitions, and multi-tier user hierarchies. We build systems to match your operational model.
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {features.map((feature, idx) => (
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
                      borderColor: "rgba(139,92,246,0.4)",
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

      {/* Real Academy Case Study */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            bgcolor: "rgba(139,92,246,0.04)",
            borderRadius: "24px",
            border: "1px solid rgba(139,92,246,0.15)",
            p: { xs: 3, md: 5 }
          }}
        >
          <Grid item xs={12} md={7}>
            <Chip label="ACADEMY IMPLEMENTATION" sx={{ bgcolor: "rgba(139,92,246,0.15)", color: "#8B5CF6", fontWeight: 700, mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, fontWeight: 800, mb: 2.5, fontFamily: "DM Sans" }}>
              Case Study: Multi-Center Training Academy Platform
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, mb: 3, fontFamily: "Plus Jakarta Sans" }}>
              For a multi-center educational academy network, Three Dots developed a unified management platform connecting student admission registers, course batch scheduling, centralized tuition fee collections, and automated royalty settlements between branch franchisees and head office.
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h3" sx={{ color: "#8B5CF6", fontWeight: 800, fontSize: "2rem" }}>100%</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>Central Oversight</Typography>
              </Box>
              <Box>
                <Typography variant="h3" sx={{ color: "#8B5CF6", fontWeight: 800, fontSize: "2rem" }}>Zero</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>Manual Fee Delays</Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              onClick={openDialog}
              sx={{ bgcolor: "#8B5CF6", px: 3, py: 1.2, fontWeight: 700, "&:hover": { bgcolor: "#7c3aed" } }}
            >
              Discuss Your Franchise Architecture
            </Button>
          </Grid>
          <Grid item xs={12} width={"100%"} md={5} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80"
              alt="Franchise management dashboard and academy operations"
              sx={{ width: "100%", maxWidth: 420, borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.6)" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Internal Links & Contextual Resources */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800, mb: 3, textAlign: "center", fontFamily: "DM Sans" }}>
          Explore Related Business Software
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/custom-software-development" style={{ color: "#8B5CF6", textDecoration: "none" }}>
                  Custom Software Development in Chennai →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                End-to-end bespoke web platforms, client portals, and cloud automation systems designed around your unique business rules.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/erp-development" style={{ color: "#8B5CF6", textDecoration: "none" }}>
                  Custom ERP Development Services →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Unify multi-branch accounting, franchise invoicing, student fee collection, and management reporting under one platform.
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
            Common questions regarding franchise management software, branch security, and royalty billing.
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
                "&.Mui-expanded": { bgcolor: "rgba(139,92,246,0.04)", borderColor: "rgba(139,92,246,0.2)" }
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
