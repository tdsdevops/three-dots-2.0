import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Divider,
  Switch,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Print as PrintIcon, PictureAsPdf as PdfIcon, Share as ShareIcon, RotateLeft as ResetIcon, CloudUpload as UploadIcon } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import SEO from "../../components/SEO";
import { getContactEmailTemplate } from "../../utils/emailTemplates";
import { sendEmail } from "../../utils/sendEmail";


// Indian states and UTs for GST State of Supply check
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry"
];

// Helper to convert numbers to Indian Rupees in words
const convertNumberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const numToString = (n) => {
    if (n < 20) return a[n];
    const digit = n % 10;
    return b[Math.floor(n / 10)] + (digit ? ' ' + a[digit] : '');
  };

  const getWords = (n) => {
    if (n === 0) return 'Zero';
    let words = '';
    
    // Crore
    if (Math.floor(n / 10000000) > 0) {
      words += numToString(Math.floor(n / 10000000)) + ' Crore ';
      n %= 10000000;
    }
    
    // Lakh
    if (Math.floor(n / 100000) > 0) {
      words += numToString(Math.floor(n / 100000)) + ' Lakh ';
      n %= 100000;
    }
    
    // Thousand
    if (Math.floor(n / 1000) > 0) {
      words += numToString(Math.floor(n / 1000)) + ' Thousand ';
      n %= 1000;
    }
    
    // Hundred
    if (Math.floor(n / 100) > 0) {
      words += numToString(Math.floor(n / 100)) + ' Hundred ';
      n %= 100;
    }
    
    // Remaining
    if (n > 0) {
      if (words !== '') words += 'and ';
      if (n < 20) words += a[n];
      else {
        words += b[Math.floor(n / 10)];
        if (n % 10) words += ' ' + a[n % 10];
      }
    }
    return words.trim();
  };

  const roundedNum = Math.round(num * 100) / 100;
  const rupees = Math.floor(roundedNum);
  const paise = Math.round((roundedNum - rupees) * 100);

  let result = '';
  if (rupees > 0) {
    result += getWords(rupees) + ' Rupees';
  } else {
    result += 'Zero Rupees';
  }

  if (paise > 0) {
    result += ' and ' + getWords(paise) + ' Paise';
  }
  result += ' Only';
  return result;
};

const defaultInvoiceState = {
  invoiceNumber: "INV-2026-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  })(),
  supplierName: "",
  supplierGSTIN: "",
  supplierEmail: "",
  supplierPhone: "",
  supplierAddress: "",
  supplierState: "Tamil Nadu",
  clientName: "",
  clientGSTIN: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",
  clientState: "Tamil Nadu",
  items: [
    { id: 1, description: "Consulting Services", hsn: "998313", qty: 1, rate: 15000, discount: 0, gstRate: 18 }
  ],
  notes: "Thank you for choosing ThreeDots. We appreciate your business!",
  terms: "1. Goods/Services once sold/rendered cannot be returned or refunded.\n2. Payment must be made within the due date to avoid late payment charges.\n3. All disputes are subject to local jurisdiction.",
  bankName: "",
  bankAccount: "",
  bankIfsc: "",
  bankBranch: "",
  upiId: "",
  logo: "",
  gstEnabled: true,
  hsnEnabled: true
};

