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

            // Formatted text helper (handles links, bold, and italic)
            const renderFormattedText = (text) => {
              const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
              const parts = [];
              let lastIndex = 0;
              let match;

              const formatInlineText = (str, keyPrefix = "") => {
                // Split by bold (**bold**) and italic (*italic*)
                const tokens = [];
                const boldRegex = /\*\*([^*]+)\*\*/g;
                let bLast = 0;
                let bMatch;

                while ((bMatch = boldRegex.exec(str)) !== null) {
                  if (bMatch.index > bLast) {
                    tokens.push(str.substring(bLast, bMatch.index));
                  }
                  tokens.push(
                    <strong key={`${keyPrefix}-b-${bMatch.index}`} style={{ color: "#fff", fontWeight: 700 }}>
                      {bMatch[1]}
                    </strong>
                  );
                  bLast = boldRegex.lastIndex;
                }
                if (bLast < str.length) {
                  tokens.push(str.substring(bLast));
                }

                // Now handle italic on string parts
                return tokens.map((tok, i) => {
                  if (typeof tok !== "string") return tok;
                  const iParts = [];
                  const italicRegex = /(?:^|[^*])\*([^*]+)\*/g;
                  let iLast = 0;
                  let iMatch;

                  while ((iMatch = italicRegex.exec(tok)) !== null) {
                    const matchStart = iMatch.index + (iMatch[0].startsWith('*') ? 0 : 1);
                    if (matchStart > iLast) {
                      iParts.push(tok.substring(iLast, matchStart));
                    }
                    iParts.push(
                      <em key={`${keyPrefix}-i-${i}-${matchStart}`} style={{ color: "rgba(255,255,255,0.9)" }}>
                        {iMatch[1]}
                      </em>
                    );
                    iLast = italicRegex.lastIndex;
                  }
                  if (iLast < tok.length) {
                    iParts.push(tok.substring(iLast));
                  }
                  return iParts.length > 0 ? iParts : tok;
                });
              };

              while ((match = linkRegex.exec(text)) !== null) {
                if (match.index > lastIndex) {
                  parts.push(formatInlineText(text.substring(lastIndex, match.index), `txt-${lastIndex}`));
                }
                const url = match[2];
                const isExternal = url.startsWith("http");
                parts.push(
                  isExternal ? (
                    <a
                      key={`link-${match.index}`}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3B6EF8", textDecoration: "underline", fontWeight: 600 }}
                    >
                      {match[1]}
                    </a>
                  ) : (
                    <Link
                      key={`link-${match.index}`}
                      to={url}
                      style={{ color: "#3B6EF8", textDecoration: "underline", fontWeight: 600 }}
                    >
                      {match[1]}
                    </Link>
                  )
                );
                lastIndex = linkRegex.lastIndex;
              }

              if (lastIndex < text.length) {
                parts.push(formatInlineText(text.substring(lastIndex), `txt-end`));
              }

              return parts.length > 0 ? parts : text;
            };

            const renderTextWithLinks = renderFormattedText;

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

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <Box
              sx={{
                mt: 6,
                pt: 4,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontWeight: 600, mr: 1 }}>
                Tags:
              </Typography>
              {post.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.85)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontSize: "0.8rem",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Bottom Conversion CTA */}
          <Box
            sx={{
              mt: 8,
              p: { xs: 4, md: 5 },
              borderRadius: "20px",
              bgcolor: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.3)",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 250,
                height: 250,
                background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                fontWeight: 800,
                color: "#fff",
                mb: 1.5,
                lineHeight: 1.25,
              }}
            >
              Building an Export Business? Your Website Should Be Ready for the World.
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                mb: 3.5,
                maxWidth: 650,
              }}
            >
              At Three Dots, we design and develop websites for businesses that want to present themselves clearly, build trust and reach the right customers. Have a business that needs a better digital presence?
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/contact"
              sx={{
                bgcolor: "#2563EB",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                px: 3.5,
                py: 1.4,
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 20px rgba(37, 99, 235, 0.4)",
                "&:hover": {
                  bgcolor: "#1d4ed8",
                },
              }}
            >
              Let's talk →
            </Button>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
