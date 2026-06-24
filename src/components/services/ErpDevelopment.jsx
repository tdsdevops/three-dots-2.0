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
import BarChartIcon from "@mui/icons-material/BarChart";
import HubIcon from "@mui/icons-material/Hub";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InsightsIcon from "@mui/icons-material/Insights";
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

export default function ErpDevelopment() {
  const { openDialog } = useAppointment();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const features = [
    {
      icon: <HubIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Consolidated Operations Hub",
      desc: "Connect sales, logistics, purchases, billing, and accounting pipelines under one master system. Avoid data silos."
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Billing & GST Invoicing",
      desc: "Automate custom billing, calculate regional GST states (CGST/SGST/IGST), and generate digital invoices instantly."
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Resource & HR Tracking",
      desc: "Monitor staff task schedules, department productivity benchmarks, salary payouts, and branch operational expenses."
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Management Dashboards",
      desc: "Visualize company cashflow, high-performing sales categories, profit margins, and operational KPIs instantly."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "What is a custom ERP system?",
      answer: "A custom ERP (Enterprise Resource Planning) software is built around your specific business organization, workflow hierarchy, and operational needs. Unlike generic ERPs, it avoids monthly licensing fees per user and is fully flexible to evolve with your processes."
    },
    {
      id: "panel2",
      question: "Can we migrate data from our current systems (like Excel or Tally)?",
      answer: "Yes. We design custom ETL pipelines to safely export, cleanse, and import your legacy spreadsheets, databases, and customer records into the new cloud-based ERP database."
    },
    {
      id: "panel3",
      question: "How secure is our business financial data?",
      answer: "We employ banking-grade encryption protocols (SSL/TLS for transport and AES-256 for data storage), multifactor authentication (MFA), and granular role-based permissions to ensure your financial assets are fully secure."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#020718", minHeight: "100vh", py: { xs: 8, md: 12 }, color: "#fff", overflowX: "hidden" }}>
      <SEO pageKey="erp-development" />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <MBox {...fadeUp(0)}>
              <Chip
                label="● ERP SOLUTIONS"
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
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 3,
                  fontFamily: "DM Sans",
                  background: "linear-gradient(90deg, #ffffff 0%, #d8b4fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Custom Cloud ERP Software Development
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Streamline your business operations. We design and build custom, cloud-based ERP solutions tailored to automate workflow pipelines, manage financial ledgers, and track department resources.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#8B5CF6", px: 4, py: 1.5, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#7c3aed" } }}
                >
                  Request a Consultation
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
                border: "1px solid rgba(139,92,246,0.2)",
                background: "linear-gradient(145deg, rgba(139,92,246,0.05) 0%, rgba(20,12,45,0.4) 100%)",
                p: 4,
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#fff", fontFamily: "DM Sans" }}>
                Custom ERP Capabilities
              </Typography>
              <List sx={{ p: 0 }} >
                {[
                  "No recurring monthly seat licenses",
                  "Tailored directly around your unique workflow",
                  "Consolidated department analytics and cashflow",
                  "Integrated state-wise GST & invoicing",
                  "Automated database backups & security controls"
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#8B5CF6" }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ style: { fontSize: 15, fontFamily: "Plus Jakarta Sans" } }} />
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
              Integrated ERP Modules
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 650, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Bespoke building blocks designed to unite financial records, staff assignments, and logistics tracking.
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

      {/* EEAT Block: ERP Modernization */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center" sx={{ bgcolor: "linear-gradient(135deg, rgba(2,7,24,0.8) 0%, rgba(20,12,45,0.5) 100%)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: "#8B5CF6", fontWeight: 700, letterSpacing: 1.5 }}>
              ENTERPRISE MODERNIZATION
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3, fontFamily: "DM Sans" }}>
              Migrate Legacy Systems to the Cloud
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, mb: 3, fontFamily: "Plus Jakarta Sans" }}>
              Don't let outdated, offline desktop software slow your business down. We build secure, cloud-enabled web ERP platforms accessible anywhere on any desktop, laptop, or smartphone.
            </Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>
                <Typography variant="h2" sx={{ color: "#8B5CF6", fontWeight: 800, fontFamily: "DM Sans" }}>100%</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Cloud-native Accessibility</Typography>
              </Box>
              <Box>
                <Typography variant="h2" sx={{ color: "#8B5CF6", fontWeight: 800, fontFamily: "DM Sans" }}>256-bit</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Bank-Grade Security</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid width={"100%"} item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Cloud ERP dashboards metrics reports" sx={{ width: "100%", maxWidth: 450, borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.6)" }} />
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
            Got questions about custom ERP developments? Here are quick answers.
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
