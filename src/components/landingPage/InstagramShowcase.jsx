import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

const REELS_DATA = [
  {
    id: 1,
    embedUrl: "https://www.instagram.com/reel/DNhe_qyvGif",
  },
  {
    id: 2,
    embedUrl: "https://www.instagram.com/p/DUAtTb-k-Pk/", // Just another example if needed, or we can just use the single one
  }, {
    id: 2,
    embedUrl: "https://www.instagram.com/p/DTUi6lmE2B_/", // Just another example if needed, or we can just use the single one
  }, {
    id: 3,
    embedUrl: "https://www.instagram.com/p/DVF6RL4k1SK/", // Just another example if needed, or we can just use the single one
  }
];

export default function InstagramShowcase() {
  return (
    <Box
      sx={{
        bgcolor: "#020718",
        py: { xs: 8, md: 12 },
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Title */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <InstagramIcon sx={{ color: "#3B6EF8", fontSize: "1.8rem" }} />
            <Typography
              variant="overline"
              sx={{
                color: "#3B6EF8",
                fontWeight: 700,
                letterSpacing: 2,
                fontSize: { xs: "0.75rem", md: "0.85rem" },
              }}
            >
              INSTAGRAM SHOWCASE
            </Typography>
          </Stack>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
              color: "#fff",
              lineHeight: 1.2,
              mb: 2.5,
            }}
          >
            Explore Life at ThreeDots
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontFamily: "DM Sans",
              fontSize: { xs: "0.9rem", md: "1rem" },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Stay updated with our latest technology trends, design frameworks, and backend logic showcases.
          </Typography>
        </Box>

        {/* Reels Grid */}
        <Grid container spacing={4} justifyContent="center">
          {REELS_DATA.map((reel) => {
            // Safely convert raw Instagram URLs to dark embed URLs with autoplay attempt
            let base = reel.embedUrl.split("?")[0].replace(/\/$/, "");
            if (base.endsWith("/dark")) base = base.slice(0, -5).replace(/\/$/, "");
            if (base.endsWith("/embed")) base = base.slice(0, -6).replace(/\/$/, "");
            
            // Enforce dark mode and append autoplay parameters correctly via query strings
            const safeEmbedUrl = `${base}/embed/?theme=dark&autoplay=1&muted=1`;

            return (
              <Grid item xs={12} sm={6} md={4} key={reel.id}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    bgcolor: "#000",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    width: "100%",
                    aspectRatio: "9/16", // Maintain Instagram ratio
                    maxWidth: "400px",
                    mx: "auto"
                  }}
                >
                  <iframe
                    src={safeEmbedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowtransparency="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    style={{ display: "block" }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
