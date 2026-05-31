import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Box, Container, Typography, Chip, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import blogs from "../../data/blogs.json";
import SEO from "../SEO";

const MotionBox = motion(Box);

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogs.find((b) => b.id === id);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#000", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4">Article not found</Typography>
        <Button onClick={() => navigate('/blog')} sx={{ mt: 2, color: "#3B6EF8" }}>Back to Blog</Button>
      </Box>
    );
  }

  return (
    <Box component="article" sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "DM Sans", pt: { xs: 10, md: 14 }, pb: 10 }}>
      <SEO
        pageKey="blogDetails"
        customTitle={`${post.title} | ThreeDots`}
        customDescription={post.excerpt}
        customCanonical={`https://three-dots.in/blog/${post.id}`}
        customOgImage={post.image.startsWith("http") ? post.image : `https://three-dots.in${post.image}`}
        schemaType="Article"
        blogPost={post}
      />
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
            sx={{ width: "100%", height: "100%", objectFit: "scale-down" }}
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
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Link formatter helper
            const renderTextWithLinks = (text) => {
              const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
              const parts = [];
              let lastIndex = 0;
              let match;

              while ((match = linkRegex.exec(text)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(text.substring(lastIndex, match.index));
                }
                const url = match[2];
                const isExternal = url.startsWith("http");
                parts.push(
                  isExternal ? (
                    <a
                      key={match.index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3B6EF8", textDecoration: "underline" }}
                    >
                      {match[1]}
                    </a>
                  ) : (
                    <Link
                      key={match.index}
                      to={url}
                      style={{ color: "#3B6EF8", textDecoration: "underline" }}
                    >
                      {match[1]}
                    </Link>
                  )
                );
                lastIndex = linkRegex.lastIndex;
              }

              if (lastIndex < text.length) {
                parts.push(text.substring(lastIndex));
              }

              return parts.length > 0 ? parts : text;
            };

            if (trimmed.startsWith('### ')) {
              return (
                <Typography
                  key={index}
                  variant="h5"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: { xs: '1.4rem', md: '1.8rem' },
                    mt: 5,
                    mb: 2.5,
                    fontFamily: 'DM Sans',
                  }}
                >
                  {renderTextWithLinks(trimmed.replace('### ', ''))}
                </Typography>
              );
            }

            if (trimmed.startsWith('## ')) {
              return (
                <Typography
                  key={index}
                  variant="h4"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: { xs: '1.8rem', md: '2.4rem' },
                    mt: 6,
                    mb: 3,
                    fontFamily: 'DM Sans',
                  }}
                >
                  {renderTextWithLinks(trimmed.replace('## ', ''))}
                </Typography>
              );
            }

            // Check if paragraph contains list items (lines starting with • or -)
            const lines = trimmed.split('\n');
            const hasListItems = lines.some(l => l.trim().startsWith('•') || l.trim().startsWith('-'));

            if (hasListItems) {
              const elements = [];
              let currentList = [];

              const flushList = (key) => {
                if (currentList.length > 0) {
                  elements.push(
                    <Box
                      component="ul"
                      key={`list-${key}`}
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        pl: 3,
                        mb: 4,
                        listStyleType: "none",
                      }}
                    >
                      {currentList.map((item, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            fontSize: "1.05rem",
                            lineHeight: 1.8,
                            mb: 1.5,
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: "-1.5rem",
                              top: "0.6rem",
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              bgcolor: "#3B6EF8",
                            }
                          }}
                        >
                          {renderTextWithLinks(item)}
                        </Box>
                      ))}
                    </Box>
                  );
                  currentList = [];
                }
              };

              lines.forEach((line, idx) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return;

                if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
                  const itemText = trimmedLine.replace(/^[•\-\s]+/, '');
                  if (itemText.trim()) {
                    currentList.push(itemText);
                  }
                } else {
                  flushList(`${index}-${idx}`);
                  elements.push(
                    <Typography
                      key={`text-${index}-${idx}`}
                      sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "1.05rem",
                        lineHeight: 1.8,
                        mb: 2,
                        fontFamily: "DM Sans"
                      }}
                    >
                      {renderTextWithLinks(trimmedLine)}
                    </Typography>
                  );
                }
              });

              flushList(`${index}-end`);
              return <Box key={index}>{elements}</Box>;
            }

            return (
              <Typography
                key={index}
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  mb: 3,
                  fontFamily: "DM Sans"
                }}
              >
                {renderTextWithLinks(paragraph)}
              </Typography>
            );
          })}
        </MotionBox>

      </Container>
    </Box>
  );
}
