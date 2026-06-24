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
import WarehouseIcon from "@mui/icons-material/Warehouse";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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

export default function InventorySoftware() {
  const { openDialog } = useAppointment();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const features = [
    {
      icon: <WarehouseIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Real-Time Stock Audits",
      desc: "Instantly trace inventory audits, stock adjustments, batch expirations, and stock levels across multiple branches."
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Auto-Reorder Alerts",
      desc: "Set minimum threshold levels for each SKU. Receive automated email or SMS notifications when stocks fall low."
    },
    {
      icon: <QrCodeIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "SKU & Barcode Integration",
      desc: "Quickly scan, register, and tag items with customized barcodes, HSN, and SAC codes for GST-compliant compliance."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Demand Forecasting Insights",
      desc: "Analyze historical sales velocity parameters to forecast purchase orders, ensuring you invest only in fast-moving items."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "How does the auto-reorder system work?",
      answer: "Within our custom software dashboard, you can define 'Safety Stock' thresholds for each product. When checkout logs drag quantity below the threshold, the system flags the items and can draft automated purchase orders to vendors."
    },
    {
      id: "panel2",
      question: "Can we track inventory across multiple physical stores?",
      answer: "Yes. Our cloud inventory software syncs transactions across multiple stores, outlets, warehouses, or e-commerce platforms in real-time."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#020718", minHeight: "100vh", py: { xs: 8, md: 12 }, color: "#fff", overflowX: "hidden" }}>
      <SEO pageKey="inventory-software" />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <MBox {...fadeUp(0)}>
              <Chip
                label="● INVENTORY SOLUTIONS"
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
                Custom Inventory Management Software
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Take control of your stock. We develop bespoke, cloud-integrated inventory management software featuring real-time SKU tracking, state-wise HSN checks, and automated order alerts.
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
          <Grid item xs={12} md={5 } width={"100%"}>
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
                Operational Benefits
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "Eliminate manual spreadsheets and human errors",
                  "Automated safety stock and low alert updates",
                  "Consolidated Multi-branch item tracking",
                  "Seamless integration with barcode scanners",
                  "Tailored product grouping and SKU options"
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

      {/* Features Section */}
      <Box id="features" sx={{ bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Dynamic Stock Control Modules
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 650, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Bespoke systems designed to streamline inventory replenishment, audit checklists, and checkout tracking.
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

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ pb: 12, pt: 10 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", fontFamily: "Plus Jakarta Sans" }}>
            Answers to common questions about custom inventory management software.
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
