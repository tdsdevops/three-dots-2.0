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
import InventoryIcon from "@mui/icons-material/Inventory";
import BarcodeIcon from "@mui/icons-material/QrCodeScanner";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LayersIcon from "@mui/icons-material/Layers";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SecurityIcon from "@mui/icons-material/Security";
import FactCheckIcon from "@mui/icons-material/FactCheck";
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

  const coreModules = [
    {
      icon: <InventoryIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Inwarding & Receiving (GRN)",
      desc: "Record supplier consignments against purchase orders, log batch and serial numbers, and generate barcode/QR labels instantly upon goods arrival."
    },
    {
      icon: <LayersIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Dynamic Bin & Rack Slotting",
      desc: "Assign storage locations by zone, aisle, rack, and bin. Optimize space utilization and retrieve items quickly based on velocity and size."
    },
    {
      icon: <BarcodeIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Barcode Picking & Wave Routing",
      desc: "Generate optimized pick paths using handheld Android scanners. Support FIFO, FEFO, and batch picking to eliminate shipping errors."
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Packing, Dispatch & e-Way Bills",
      desc: "Verify packed items against customer orders, generate shipping manifests, print courier labels, and automate GST e-Way bills."
    },
    {
      icon: <FactCheckIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "Cycle Counts & Stock Audits",
      desc: "Perform physical stock counts by zone without halting operations. Automatically flag variances and update reconciliation logs."
    },
    {
      icon: <SyncAltIcon sx={{ fontSize: 36, color: "#3B6EF8" }} />,
      title: "ERP, Tally & API Integrations",
      desc: "Synchronize inventory, purchase bills, and sales dispatches in real-time with Tally Prime, Zoho Books, SAP, and courier aggregators."
    }
  ];

  const faqs = [
    {
      id: "panel1",
      question: "What is a Warehouse Management System (WMS) and how does it differ from inventory software?",
      answer: "While basic inventory software tracks aggregate stock counts and product prices, a dedicated Warehouse Management System (WMS) governs the physical movement and location of goods inside the warehouse. It manages bin-level slotting, receiving workflows, pick-pack-dispatch cycles, handheld barcode scanner validation, and operator productivity."
    },
    {
      id: "panel2",
      question: "Can this custom WMS integrate with Tally Prime, Zoho Books, or SAP?",
      answer: "Yes, absolutely. Because we build custom WMS solutions, our engineers implement secure REST APIs to synchronize inwarded goods with purchase bills in Tally or Zoho, and auto-deduct stock upon sales dispatch, eliminating duplicate manual data entry."
    },
    {
      id: "panel3",
      question: "What hardware and barcode scanners are supported?",
      answer: "Our software works seamlessly on rugged handheld Android terminal scanners (such as Zebra, Honeywell, and Newland), standard Android/iOS smartphones using device cameras, and industrial thermal barcode printers (Zebra, TSC, TVS) for SKU and palette label printing."
    },
    {
      id: "panel4",
      question: "Can the system support multi-warehouse operations and inter-warehouse transfers?",
      answer: "Yes. Our multi-location warehouse architecture supports centralized visibility across multiple depots, warehouses, and fulfillment centers with dedicated stock transfer notes (STN), in-transit tracking, and location-specific user permissions."
    },
    {
      id: "panel5",
      question: "How does the software handle Indian GST compliance and e-Way bills?",
      answer: "The system is built specifically for Indian supply chains, supporting mandatory HSN code classification, state-wise GST calculations, and automated preparation of dispatch data required for generating GST e-Way bills."
    },
    {
      id: "panel6",
      question: "What is the typical development timeline for a custom warehouse management system?",
      answer: "A focused custom WMS implementation typically takes 6 to 10 weeks depending on custom integration points, workflow complexity, and number of warehouse facilities. We follow an iterative sprint model so you can test active warehouse modules early on."
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
                label="● WMS SOFTWARE INDIA"
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
                Custom Warehouse Management Software (WMS) in India
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.8, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Eliminate picking errors, accelerate dispatch cycles, and achieve 100% bin-level inventory accuracy. Three Dots builds custom, cloud-based Warehouse Management Systems tailored to Indian manufacturers, 3PL distributors, and retail supply chains.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={openDialog}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: "#3B6EF8", px: 4, py: 1.6, fontSize: 15, fontWeight: 700, "&:hover": { bgcolor: "#2a5ce8" } }}
                >
                  Request WMS Consultation
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
                  View Case Studies
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
                Why Indian Businesses Choose Custom WMS
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  "Zero recurring per-user software licensing fees",
                  "Matches your physical warehouse bin, rack, and aisle layout",
                  "Integrated with handheld Android scanners & barcode printers",
                  "Native support for GST e-Way bills and HSN compliance",
                  "Direct two-way synchronization with Tally, Zoho, and ERPs"
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

      {/* Warehouse Challenges & Solutions Section */}
      <Box sx={{ bgcolor: "rgba(255,255,255,0.02)", py: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              Solving Common Warehouse Operational Bottlenecks
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 700, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Generic spreadsheets and off-the-shelf software fail when order volumes grow. Here is how our custom software streamlines daily fulfillment.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {[
              {
                challenge: "Inventory Discrepancies & Stockouts",
                solution: "Real-time ledger updates at every scan point ensure physical stock matches system counts bin-for-bin."
              },
              {
                challenge: "Picking Delays & Wrong Dispatches",
                solution: "Optimized pick path sequencing and barcode verification eliminate wrong items and reduce picker travel time."
              },
              {
                challenge: "Manual Paperwork & Data Re-Entry",
                solution: "Automated Goods Receipt Notes (GRN), pick slips, and invoices eliminate manual entry between warehouse and accounts."
              },
              {
                challenge: "Lack of Multi-Warehouse Visibility",
                solution: "Centralized cloud dashboards provide leadership with real-time stock levels, aging reports, and stock transfer visibility across branches."
              }
            ].map((item, idx) => (
              <Grid item xs={12} md={6} key={idx} width="100%">
                <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 3, p: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: "#ff6b6b", fontWeight: 700, mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>
                      Challenge: {item.challenge}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontFamily: "Plus Jakarta Sans" }}>
                      <strong>Solution:</strong> {item.solution}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Core Workflow Modules Section */}
      <Box id="features" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800, mb: 2, fontFamily: "DM Sans" }}>
              End-to-End Warehouse Workflow Modules
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 700, mx: "auto", fontFamily: "Plus Jakarta Sans" }}>
              Modular architecture built to support receiving, storage, picking, dispatch, and accounting integrations under one roof.
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {coreModules.map((feature, idx) => (
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

      {/* Real-World Case Study Highlight */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{
            bgcolor: "rgba(59,110,248,0.04)",
            borderRadius: "24px",
            border: "1px solid rgba(59,110,248,0.15)",
            p: { xs: 3, md: 5 }
          }}
        >
          <Grid item xs={12} md={7}>
            <Chip label="PROVEN IMPLEMENTATION" sx={{ bgcolor: "rgba(59,110,248,0.15)", color: "#3B6EF8", fontWeight: 700, mb: 2 }} />
            <Typography variant="h2" sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" }, fontWeight: 800, mb: 2.5, fontFamily: "DM Sans" }}>
              Case Study: WMS for MS Industries (500+ Industrial Products)
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, mb: 3, fontFamily: "Plus Jakarta Sans" }}>
              MS Industries required a streamlined system to organize their extensive industrial product catalog, track stock inwarding, and coordinate dispatch operations across their warehouse in Tamil Nadu. Three Dots engineered a custom WMS enabling structured bin allocations, barcode-assisted picking, and unified inventory visibility that later powered their Next.js e-commerce platform.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              <Button
                component={RouterLink}
                to="/case-studies/ms-industries-ecommerce-website-redesign"
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderColor: "#3B6EF8", color: "#a2b9f8", fontWeight: 600 }}
              >
                Read MS Industries Story
              </Button>
              <Button
                component={RouterLink}
                to="/services/inventory-management-software"
                sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline", fontSize: 14 }}
              >
                Explore Inventory Software →
              </Button>
            </Box>
          </Grid>
          <Grid width={"100%"} item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
              alt="Warehouse logistics automation and barcode scanning"
              sx={{ width: "100%", maxWidth: 420, borderRadius: "16px", boxShadow: "0 15px 35px rgba(0,0,0,0.6)" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Internal Links & Contextual Resources */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" sx={{ fontSize: "1.6rem", fontWeight: 800, mb: 3, textAlign: "center", fontFamily: "DM Sans" }}>
          Related Enterprise Software Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/inventory-management-software" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Inventory Management Software →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Real-time stock velocity, SKU tracking, reorder thresholds, and multi-location inventory control.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/custom-software-development" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Custom Software Development →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Bespoke enterprise applications, partner portals, and workflow pipelines engineered in Chennai.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} width="100%">
            <Card sx={{ bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", p: 2, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontSize: "1.1rem", fontWeight: 700, mb: 1, color: "#fff" }}>
                <RouterLink to="/services/erp-development" style={{ color: "#3B6EF8", textDecoration: "none" }}>
                  Custom ERP Development →
                </RouterLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Unify warehouse dispatches with financial accounting, purchasing, and executive business dashboards.
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
            Got questions about custom Warehouse Management Software in India? Here are detailed answers from our development team.
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
            Ready to Streamline Your Warehouse Operations?
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)", mb: 3, maxWidth: 500, mx: "auto" }}>
            Schedule a free technical discovery call with our software architects in Chennai to map your warehouse workflow.
          </Typography>
          <Button
            variant="contained"
            onClick={openDialog}
            sx={{ bgcolor: "#3B6EF8", px: 4, py: 1.4, fontWeight: 700, "&:hover": { bgcolor: "#2a5ce8" } }}
          >
            Schedule Technical Consultation
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