export default function InvoiceGenerator({ seoKey }) {
  const [invoice, setInvoice] = useState(() => {
    const saved = localStorage.getItem("threedots_invoice");
    return saved ? { ...defaultInvoiceState, ...JSON.parse(saved) } : defaultInvoiceState;
  });

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadData, setLeadData] = useState({
    email: "",
    phone: "",
    interestedInDev: false,
    interestedInERP: false,
    interestedInMobile: false,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [activeTab, setActiveTab] = useState(0);
  const previewRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("threedots_invoice", JSON.stringify(invoice));
  }, [invoice]);

  const handleInputChange = (field, val) => {
    setInvoice(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (id, field, val) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  };

  const addItem = () => {
    const newId = invoice.items.length > 0 ? Math.max(...invoice.items.map(i => i.id)) + 1 : 1;
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, description: "", hsn: "", qty: 1, rate: 0, discount: 0, gstRate: 18 }]
    }));
  };

  const removeItem = (id) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setInvoice(defaultInvoiceState);
      localStorage.removeItem("threedots_invoice");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setSnackbar({ open: true, message: "Only PNG, JPG, and SVG files are supported.", severity: "error" });
      return;
    }
    if (file.size > 2000000) {
      setSnackbar({ open: true, message: "Logo file size must be less than 2 MB", severity: "error" });
      return;
    }

    const reader = new FileReader();

    if (file.type === "image/svg+xml") {
      // SVG: read as text, encode to a data URI so <img> can render it reliably
      reader.onload = (ev) => {
        const svgText = ev.target.result;
        const encoded = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
        handleInputChange("logo", encoded);
      };
      reader.readAsText(file);
    } else {
      // PNG / JPG: standard base64 data URL
      reader.onload = (ev) => {
        handleInputChange("logo", ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculations
  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let cgstTotal = 0;
    let sgstTotal = 0;
    let igstTotal = 0;

    const isSameState = invoice.supplierState === invoice.clientState;

    invoice.items.forEach(item => {
      const lineTotal = item.qty * item.rate;
      const discAmt = lineTotal * (item.discount / 100);
      const taxableVal = lineTotal - discAmt;
      const gstAmt = invoice.gstEnabled ? (taxableVal * (item.gstRate / 100)) : 0;

      subtotal += lineTotal;
      totalDiscount += discAmt;

      if (invoice.gstEnabled) {
        if (isSameState) {
          cgstTotal += gstAmt / 2;
          sgstTotal += gstAmt / 2;
        } else {
          igstTotal += gstAmt;
        }
      }
    });

    const grandTotal = subtotal - totalDiscount + cgstTotal + sgstTotal + igstTotal;

    return {
      subtotal,
      totalDiscount,
      cgstTotal,
      sgstTotal,
      igstTotal,
      grandTotal
    };
  };

  const isSameState = invoice.supplierState === invoice.clientState;
  const totals = calculateTotals();

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // PDF trigger and Lead submission
  const triggerPdfDownload = async () => {
    setSnackbar({ open: true, message: "Generating PDF. Please wait...", severity: "info" });
    try {
      const element = previewRef.current;
      if (!element) throw new Error("Preview element not found");

      // Helper: convert any img element with SVG src to PNG data URL via canvas
      const svgImgToPng = (imgEl) =>
        new Promise((resolve) => {
          const src = imgEl.getAttribute("src") || "";
          if (!src.includes("svg")) { resolve(null); return; }
          const image = new Image();
          image.onload = () => {
            const c = document.createElement("canvas");
            c.width = image.naturalWidth || 300;
            c.height = image.naturalHeight || 100;
            const ctx = c.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.drawImage(image, 0, 0);
            resolve(c.toDataURL("image/png"));
          };
          image.onerror = () => resolve(null);
          image.src = src;
        });

      // Temporarily force white background and remove shadow/border-radius for clean capture
      const originalBg = element.style.background;
      const originalBoxShadow = element.style.boxShadow;
      const originalBorderRadius = element.style.borderRadius;
      element.style.background = "#ffffff";
      element.style.boxShadow = "none";
      element.style.borderRadius = "0";

      // Wait for all images inside element to fully load
      const allImgs = Array.from(element.querySelectorAll("img"));
      await Promise.all(
        allImgs.map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.onload = res;
                  img.onerror = res;
                })
        )
      );

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 0,       // Don't time out image loading
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: async (clonedDoc, clonedElement) => {
          // Force white bg on cloned element
          clonedElement.style.background = "#ffffff";
          clonedElement.style.boxShadow = "none";
          clonedElement.style.borderRadius = "0";

          // Convert all SVG img sources to PNG so html2canvas can render them
          const imgs = Array.from(clonedElement.querySelectorAll("img"));
          for (const img of imgs) {
            const src = img.getAttribute("src") || "";
            if (src.includes("svg")) {
              const pngData = await svgImgToPng(img);
              if (pngData) {
                img.setAttribute("src", pngData);
              }
            }
            // Also ensure crossOrigin is set
            img.crossOrigin = "anonymous";
          }
        },
      });

      // Restore original element styles
      element.style.background = originalBg;
      element.style.boxShadow = originalBoxShadow;
      element.style.borderRadius = originalBorderRadius;

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      // A4 dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;
      
      // Content size is 95% of page dimensions
      const contentWidth = pageWidth * 1;
      const contentHeight = pageHeight * 0.95;

      // Scale image to fit page width and height within 1 page
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      let imgWidthMm = contentWidth;
      let imgHeightMm = (imgHeightPx / imgWidthPx) * imgWidthMm;

      // Scale down to fit the height of a single page if needed
      if (imgHeightMm > contentHeight) {
        const scaleFactor = contentHeight / imgHeightMm;
        imgHeightMm = contentHeight;
        imgWidthMm = imgWidthMm * scaleFactor;
      }

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      // Centered horizontally and vertically on the A4 page
      const xOffset = (pageWidth - imgWidthMm) / 2;
      const yOffset = (pageHeight - imgHeightMm) / 2;

      doc.addImage(imgData, "JPEG", xOffset, yOffset, imgWidthMm, imgHeightMm);

      doc.save(`Invoice-${invoice.invoiceNumber || "UNSET"}.pdf`);
      setSnackbar({ open: true, message: "PDF Downloaded Successfully!", severity: "success" });
      setLeadModalOpen(false)
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to generate PDF.", severity: "error" });
    }
  };

  const handleDownloadClick = () => {
    const submitted = localStorage.getItem("threedots_lead_submitted");
    if (!submitted) {
      setLeadModalOpen(true);
    } else {
      triggerPdfDownload();
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.email) {
      setSnackbar({ open: true, message: "Please provide a valid email", severity: "warning" });
      return;
    }

    try {
      // Send lead to backend API or Supabase if configured
      // For now, save local flag and log it. In a production app, this would hit a DB.
      localStorage.setItem("threedots_lead_submitted", "true");
      console.log("Lead captured:", leadData);
            const payload = {
                to: import.meta.env.VITE_CONTACT_EMAIL,
                from: import.meta.env.VITE_FROM_EMAIL,
                subject: `New Contact Inquiry from Invoice Generator`,
                html: getContactEmailTemplate({
                  firstName: leadData?.firstName??"No Data",
                  lastName: leadData?.lastName??"No Data",
                  email: leadData?.email??"No Data",
                  country: leadData?.country??"No Data",
                  category:leadData?.category??"No Data",
                  message: leadData?.message??"No Data",
                  phone:leadData?.phone??"No Data"
                })
              };
        
              const functionName = import.meta.env.VITE_EDGE_FUNCTION_NAME || "email-services";
              const res =  sendEmail(functionName, payload); 
      setLeadModalOpen(false);
      setSnackbar({ open: true, message: "Thank you! Starting download...", severity: "success" });
      
      // Delay slightly for UX before download starts
      setTimeout(() => {
        triggerPdfDownload();
      }, 500);
    } catch (err) {
      console.error("Error submitting lead:", err);
      // Fallback: start download anyway to maintain goodwill
      setLeadModalOpen(false);
      triggerPdfDownload();
    }
  };

  // Web Share / WhatsApp Share
  const handleShare = () => {
    const shareText = `Hi, please find the details of Invoice #${invoice.invoiceNumber} for ₹${totals.grandTotal.toFixed(2)}. Direct Link: https://three-dots.in/tools/invoice-generator`;
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <SEO pageKey={seoKey || "invoice-generator"} />

      {/* Embedded print styling for zero margins and clean printing */}
      <style>{`
        @media print {
          /* Hide all non-printable layout wrappers, headers, footers, sidebars */
          header, footer, nav, aside, .no-print, [class*="Header"], [class*="Footer"], .no-print-section {
            display: none !important;
          }
          
          /* Reset root backgrounds and layout structures */
          body, html, #root, main, .MuiBox-root, .MuiContainer-root, .MuiGrid-container {
            background: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            min-height: 0 !important;
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
          }

          /* Force the preview grid column to take 100% full width */
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            flex-basis: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Reset A4 dimensions and style the printed page sheet */
          #print-area {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #fff !important;
            color: #000 !important;
          }

          .preview-scroll-wrapper {
            overflow: visible !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Force borders and visibility on printed tables */
          #print-area table {
            border-collapse: collapse !important;
            width: 100% !important;
          }
          #print-area th, #print-area td {
            border: 1px solid #ddd !important;
            padding: 8px !important;
            color: #000 !important;
          }
          
          @page {
            size: A4;
            margin: 15mm !important;
          }
        }
      `}</style>

      {/* Main Container */}
      <Box sx={{ minHeight: "100vh", bgcolor: "#020718", color: "#fff", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          {/* Hero Details */}
          <Box className="no-print-section" sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "#fff", fontFamily: "DM Sans" }}>
              Free Custom Invoice Generator
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#aaa", maxWidth: "700px", mx: "auto" }}>
              Create GST-compliant invoices in seconds. Customize with your logo, calculate CGST/SGST/IGST automatically, download as a high-fidelity PDF, and print.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Form Editor Panel (Left) */}
            <Grid item xs={12} lg={6} className="no-print-section">
              <Paper sx={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 3,
                color: "#fff"
              }}>
                 <Box sx={{ width:{xs:"100%" , lg:"94vw"} ,display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 1.5 }}>
                   <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "DM Sans" }}>
                     Invoice Creator
                   </Typography>
                   <Typography variant="caption" sx={{ color: "#28a745", display: "flex", alignItems: "center", gap: 0.5 }}>
                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#28a745", boxShadow: "0 0 8px #28a745" }} />
                     Draft Saved
                   </Typography>
                 </Box>

                 <Tabs
                   value={activeTab}
                   onChange={(e, val) => setActiveTab(val)}
                   variant="fullWidth"
                   sx={{
                     mb: 4,
                     borderBottom: "1px solid rgba(255,255,255,0.1)",
                     "& .MuiTab-root": {
                       color: "#aaa",
                       fontWeight: 600,
                       textTransform: "none",
                       fontSize: "0.9rem",
                       py: 1.5,
                       transition: "all 0.3s"
                     },
                     "& .Mui-selected": {
                       color: "#3B6EF8",
                     },
                     "& .MuiTabs-indicator": {
                       bgcolor: "#3B6EF8",
                       height: "3px",
                       borderRadius: "3px",
                      
                     }
                   }}
                 >
                   <Tab label="1. Businesses" />
                   <Tab label="2. Items & Details" />
                   <Tab label="3. Payment & Notes" />
                 </Tabs>

                 {/* TAB 0: Businesses (Seller & Client) */}
                 {activeTab === 0 && (
                   <Box>
                     {/* Section: Company Details */}
                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3B6EF8", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                       Company Details (Seller)
                     </Typography>
                     <Grid container spacing={2} sx={{ mb: 3 }}>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Company Name" variant="outlined" value={invoice.supplierName} onChange={(e) => handleInputChange("supplierName", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="GSTIN" variant="outlined" value={invoice.supplierGSTIN} onChange={(e) => handleInputChange("supplierGSTIN", e.target.value)} disabled={!invoice.gstEnabled} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                        </Grid>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Email Address" variant="outlined" value={invoice.supplierEmail} onChange={(e) => handleInputChange("supplierEmail", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Phone Number" variant="outlined" value={invoice.supplierPhone} onChange={(e) => handleInputChange("supplierPhone", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         <FormControl fullWidth disabled={!invoice.gstEnabled} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }}>
                           <InputLabel style={{ color: "#aaa" }}>State of Supply</InputLabel>
                           <Select value={invoice.supplierState} onChange={(e) => handleInputChange("supplierState", e.target.value)} label="State of Supply" style={{ color: "#fff" }}>
                             {INDIAN_STATES.map(st => (
                               <MenuItem key={st} value={st}>{st}</MenuItem>
                             ))}
                           </Select>
                         </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         {invoice.logo ? (
                           <Box sx={{ 
                             display: "flex", 
                             alignItems: "center", 
                             gap: 2, 
                             border: "1px solid rgba(255,255,255,0.2)", 
                             borderRadius: 1, 
                             p: 1, 
                             height: "56px",
                             bgcolor: "rgba(255,255,255,0.02)"
                           }}>
                             <Box 
                               component="img" 
                               src={invoice.logo} 
                               sx={{ 
                                 height: "40px", 
                                 width: "60px", 
                                 objectFit: "contain", 
                                 bgcolor: "#fff", 
                                 borderRadius: "4px", 
                                 p: 0.5 
                               }} 
                             />
                             <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                               <Typography variant="caption" sx={{ color: "#aaa", fontWeight: 600 }}>Logo Uploaded</Typography>
                               <Box sx={{ display: "flex", gap: 1.5 }}>
                                 <Button 
                                   component="label" 
                                   variant="text" 
                                   size="small" 
                                   sx={{ p: 0, minWidth: 0, fontSize: "0.75rem", color: "#3B6EF8", textTransform: "none" }}
                                 >
                                   Change
                                   <input type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml" hidden onChange={handleLogoUpload} />
                                 </Button>
                                 <Button 
                                   variant="text" 
                                   size="small" 
                                   color="error" 
                                   onClick={() => handleInputChange("logo", "")}
                                   sx={{ p: 0, minWidth: 0, fontSize: "0.75rem", textTransform: "none" }}
                                 >
                                   Remove
                                 </Button>
                               </Box>
                             </Box>
                           </Box>
                         ) : (
                           <Button variant="outlined" component="label" startIcon={<UploadIcon />} fullWidth sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)", height: "56px", textTransform: "none" }}>
                             Upload Logo (PNG / JPG / SVG)
                             <input type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml" hidden onChange={handleLogoUpload} />
                           </Button>
                         )}
                       </Grid>
                       <Grid item xs={12}>
                         <TextField fullWidth multiline rows={2} label="Address" variant="outlined" value={invoice.supplierAddress} onChange={(e) => handleInputChange("supplierAddress", e.target.value)} sx={{ textarea: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                     </Grid>

                     <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />

                     {/* Section: Customer Info */}
                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3B6EF8", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                       Client Details (Buyer)
                     </Typography>
                     <Grid container spacing={2} sx={{ mb: 3 }}>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Client Name" variant="outlined" value={invoice.clientName} onChange={(e) => handleInputChange("clientName", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Client GSTIN" variant="outlined" value={invoice.clientGSTIN} onChange={(e) => handleInputChange("clientGSTIN", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Client Email" variant="outlined" value={invoice.clientEmail} onChange={(e) => handleInputChange("clientEmail", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Client Phone" variant="outlined" value={invoice.clientPhone} onChange={(e) => handleInputChange("clientPhone", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12}>
                         <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }}>
                           <InputLabel style={{ color: "#aaa" }}>Place of Supply (State)</InputLabel>
                           <Select value={invoice.clientState} onChange={(e) => handleInputChange("clientState", e.target.value)} label="Place of Supply (State)" style={{ color: "#fff" }}>
                             {INDIAN_STATES.map(st => (
                               <MenuItem key={st} value={st}>{st}</MenuItem>
                             ))}
                           </Select>
                         </FormControl>
                       </Grid>
                       <Grid item xs={12}>
                         <TextField fullWidth multiline rows={2} label="Billing Address" variant="outlined" value={invoice.clientAddress} onChange={(e) => handleInputChange("clientAddress", e.target.value)} sx={{ textarea: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                     </Grid>

                     <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                       <Button variant="contained" onClick={() => setActiveTab(1)} sx={{ bgcolor: "#3B6EF8", "&:hover": { bgcolor: "#2a5ce8" } }}>
                         Continue to Items ➜
                       </Button>
                     </Box>
                   </Box>
                 )}

                 {/* TAB 1: Invoice & Items */}
                 {activeTab === 1 && (
                   <Box>
                     {/* Section: Invoice Meta */}
                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3B6EF8", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                       Invoice Details
                     </Typography>
                     <Grid container spacing={2} sx={{ mb: 3 }}>
                       <Grid item xs={12} sm={4}>
                         <TextField fullWidth label="Invoice Number" variant="outlined" value={invoice.invoiceNumber} onChange={(e) => handleInputChange("invoiceNumber", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <TextField fullWidth type="date" label="Invoice Date" variant="outlined" value={invoice.invoiceDate} onChange={(e) => handleInputChange("invoiceDate", e.target.value)} InputLabelProps={{ shrink: true, style: { color: "#aaa" } }} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} />
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <TextField fullWidth type="date" label="Due Date" variant="outlined" value={invoice.dueDate} onChange={(e) => handleInputChange("dueDate", e.target.value)} InputLabelProps={{ shrink: true, style: { color: "#aaa" } }} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} />
                       </Grid>
                     </Grid>

                      {/* Configuration Toggles */}
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", height: "100%" }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#fff" }}>Apply GST?</Typography>
                              <Typography variant="caption" sx={{ color: "#aaa" }}>
                                {invoice.gstEnabled ? "GST calculations enabled" : "No tax calculations"}
                              </Typography>
                            </Box>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={!!invoice.gstEnabled}
                                  onChange={(e) => handleInputChange("gstEnabled", e.target.checked)}
                                  sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#3B6EF8" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#3B6EF8" } }}
                                />
                              }
                              label={<Typography variant="body2" sx={{ color: invoice.gstEnabled ? "#3B6EF8" : "#aaa", fontWeight: 700 }}>{invoice.gstEnabled ? "ON" : "OFF"}</Typography>}
                              labelPlacement="start"
                              sx={{ m: 0 }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", height: "100%" }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#fff" }}>Apply HSN/SAC?</Typography>
                              <Typography variant="caption" sx={{ color: "#aaa" }}>
                                {invoice.hsnEnabled ? "HSN/SAC codes enabled" : "No HSN/SAC codes"}
                              </Typography>
                            </Box>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={!!invoice.hsnEnabled}
                                  onChange={(e) => handleInputChange("hsnEnabled", e.target.checked)}
                                  sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#3B6EF8" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#3B6EF8" } }}
                                />
                              }
                              label={<Typography variant="body2" sx={{ color: invoice.hsnEnabled ? "#3B6EF8" : "#aaa", fontWeight: 700 }}>{invoice.hsnEnabled ? "ON" : "OFF"}</Typography>}
                              labelPlacement="start"
                              sx={{ m: 0 }}
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      {/* GST Status Indicator Badge — only when GST on */}
                      {invoice.gstEnabled && (
                        <Box sx={{ 
                          mb: 3, 
                          p: 1.5, 
                          borderRadius: 2, 
                          bgcolor: isSameState ? "rgba(59, 110, 248, 0.1)" : "rgba(156, 39, 176, 0.1)",
                          borderLeft: `4px solid ${isSameState ? "#3B6EF8" : "#9c27b0"}`
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: isSameState ? "#5b8cfc" : "#d05ce3" }}>
                            GST Rule Applied: {isSameState ? "Intra-state (CGST + SGST)" : "Inter-state (IGST)"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#aaa" }}>
                            {isSameState 
                              ? `Both states match (${invoice.supplierState}). Tax will split into CGST (half) and SGST (half).`
                              : `States differ (${invoice.supplierState} to ${invoice.clientState || "UNSET"}). Tax will apply as full IGST.`}
                          </Typography>
                        </Box>
                      )}

                     {/* Section: Product/Service Items */}
                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                       <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3B6EF8", display: "flex", alignItems: "center", gap: 1 }}>
                         Products / Services
                       </Typography>
                       <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={addItem} sx={{ bgcolor: "#3B6EF8", "&:hover": { bgcolor: "#2a5ce8" } }}>Add Item</Button>
                     </Box>
                     {invoice.items.map((item, index) => (
                       <Box key={item.id} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", bgcolor: "rgba(255,255,255,0.02)" }}>
                         <Grid container spacing={2}>
                           <Grid item xs={12} sm={4}>
                             <TextField fullWidth size="small" label="Description" value={item.description} onChange={(e) => handleItemChange(item.id, "description", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                           </Grid>
                           <Grid item xs={6} sm={2}>
                             <TextField fullWidth size="small" label="HSN/SAC" value={item.hsn} onChange={(e) => handleItemChange(item.id, "hsn", e.target.value)} disabled={!invoice.hsnEnabled} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                           </Grid>
                           <Grid item xs={6} sm={2}>
                             <TextField fullWidth size="small" type="number" label="Qty" value={item.qty} onChange={(e) => handleItemChange(item.id, "qty", parseFloat(e.target.value) || 0)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                           </Grid>
                           <Grid item xs={6} sm={2}>
                             <TextField fullWidth size="small" type="number" label="Rate (₹)" value={item.rate} onChange={(e) => handleItemChange(item.id, "rate", parseFloat(e.target.value) || 0)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                           </Grid>
                           <Grid item xs={6} sm={2}>
                             <FormControl fullWidth size="small" disabled={!invoice.gstEnabled} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }}>
                               <InputLabel style={{ color: "#aaa" }}>GST %</InputLabel>
                               <Select value={item.gstRate} onChange={(e) => handleItemChange(item.id, "gstRate", parseInt(e.target.value))} label="GST %" style={{ color: "#fff" }}>
                                 <MenuItem value={0}>0%</MenuItem>
                                 <MenuItem value={5}>5%</MenuItem>
                                 <MenuItem value={12}>12%</MenuItem>
                                 <MenuItem value={18}>18%</MenuItem>
                                 <MenuItem value={28}>28%</MenuItem>
                               </Select>
                             </FormControl>
                           </Grid>
                           <Grid item xs={8} sm={10}>
                             <TextField fullWidth size="small" type="number" label="Discount %" value={item.discount} onChange={(e) => handleItemChange(item.id, "discount", parseFloat(e.target.value) || 0)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                           </Grid>
                           <Grid item xs={4} sm={2} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                             <IconButton color="error" onClick={() => removeItem(item.id)} disabled={invoice.items.length === 1}>
                               <DeleteIcon />
                             </IconButton>
                           </Grid>
                         </Grid>
                       </Box>
                     ))}

                     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                       <Button variant="outlined" onClick={() => setActiveTab(0)} sx={{ color: "#aaa", borderColor: "rgba(255,255,255,0.2)" }}>
                         Back
                       </Button>
                       <Button variant="contained" onClick={() => setActiveTab(2)} sx={{ bgcolor: "#3B6EF8", "&:hover": { bgcolor: "#2a5ce8" } }}>
                         Continue to Payments ➜
                       </Button>
                     </Box>
                   </Box>
                 )}

                 {/* TAB 2: Payment & Notes */}
                 {activeTab === 2 && (
                   <Box>
                     {/* Section: Payment Info */}
                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3B6EF8", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                       Bank & UPI Details (Optional)
                     </Typography>
                     <Grid container spacing={2} sx={{ mb: 3 }}>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Bank Name" variant="outlined" value={invoice.bankName} onChange={(e) => handleInputChange("bankName", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                         <TextField fullWidth label="Account Number" variant="outlined" value={invoice.bankAccount} onChange={(e) => handleInputChange("bankAccount", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <TextField fullWidth label="IFSC Code" variant="outlined" value={invoice.bankIfsc} onChange={(e) => handleInputChange("bankIfsc", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <TextField fullWidth label="Branch Name" variant="outlined" value={invoice.bankBranch} onChange={(e) => handleInputChange("bankBranch", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12} sm={4}>
                         <TextField fullWidth label="UPI ID" variant="outlined" value={invoice.upiId} onChange={(e) => handleInputChange("upiId", e.target.value)} sx={{ input: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                     </Grid>

                     <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />

                     {/* Section: Notes & Terms */}
                     <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3B6EF8", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                       Terms & Notes
                     </Typography>
                     <Grid container spacing={2}>
                       <Grid item xs={12}>
                         <TextField fullWidth multiline rows={2} label="Notes" variant="outlined" value={invoice.notes} onChange={(e) => handleInputChange("notes", e.target.value)} sx={{ textarea: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                       <Grid item xs={12}>
                         <TextField fullWidth multiline rows={2} label="Terms & Conditions" variant="outlined" value={invoice.terms} onChange={(e) => handleInputChange("terms", e.target.value)} sx={{ textarea: { color: "#fff" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } } }} InputLabelProps={{ style: { color: "#aaa" } }} />
                       </Grid>
                     </Grid>

                     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                       <Button variant="outlined" onClick={() => setActiveTab(1)} sx={{ color: "#aaa", borderColor: "rgba(255,255,255,0.2)" }}>
                         Back
                       </Button>
                       <Button variant="outlined" color="error" startIcon={<ResetIcon />} onClick={handleReset}>
                         Reset Form
                       </Button>
                     </Box>
                   </Box>
                 )}
              </Paper>
            </Grid>

             {/* Live Preview Panel (Right) */}
            <Grid item xs={12} lg={6} className="print-full-width">
              <Box sx={{ position: "sticky", top: "24px" }}>
                {/* Actions Row */}
                <Box className="no-print-section" sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  <Button variant="contained" startIcon={<PdfIcon />} onClick={handleDownloadClick} sx={{ bgcolor: "#28a745", "&:hover": { bgcolor: "#218838" }, flexGrow: 1 }}>
                    Download PDF
                  </Button>
                  {/* <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ bgcolor: "#3B6EF8", "&:hover": { bgcolor: "#2a5ce8" }, flexGrow: 1 }}>
                    Print Invoice
                  </Button> */}
                  {/* <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShare} sx={{ color: "#25d366", borderColor: "#25d366", "&:hover": { borderColor: "#128c7e", bgcolor: "rgba(37,211,102,0.05)" }, flexGrow: 1 }}>
                    Share WhatsApp
                  </Button> */}
                </Box>

                {/* Mobile scroll hint */}
                <Box
                  className="no-print-section"
                  sx={{
                    display: { xs: "flex", md: "none" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 1.5,
                    color: "#aaa",
                    fontSize: "0.8rem"
                  }}
                >
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    ← Swipe / scroll horizontally to view full preview →
                  </Typography>
                </Box>

                {/* Paper invoice container wrapper for horizontal scrolling on mobile */}
                <Box
                  className="preview-scroll-wrapper"
                  sx={{
                    overflowX: "auto",
                    width: "100%",
                    borderRadius: 2,
                    pb: 1,
                    "&::-webkit-scrollbar": {
                      height: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "rgba(59, 110, 248, 0.4)",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "rgba(59, 110, 248, 0.6)",
                      }
                    }
                  }}
                >
                  <Paper
                    ref={previewRef}
                    id="print-area"
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                      p: 4,
                      borderRadius: 2,
                      boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.5,
                      width: "100%",
                      minWidth: { xs: "800px", md: "100%" },
                    }}
                  >
                  {/* Invoice Header */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Box>
                      {invoice.logo ? (
                        <Box component="img" src={invoice.logo} sx={{ maxHeight: "60px", maxWidth: "200px", objectFit: "contain", mb: 1 }} />
                      ) : (
                        <Typography variant="h4" sx={{ fontWeight: 800, color: "#111" }}>
                          {invoice.supplierName || "YOUR COMPANY"}
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line", color: "#555" }}>
                        {invoice.supplierAddress || "Company address goes here..."}
                      </Typography>
                      {invoice.supplierPhone && <Typography variant="body2" sx={{ color: "#555" }}>Phone: {invoice.supplierPhone}</Typography>}
                      {invoice.supplierEmail && <Typography variant="body2" sx={{ color: "#555" }}>Email: {invoice.supplierEmail}</Typography>}
                      {invoice.gstEnabled && invoice.supplierGSTIN && (
                        <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5, color: "#000" }}>
                          GSTIN: {invoice.supplierGSTIN}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: "#3B6EF8", letterSpacing: "-0.5px" }}>
                        {invoice.gstEnabled ? "TAX INVOICE" : "INVOICE"}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#333", mt: 1 }}>
                        Invoice #: {invoice.invoiceNumber}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Date: {invoice.invoiceDate}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Due Date: {invoice.dueDate}
                      </Typography>
                      {invoice.gstEnabled && (
                        <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                          Place of Supply: {invoice.clientState}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, bgcolor: "#ddd" }} />

                  {/* Bill To / Ship To Grid */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#777", textTransform: "uppercase", fontSize: "0.75rem", tracking: "1px" }}>
                        Billed To:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {invoice.clientName || "Client Name"}
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line", color: "#555" }}>
                        {invoice.clientAddress || "Client address..."}
                      </Typography>
                      {invoice.clientPhone && <Typography variant="body2" sx={{ color: "#555" }}>Phone: {invoice.clientPhone}</Typography>}
                      {invoice.clientEmail && <Typography variant="body2" sx={{ color: "#555" }}>Email: {invoice.clientEmail}</Typography>}
                      {invoice.gstEnabled && invoice.clientGSTIN && (
                        <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                          GSTIN: {invoice.clientGSTIN}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: { sm: "right" } }}>
                      {/* Empty right grid for spacing alignment */}
                    </Grid>
                  </Grid>

                  {/* Items Table */}
                  <Table sx={{ border: "1px solid #eee", mb: 3 }}>
                    <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, py: 1, color: "#555" }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 700, py: 1, color: "#555" }}>Description</TableCell>
                        {invoice.hsnEnabled && (
                          <TableCell sx={{ fontWeight: 700, py: 1, color: "#555" }}>HSN/SAC</TableCell>
                        )}
                        <TableCell align="right" sx={{ fontWeight: 700, py: 1, color: "#555" }}>Qty</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, py: 1, color: "#555" }}>Rate (₹)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, py: 1, color: "#555" }}>Disc %</TableCell>
                        {invoice.gstEnabled && (
                          <TableCell align="right" sx={{ fontWeight: 700, py: 1, color: "#555" }}>GST %</TableCell>
                        )}
                        <TableCell align="right" sx={{ fontWeight: 700, py: 1, color: "#555" }}>Amount (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice.items.map((item, idx) => {
                        const amount = item.qty * item.rate;
                        const discAmt = amount * (item.discount / 100);
                        const finalAmt = amount - discAmt;
                        return (
                          <TableRow key={item.id} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                            <TableCell sx={{ py: 1, color: "#555"  }}>{idx + 1}</TableCell>
                            <TableCell sx={{ py: 1, fontWeight: 600, color: "#555"  }}>{item.description || "Line Item Details"}</TableCell>
                            {invoice.hsnEnabled && (
                              <TableCell sx={{ py: 1, color: "#555" }}>{item.hsn || "-"}</TableCell>
                            )}
                            <TableCell align="right" sx={{ py: 1, color: "#555" }}>{item.qty}</TableCell>
                            <TableCell align="right" sx={{ py: 1, color: "#555" }}>{item.rate.toFixed(2)}</TableCell>
                            <TableCell align="right" sx={{ py: 1, color: "#555" }}>{item.discount > 0 ? `${item.discount}%` : "0%"}</TableCell>
                            {invoice.gstEnabled && (
                              <TableCell align="right" sx={{ py: 1, color: "#555" }}>{item.gstRate}%</TableCell>
                            )}
                            <TableCell align="right" sx={{ py: 1, fontWeight: 700, color: "#555"  }}>{finalAmt.toFixed(2)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  {/* Calculations & Totals Panel */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      {/* Bank Details */}
                      {(invoice.bankName || invoice.bankAccount || invoice.upiId) && (
                        <Box sx={{ p: 1.5, border: "1px dashed #ccc", borderRadius: 1, bgcolor: "#fafafa" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, textTransform: "uppercase", fontSize: "0.75rem" }}>
                            Payment Details:
                          </Typography>
                          {invoice.bankName && <Typography variant="body2">Bank: {invoice.bankName}</Typography>}
                          {invoice.bankAccount && <Typography variant="body2">A/C Number: {invoice.bankAccount}</Typography>}
                          {invoice.bankIfsc && <Typography variant="body2">IFSC Code: {invoice.bankIfsc}</Typography>}
                          {invoice.bankBranch && <Typography variant="body2">Branch: {invoice.bankBranch}</Typography>}
                          {invoice.upiId && <Typography variant="body2" sx={{ fontWeight: 600, color: "#111" }}>UPI ID: {invoice.upiId}</Typography>}
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2" sx={{ color: "#666" }}>Subtotal:</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{totals.subtotal.toFixed(2)}</Typography>
                        </Box>
                        {totals.totalDiscount > 0 && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ color: "#666" }}>Discount:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "error.main" }}>-₹{totals.totalDiscount.toFixed(2)}</Typography>
                          </Box>
                        )}
                        {totals.cgstTotal > 0 && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ color: "#666" }}>CGST:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{totals.cgstTotal.toFixed(2)}</Typography>
                          </Box>
                        )}
                        {totals.sgstTotal > 0 && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ color: "#666" }}>SGST:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{totals.sgstTotal.toFixed(2)}</Typography>
                          </Box>
                        )}
                        {totals.igstTotal > 0 && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ color: "#666" }}>IGST:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{totals.igstTotal.toFixed(2)}</Typography>
                          </Box>
                        )}
                        <Divider sx={{ bgcolor: "#eee" }} />
                        <Box sx={{ display: "flex",gap:"0.5rem", mt: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Grand Total:</Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#3B6EF8", }}>₹{totals.grandTotal.toFixed(2)}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Total In Words */}
                  <Box sx={{ mb: 4, p: 1, bgcolor: "#f9f9f9", borderLeft: "4px solid #3B6EF8", borderRadius: "0 4px 4px 0" }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Amount Chargeable (in words):
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", fontStyle: "italic" }}>
                      {convertNumberToWords(totals.grandTotal)}
                    </Typography>
                  </Box>

                  {/* Terms / Signatures */}
                  <Grid container spacing={2} display={"flex"} justifyContent={"space-between"}>
                    <Grid item xs={12} sm={8}>
                      {invoice.notes && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#555" }}>Notes:</Typography>
                          <Typography variant="body2" sx={{ color: "#555", fontSize: "0.8rem", whiteSpace: "pre-line" }}>{invoice.notes}</Typography>
                        </Box>
                      )}
                      {invoice.terms && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#555" }}>Terms & Conditions:</Typography>
                          <Typography variant="body2" sx={{ color: "#555", fontSize: "0.8rem", whiteSpace: "pre-line" }}>{invoice.terms}</Typography>
                        </Box>
                      )}
                    </Grid>
                    {/* <Grid item xs={12} sm={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                      <Box sx={{ minHeight: "60px" }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>For {invoice.supplierName || "Authorized Signatory"}</Typography>
                      <Divider sx={{ width: "150px", my: 1, bgcolor: "#333" }} />
                      <Typography variant="caption" sx={{ color: "#666" }}>Authorized Signatory</Typography>
                    </Grid> */}
                  </Grid>

                  {/* Branding Footer */}
                  <Box sx={{ mt: 5, pt: 2, borderTop: "1px solid #eee", textAlign: "center" }}>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      Generated using the Free Custom Invoice Generator by <a href="https://three-dots.in" target="_blank" rel="noopener noreferrer" style={{ color: "#3B6EF8", textDecoration: "none", fontWeight: 700 }}>ThreeDots</a>
                    </Typography>
                  </Box>
                </Paper>
              </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Lead Generation Modal / Dialog */}
      <Dialog open={leadModalOpen} onClose={() => setLeadModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, fontFamily: "DM Sans" }}>
          Where should we send your Invoice PDF?
        </DialogTitle>
        <form onSubmit={handleLeadSubmit}>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
              Join 10,000+ business owners. Get your high-resolution PDF instantly, plus we'll send you 10+ premium, fully customizable Word/Excel/Figma invoice templates!
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth type="email" required label="Email Address" value={leadData.email} onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))} placeholder="you@company.com" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="tel" label="Phone/WhatsApp (Optional)" value={leadData.phone} onChange={(e) => setLeadData(prev => ({ ...prev, phone: e.target.value }))} placeholder="e.g. +91 98765 43210" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mt: 1, mb: 1, fontWeight: 700 }}>
                  Need help scaling your business? Select any free resources/quotes:
                </Typography>
                <FormControlLabel control={<Checkbox checked={leadData.interestedInDev} onChange={(e) => setLeadData(prev => ({ ...prev, interestedInDev: e.target.checked }))} />} label="Free consult for custom web app development" />
                <FormControlLabel control={<Checkbox checked={leadData.interestedInERP} onChange={(e) => setLeadData(prev => ({ ...prev, interestedInERP: e.target.checked }))} />} label="ERP/Warehouse Management Software (WMS) quote" />
                <FormControlLabel control={<Checkbox checked={leadData.interestedInMobile} onChange={(e) => setLeadData(prev => ({ ...prev, interestedInMobile: e.target.checked }))} />} label="Mobile App development quote" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={triggerPdfDownload} sx={{ color: "#888" }}>
              Skip & Download
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#3B6EF8", "&:hover": { bgcolor: "#2a5ce8" } }}>
              Get PDF + Premium Templates
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
        <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
