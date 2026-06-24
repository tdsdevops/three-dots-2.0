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
import GridViewIcon from "@mui/icons-material/GridView";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AnalyticsIcon from "@mui/icons-material/Analytics";
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
      icon: <GridViewIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Centralized Branch Controls",
      desc: "Supervise all location activities, fee structures, and courses from a single central administrator control panel."
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Student & Staff Management",
      desc: "Manage classes, student progress records, staff attendance, schedules, and digital certifications seamlessly."
    },
    {
      icon: <ReceiptLongIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Royalty & Billing Automation",
      desc: "Auto-calculate royalty payouts, generate franchise invoice fees, and process student online payments automatically."
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: "#8B5CF6" }} />,
      title: "Branch Auditing & Reports",
      desc: "Track local branch revenues, enrollment trends, student dropouts, and comparative performance indicators."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "What is Franchise Management Software?",
      answer: "Franchise Management Software is a unified custom system built to automate communication, student/client data, scheduling, and billing between a central brand owner (franchisor) and individual outlets (franchisees)."
    },
    {
      id: "panel2",
      question: "Can we restrict franchisees from accessing other branch data?",
      answer: "Yes. Our platform uses strict role-based access control (RBAC). Franchisees can only access their specific branch records, student metrics, and invoicing, while the primary owner retains global visibility."
    },
    {
      id: "panel3",
      question: "Does the software support white-labeled branding?",
      answer: "Yes, we can build white-labeled dashboards so that student portals, invoice templates, and emails match your specific corporate brand design."
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
                label="● FRANCHISE SOLUTIONS"
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
                Custom Franchise Management Software
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Unify your franchise network. We develop secure web platforms for academies, retail networks, and service franchises to coordinate branches, collect royalties, and track student/customer metrics from one central hub.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#8B5CF6", px: 4, py: 1.5, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#7c3aed" } }}
                >
                  Schedule Demo
                </Button>
              
              </Box>
            </MBox>
          </Grid>
          <Grid  item xs={12} md={5} width={"100%"} >
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
                Why Custom Franchise Systems?
              </Typography>
              <List  sx={{ p: 0 }}>
                {[
                  "Central brand monitoring of all outlets",
                  "Consolidated billing and automatic invoicing",
                  "Automated course or batch scheduling",
                  "Student fee payment tracking system",
                  "Scale from 2 to 200+ branches effortlessly"
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

      {/* Features Section */}
      <Box id="features" sx={{ bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Tailored Multi-Branch Management
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 650, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Standard SaaS billing fails for unique operational structures. We build bespoke systems that match your exact business models.
            </Typography>
          </Box>

          <Grid container spacing={4} >
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

      {/* Case Study */}
      <Container maxWidth="lg" sx={{ py: 10 }} >
        <Grid container spacing={6} width={"100%"} alignItems="center" sx={{ bgcolor: "linear-gradient(135deg, rgba(2,7,24,0.8) 0%, rgba(20,12,45,0.5) 100%)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Grid item xs={12} md={6} >
            <Typography variant="overline" sx={{ color: "#8B5CF6", fontWeight: 700, letterSpacing: 1.5 }}>
              ACADEMY CASE STUDY
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3, fontFamily: "DM Sans" }}>
              Streamlined Student & Branch Operations
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, mb: 3, fontFamily: "Plus Jakarta Sans" }}>
              For a multi-center educational academy, we developed a system linking student records, course batch allocations, centralized fees, and local billing metrics.
            </Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>
                <Typography variant="h2" sx={{ color: "#8B5CF6", fontWeight: 800, fontFamily: "DM Sans" }}>100%</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Central Oversight</Typography>
              </Box>
              <Box>
                <Typography variant="h2" sx={{ color: "#8B5CF6", fontWeight: 800, fontFamily: "DM Sans" }}>Zero</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Manual Fee Delays</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} width={"100%"} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" alt="Academy management education software dashboard" sx={{ width: "100%", maxWidth: 450, borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.6)" }} />
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
            Everything you need to know about our custom franchise solutions.
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
