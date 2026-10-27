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
import WarehouseIcon from "@mui/icons-material/Warehouse";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
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
      icon: <WarehouseIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Multi-Store Stock Visibility",
      desc: "Monitor live stock levels across retail outlets, regional branches, and central godowns from one unified cloud dashboard."
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Auto-Reorder Thresholds",
      desc: "Define safety stock limits per SKU. Receive automated email or SMS notifications and generate draft supplier purchase orders when stocks run low."
    },
    {
      icon: <QrCodeIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "SKU, Batch & Barcode Tracking",
      desc: "Track items with serial numbers, batch lot codes, and manufacturing/expiry dates. Scan and look up items instantly with barcode readers."
    },
    {
      icon: <ReceiptIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "GST HSN/SAC Compliance",
      desc: "Assign standard HSN and SAC codes to item catalogs, automate CGST/SGST/IGST tax classification, and prepare accurate GST filing logs."
    },
    {
      icon: <SyncAltIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Inter-Branch Stock Transfers",
      desc: "Manage transfer requisitions between stores and warehouses with stock transit tracking, dispatch notes, and inward verification receipts."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Valuation & Aging Reports",
      desc: "Calculate inventory value using FIFO costing, identify dead or slow-moving stock, and measure SKU sales turnover ratios."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "What is the difference between Inventory Software and a Warehouse Management System (WMS)?",
      answer: "Inventory Management Software tracks what products you own, their quantities, cost valuations, reorder alerts, and sales across stores. A Warehouse Management System (WMS) is specialized software that directs how goods are physically handled inside a warehouse facility—including bin and rack slotting, barcode picker route optimization, and packing manifests. If your operations require physical rack slotting and barcode picking, explore our Warehouse Management Software."
    },
    {
      id: "panel2",
      question: "How does the auto-reorder system prevent stockouts?",
      answer: "For every SKU or product variant, you can set a 'Minimum Safety Stock' threshold and a 'Reorder Quantity'. When sales, outward shipments, or transfers reduce the available quantity to or below the safety threshold, the system flags the item on your purchasing dashboard and can auto-draft a purchase order to your designated vendor."
    },
    {
      id: "panel3",
      question: "Can we track inventory across multiple physical stores or branches in real time?",
      answer: "Yes. Our cloud database architecture synchronizes inventory counts across multiple retail stores, depots, and e-commerce channels in real time. When an item is sold at one branch, central stock levels update immediately."
    },
    {
      id: "panel4",
      question: "Does the system integrate with existing accounting software like Tally or Zoho Books?",
      answer: "Yes. Through custom REST API endpoints, purchase inwarding and inventory consumption entries can automatically feed into Tally Prime or Zoho Books, keeping your financial statements and stock valuations synchronized."
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
                label="● INVENTORY SOFTWARE INDIA"
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
                Custom Inventory Management Software Solutions
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Take complete control of your stock. Three Dots engineers custom, cloud-based inventory management software for Indian businesses featuring real-time SKU tracking, multi-branch visibility, auto-reorder threshold alerts, and GST HSN compliance.
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
                  to="/services/warehouse-management-software"
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
                  Looking for WMS? →
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
                Operational Highlights
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "Eliminates manual spreadsheet reconciliation errors",
                  "Automated safety stock triggers & low alert notifications",
                  "Consolidated multi-branch item balances and transfer logs",
                  "Native barcode generation and handheld scanner lookup",
                  "GST-compliant HSN/SAC master with state tax slabs"
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

      {/* Features Section */}
      <Box id="features" sx={{ bgcolor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Core Inventory Management Modules
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 680, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Engineered to streamline replenishment cycles, prevent capital lockup in dead stock, and maintain accurate inventory valuations.
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

      {/* Comparison: Inventory Software vs WMS */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            bgcolor: "rgba(59,110,248,0.03)",
            borderRadius: "24px",
            border: "1px solid rgba(59,110,248,0.12)",
            p: { xs: 3, md: 5 }
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans", textAlign: "center" }}>
            Choosing Between Inventory Software & WMS
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: 700, mx: "auto", mb: 4, fontFamily: "Plus Jakarta Sans" }}>
            Not sure whether your business needs Inventory Management or a full Warehouse Management System? Here is a practical comparison:
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", p: 3, borderRadius: 3, height: "100%" }}>
                <Chip label="INVENTORY SOFTWARE" sx={{ bgcolor: "rgba(59,110,248,0.15)", color: "#3B6EF8", fontWeight: 700, mb: 2 }} />
                <Typography variant="h3" sx={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", mb: 2 }}>
                  Best for Stock Tracking & Replenishment
                </Typography>
                <List dense sx={{ p: 0 }}>
                  {[
                    "Tracks what and how much you have across stores",
                    "Safety stock thresholds & auto-drafting purchase orders",
                    "FIFO stock valuation and gross margin calculations",
                    "Sales channel and e-commerce stock balance sync"
                  ].map((pt, i) => (
                    <ListItem key={i} sx={{ px: 0, py: 0.8 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon sx={{ color: "#3B6EF8", fontSize: 18 }} /></ListItemIcon>
                      <ListItemText primary={pt} primaryTypographyProps={{ style: { fontSize: 14 } }} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", p: 3, borderRadius: 3, height: "100%" }}>
                <Chip label="WAREHOUSE MANAGEMENT (WMS)" sx={{ bgcolor: "rgba(139,92,246,0.15)", color: "#8B5CF6", fontWeight: 700, mb: 2 }} />
                <Typography variant="h3" sx={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", mb: 2 }}>
                  Best for Physical Warehouse Floor Operations
                </Typography>
                <List dense sx={{ p: 0 }}>
                  {[
                    "Tracks exactly where items sit (aisle, rack, bin, shelf)",
                    "Picker route sequencing with handheld barcode scanners",
                    "Inward quality control, palletization, and wave picking",
                    "Packing validation, dispatch manifests, and GST e-Way bills"
                  ].map((pt, i) => (
                    <ListItem key={i} sx={{ px: 0, py: 0.8 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}><CheckCircleOutlineIcon sx={{ color: "#8B5CF6", fontSize: 18 }} /></ListItemIcon>
                      <ListItemText primary={pt} primaryTypographyProps={{ style: { fontSize: 14 } }} />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2 }}>
                  <RouterLink to="/services/warehouse-management-software" style={{ color: "#8B5CF6", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                    Explore Warehouse Management Software →
                  </RouterLink>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Internal Links & Contextual Resources */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800, mb: 3, textAlign: "center", fontFamily: "DM Sans" }}>
          Related Business Solutions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/custom-software-development" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Custom Software Development →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Bespoke enterprise applications and client portals designed by engineers in Chennai.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/erp-development" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Custom ERP Development →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Connect inventory replenishment with financial accounting, vendor payments, and reporting.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2.5, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/tools/gst-invoice-generator" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Free GST Invoice Generator →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Generate GST-compliant tax invoices instantly online with automated CGST/SGST/IGST calculations.
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
            Answers to common questions regarding custom inventory tracking and software integration.
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
