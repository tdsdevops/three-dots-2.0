import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import QRCode from "react-qr-code";
import SEO from "../../components/SEO";
import { Link } from "react-router";
// A glass‑morphism card that matches the site dark theme
const cardStyle = {
  background: "rgba(2, 7, 24, 0.6)", // dark translucent background
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
  padding: "2rem",
  maxWidth: "420px",
  margin: "0 auto",
  color: "#fff",
};

export default function QrGenerator() {
  const [input, setInput] = useState("https://three-dots.dev"); // default static URL
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState("");
  const [downloadSeverity, setDownloadSeverity] = useState("success");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    // Basic validation: non-empty and valid URL format
    if (!val) {
      setError("Input cannot be empty");
    } else {
      try {
        new URL(val);
        setError("");
      } catch {
        setError("Enter a valid URL");
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  // Download QR code as PNG
  const handleDownload = () => {
    try {
      const svg = document.getElementById("qr-svg");
      if (!svg) throw new Error("SVG not found");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "qr_code.png";
        link.click();
        URL.revokeObjectURL(url);
        setDownloadMsg("QR code downloaded");
        setDownloadSeverity("success");
        setDownloadOpen(true);
      };
      img.onerror = () => {
        throw new Error("Image loading failed");
      };
      img.src = url;
    } catch (err) {
      console.error(err);
      setDownloadMsg("Download failed: " + err.message);
      setDownloadSeverity("error");
      setDownloadOpen(true);
    }
  };

return (
  <>
    <SEO pageKey="qr-generator" />
    {/* Hero Section */}
    <Box sx={{ textAlign: "center", paddingTop: { xs: 6, md: 10 }, bgcolor: "#020718" }}>
      <Typography variant="h2" sx={{ color: "#fff", fontWeight: 800, mb: 2 }}>
        Free QR Code Generator
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#ddd", mb: 4 }}>
        Generate QR codes for any URL, text or Wi‑Fi instantly – no signup, 100 % free.
      </Typography>
    </Box>
    {/* Generator Section */}
    <Box id="generator" sx={{ minHeight: "80vh", display: "flex", justifyContent: "center" }}>
      <Box sx={cardStyle}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>
          QR Code Generator
        </Typography>
        <TextField
          fullWidth
          variant="filled"
          value={input}
          onChange={handleChange}
          label="Enter text or URL"
          error={!!error}
          helperText={error}
          sx={{
            mb: 2,
            input: { color: "#fff" },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button variant="contained" onClick={handleCopy} disabled={!!error} sx={{ mr: 1, background: "#3B6EF8", fontWeight: 600 }}>
            Copy Text
          </Button>
          <Button variant="outlined" onClick={() => setInput("")} sx={{ borderColor: "#3B6EF8", color: "#3B6EF8" }}>
            Clear
          </Button>
          <Button variant="contained" onClick={handleDownload} disabled={!!error} sx={{ ml: 1, background: "#28a745", fontWeight: 600 }}>
            Download PNG
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* QRCode component automatically adapts size */}
          <QRCode id="qr-svg" value={input} size={256} bgColor="#020718" fgColor="#ffffff" level="Q" style={{ borderRadius: "8px" }} />
        </Box>
      </Box>
    </Box>
    <Snackbar open={downloadOpen} autoHideDuration={3000} onClose={() => setDownloadOpen(false)}>
      <Alert onClose={() => setDownloadOpen(false)} severity={downloadSeverity} sx={{ width: '100%' }}>
        {downloadMsg}
      </Alert>
    </Snackbar>
  </>
);

}
