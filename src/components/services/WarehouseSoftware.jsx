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
import InventoryIcon from "@mui/icons-material/Inventory";
import BarcodeIcon from "@mui/icons-material/QrCodeScanner";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
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

export default function WarehouseSoftware() {
  const { openDialog } = useAppointment();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const features = [
    {
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Real-Time Stock Tracking",
      desc: "Instant stock visibility across multiple storage locations, bins, and racks. Eliminate stockouts and discrepancies."
    },
    {
      icon: <BarcodeIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Barcode & QR Code Scanning",
      desc: "Integrate native scanning capabilities for quick barcode printing, receiving, stock picking, and shipping audits."
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Dispatch & Order Fulfillment",
      desc: "Streamline dispatch schedules, pick lists, and packaging flows to minimize delays and customer delivery errors."
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40, color: "#3B6EF8" }} />,
      title: "Analytics & Custom Reporting",
      desc: "Monitor warehouse KPIs, inventory aging, turnover ratios, and operator productivity in real-time."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "What is a Warehouse Management System (WMS)?",
      answer: "A Warehouse Management System (WMS) is a specialized custom software application designed to optimize and manage everyday warehouse operations, track inventory movements, automate pick-pack-ship cycles, and improve overall stock accuracy."
    },
    {
      id: "panel2",
      question: "Can this custom WMS integrate with ERPs and accounting software like Tally or Zoho?",
      answer: "Yes, absolutely! Since our WMS solutions are custom-developed, they can be fully integrated with existing accounting, ERP, and shipping portals (like Tally, Zoho Books, SAP, QuickBooks, and Delhivery) using secure REST APIs."
    },
    {
      id: "panel3",
      question: "Do you support barcode/QR code generation and mobile scanner integrations?",
      answer: "Yes, our custom WMS supports automated generation of barcodes and QR codes for items and palettes. It integrates seamlessly with handheld Android terminal scanners, smartphones, and professional Zebra barcode printers."
    },
    {
      id: "panel4",
      question: "Is this solution suitable for third-party logistics (3PL) providers?",
      answer: "Yes. We design multi-tenant custom WMS software that supports multiple client inventories, custom storage billing calculations, client login portals, and dedicated service reporting."
    }
  ];

  return (
    <Box sx={{ bgcolor: "#020718", minHeight: "100vh", py: { xs: 8, md: 12 }, color: "#fff", overflowX: "hidden" }}>
      <SEO pageKey="warehouse-software" />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <MBox {...fadeUp(0)}>
              <Chip
                label="● WMS SOLUTIONS"
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
                Warehouse Management Software (WMS) Development
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Ship faster, cut errors, and scale your logistics. We build secure, cloud-based Warehouse Management Software tailored to your supply chain workflows, barcode picking, and inventory audits.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#3B6EF8", px: 4, py: 1.5, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#2a5ce8" } }}
                >
                  Request a Quote
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
                Why Custom WMS?
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "No monthly user licensing charges",
                  "Matches your warehouse layout bin-by-bin",
                  "Automates local GST e-Way bills",
                  "Mobile scanner support natively built-in",
                  "Custom analytical reporting dashboard"
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
              Core Features of Our WMS Software
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 650, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Tailored software built to optimize stock control, picking accuracy, and shipping speeds for distributors, retail chains, and 3PL companies.
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

      {/* Case Study Summary */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center" sx={{ bgcolor: "linear-gradient(135deg, rgba(2,7,24,0.8) 0%, rgba(13,22,60,0.5) 100%)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: "#3B6EF8", fontWeight: 700, letterSpacing: 1.5 }}>
              PROVEN RESULTS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3, fontFamily: "DM Sans" }}>
              Successful Case Study: Multi-Location Warehouse Automation
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, mb: 3, fontFamily: "Plus Jakarta Sans" }}>
              We developed a custom WMS for a logistics operator managing 3 distinct warehouses in Chennai. The system replaced legacy Excel tracking with dynamic bin allocations and Android picking scanners.
            </Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box>
                <Typography variant="h2" sx={{ color: "#3B6EF8", fontWeight: 800, fontFamily: "DM Sans" }}>99.8%</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Stock Accuracy</Typography>
              </Box>
              <Box>
                <Typography variant="h2" sx={{ color: "#3B6EF8", fontWeight: 800, fontFamily: "DM Sans" }}>-40%</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Fulfillment Lead Time</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid width={"100%"} item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="img" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" alt="Warehouse logistics automation scan" sx={{ width: "100%", maxWidth: 450, borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.6)" }} />
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
            Got questions about custom Warehouse Software? Here are quick answers from our experts.
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
