import { useContext } from "react";
import { Box, Typography, Container, Grid, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import CtaBanner from "../../shared/components/CtaBanner";

import { Link } from "react-router";
import blogs from "../../data/blogs.json";

const MotionBox = motion(Box);

export default function Blog() {
  const { bgVdo } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
        }}
      >
        {/* Background video */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            overflow: "hidden",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Box
            component="video"
            autoPlay
            loop
            muted
            playsInline
            src={bgVdo}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
        </Box>

        {/* Blue glow overlays */}
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "-10%",
            width: { xs: "300px", md: "500px" },
            height: { xs: "300px", md: "500px" },
            background: "radial-gradient(circle, rgba(20,40,180,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            <Chip
              label="Insights & Articles"
              sx={{
                bgcolor: "#2563EB",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 1,
                height: 30,
                borderRadius: "20px",
              }}
            />
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            sx={{ textAlign: "center", mb: 8 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2.4rem", sm: "3.5rem", md: "5rem" },
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              Read Our Latest
              <br />
              News & Updates.
            </Typography>
          </MotionBox>

          {/* Grid */}
          <Grid container sx={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"40px"
          }}  spacing={{ xs: 3, md: 4 }}>
            {blogs.map((post, i) => (
              <Grid h item xs={12} md={4} key={post.id}>
                <Box component={Link} to={`/blog/${post.id}`} sx={{ textDecoration: "none" }}>
                  <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    bgcolor: "#111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    "&:hover img": { transform: "scale(1.05)" },
                    "&:hover": {
                      boxShadow: "0 0 30px rgba(37, 99, 235, 0.3)",
                      transform: "translateY(-5px)",
                    },
                    transition: "all 0.4s ease-in-out",
                  }}
                >
                  <Box sx={{ overflow: "hidden", height: 220, position: "relative" }}>
                    <Box
                      component="img"
                      src={post.image}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    <Chip 
                      label={post.category} 
                      sx={{ 
                        position: "absolute", 
                        top: 16, 
                        left: 16, 
                        bgcolor: "rgba(0,0,0,0.6)", 
                        color: "#fff",
                        backdropFilter: "blur(4px)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }} 
                    />
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", mb: 1 }}>
                      {post.date}
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
                      {post.title}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {post.excerpt}
                    </Typography>
                  </Box>
                </MotionBox>
                </Box>
              </Grid>
            ))}
          </Grid>

        </Container>
      </Box>
      <CtaBanner />
    </Box>
  );
}
