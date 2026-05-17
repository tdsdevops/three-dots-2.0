import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Box, Container, Typography, Chip, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import blogs from "../../data/blogs.json";

const MotionBox = motion(Box);

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogs.find((b) => b.id === id);

  useEffect(() => {
    // SEO Implementation
    if (post) {
      document.title = `${post.title} | ThreeDots`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = post.excerpt;

      // Open Graph Tags
      const setMetaProperty = (property, content) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute("property", property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      setMetaProperty("og:title", post.title);
      setMetaProperty("og:description", post.excerpt);
      setMetaProperty("og:image", post.image);
      setMetaProperty("og:type", "article");
    }
    
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#000", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4">Article not found</Typography>
        <Button onClick={() => navigate('/blog')} sx={{ mt: 2, color: "#3B6EF8" }}>Back to Blog</Button>
      </Box>
    );
  }

  return (
    <Box component="article" sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Syne', sans-serif", pt: { xs: 10, md: 14 }, pb: 10 }}>
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconButton onClick={() => navigate('/blog')} sx={{ color: "rgba(255,255,255,0.7)", mb: 4, border: "1px solid rgba(255,255,255,0.2)" }}>
            <ArrowBackIcon />
          </IconButton>
        </MotionBox>

        {/* Hero Image */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{ mb: 6, borderRadius: "20px", overflow: "hidden", position: "relative", height: { xs: 300, md: 450 } }}
        >
          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </MotionBox>

        {/* Header Info */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          sx={{ mb: 6 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Chip label={post.category} sx={{ bgcolor: "#2563EB", color: "#fff", fontWeight: 700 }} />
            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
              {post.date}
            </Typography>
          </Box>
          <Typography component="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", mb: 3 }}>
            {post.title}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", lineHeight: 1.6, borderLeft: "4px solid #3B6EF8", pl: 3 }}>
            {post.excerpt}
          </Typography>
        </MotionBox>

        {/* Content */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {post.content.split('\\n\\n').map((paragraph, index) => (
            <Typography key={index} sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8, mb: 3 }}>
              {paragraph}
            </Typography>
          ))}
        </MotionBox>

      </Container>
    </Box>
  );
}
