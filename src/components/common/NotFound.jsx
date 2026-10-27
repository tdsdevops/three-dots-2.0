import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <Box
      sx={{
        bgcolor: "#020718",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 8, md: 12 },
        color: "#fff",
        textAlign: "center"
      }}
    >
      <Helmet>
        <title>Page Not Found (404) | Three Dots</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.three-dots.in/404" />
      </Helmet>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5rem", md: "8rem" },
            fontWeight: 900,
            fontFamily: "DM Sans",
            background: "linear-gradient(135deg, #3B6EF8 0%, #8B5CF6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            mb: 2
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            fontWeight: 700,
            fontFamily: "DM Sans",
            color: "#fff",
            mb: 2
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontSize: { xs: 15, md: 17 },
            maxWidth: 550,
            mx: "auto",
            mb: 4,
            lineHeight: 1.7,
            fontFamily: "Plus Jakarta Sans"
          }}
        >
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Browse our services or return to the homepage.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: "#3B6EF8",
              px: 3.5,
              py: 1.25,
              fontWeight: 700,
              "&:hover": { bgcolor: "#2a5ce8" }
            }}
          >
            Return Home
          </Button>
          <Button
            component={RouterLink}
            to="/services/custom-software-development"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: "rgba(59,110,248,0.4)",
              color: "#a2b9f8",
              px: 3,
              py: 1.25,
              fontWeight: 600,
              "&:hover": { borderColor: "#3B6EF8", bgcolor: "rgba(59,110,248,0.08)" }
            }}
          >
            Explore Services
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
