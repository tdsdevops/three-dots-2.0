import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import footerBg from "../../assets/footerBg.avif";
import Logo from "../../shared/components/Logo";
import generalInfo from "../../data/generalInfo.json";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2563eb" },
    background: { default: "#070d1a", paper: "#0d1628" },
    text: { primary: "#e2e8f0", secondary: "#94a3b8" },
  },
  typography: {
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
  },
});

// Infinity logo SVG
const InfinityLogo = () => (
  <svg width="68" height="36" viewBox="0 0 68 36" fill="none">
    <path
      d="M34 18C34 18 26 4 16 4C8.268 4 2 9.82 2 18C2 26.18 8.268 32 16 32C26 32 34 18 34 18Z"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M34 18C34 18 42 4 52 4C59.732 4 66 9.82 66 18C66 26.18 59.732 32 52 32C42 32 34 18 34 18Z"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkHover = {
  color: "#e2e8f0",
  x: 4,
  transition: { duration: 0.2 },
};

const templatePages = generalInfo.templatePages;
const socialLinks = generalInfo.socialLinks;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [videoHovered, setVideoHovered] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        //   background:
        //     "radial-gradient(ellipse 80% 60% at 70% 50%, #0e1f4a 0%, #070d1a 60%)",
        //   minHeight: "100vh",
        backgroundImage: `url(${footerBg})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          pt: { xs: 6, sm: 7, md: 8 },
          pb: { xs: 4, sm: 5 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6, lg: 8 } }}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Main Grid */}
            <Grid
              container
              spacing={{ xs: 5, sm: 4, md: 3, lg: 4 }}
              alignItems="flex-start"
              justifyContent={"space-between"}
            >
              {/* Column 1 – Brand */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <MotionBox variants={itemVariants}>
                  {/* Logo */}
                  <Box sx={{ mb: 2 }}>
                    <Logo width="100px" />
                  </Box>

                  <Divider
                    sx={{
                      borderColor: "rgba(255,255,255,0.12)",
                      mb: 2.5,
                      width: "60%",
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.7,
                      fontSize: { xs: "0.85rem", md: "0.88rem" },
                      mb: 3,
                    }}
                  >
                    Made remotely with{" "}
                    <FavoriteIcon
                      sx={{
                        fontSize: "0.85rem",
                        color: "#3b82f6",
                        verticalAlign: "middle",
                        mx: 0.3,
                      }}
                    />{" "}
                    <br />– {generalInfo.studioName}
                  </Typography>

                  {/* Email Subscribe */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0,
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      overflow: "hidden",
                      maxWidth: { xs: "100%", sm: 360 },
                    }}
                  >
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      placeholder="Enter Your Email..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "transparent",
                          border: "none",
                          borderRadius: 0,
                          fontSize: "0.82rem",
                          color: "text.secondary",
                          "& fieldset": { border: "none" },
                          px: 1,
                        },
                        "& input::placeholder": {
                          color: "rgba(148,163,184,0.6)",
                          opacity: 1,
                        },
                      }}
                    />
                    <AnimatePresence mode="wait">
                      <MotionButton
                        key={subscribed ? "done" : "sub"}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleSubscribe}
                        variant="contained"
                        size="small"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        sx={{
                          background: subscribed
                            ? "#16a34a"
                            : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                          borderRadius: "8px",
                          m: "4px",
                          px: { xs: 1.5, sm: 2 },
                          py: 0.8,
                          fontSize: { xs: "0.72rem", sm: "0.78rem" },
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          textTransform: "none",
                          boxShadow: "0 0 18px rgba(37,99,235,0.4)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #1d4ed8, #1e40af)",
                            boxShadow: "0 0 26px rgba(37,99,235,0.6)",
                          },
                        }}
                      >
                        {subscribed ? "Subscribed!" : "Subscribe Us"}
                      </MotionButton>
                    </AnimatePresence>
                  </Box>
                </MotionBox>
              </Grid>

              {/* Spacer on large screens */}
              <Grid
                item
                xs={0}
                md={1}
                lg={2}
                sx={{ display: { xs: "none", md: "block" } }}
              />

              {/* Column 2 – Template Pages */}
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <MotionBox variants={itemVariants}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      mb: 2.5,
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      letterSpacing: "0.01em",
                    }}
                  >
                    Template Pages
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.4,
                    }}
                  >
                    {templatePages.map((page) => (
                      <MotionTypography
                        key={page}
                        component="a"
                        href="#"
                        whileHover={linkHover}
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.82rem", md: "0.87rem" },
                          textDecoration: "none",
                          display: "inline-block",
                          cursor: "pointer",
                          "&:hover": { color: "text.primary" },
                          transition: "color 0.2s",
                        }}
                      >
                        {page}
                      </MotionTypography>
                    ))}
                  </Box>
                </MotionBox>
              </Grid>

              {/* Column 3 – Social */}
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <MotionBox variants={itemVariants}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      mb: 2.5,
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      letterSpacing: "0.01em",
                    }}
                  >
                    Social
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.4,
                    }}
                  >
                    {socialLinks.map((social) => (
                      <MotionTypography
                        key={social}
                        component="a"
                        href="#"
                        whileHover={linkHover}
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.82rem", md: "0.87rem" },
                          textDecoration: "none",
                          display: "inline-block",
                          cursor: "pointer",
                          "&:hover": { color: "text.primary" },
                          transition: "color 0.2s",
                        }}
                      >
                        {social}
                      </MotionTypography>
                    ))}
                  </Box>
                </MotionBox>
              </Grid>

              {/* Column 4 – Sales + Video */}
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <MotionBox variants={itemVariants}>
                  {/* Sales badge */}
                  <MotionBox
                    whileHover={{ scale: 1.04 }}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      borderRadius: "8px",
                      px: 2,
                      py: 0.7,
                      mb: 2,
                      backdropFilter: "blur(8px)",
                      cursor: "default",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontWeight: 600,
                        fontSize: { xs: "0.82rem", sm: "0.87rem" },
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Sales –{" "}
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        style={{ color: "#e2e8f0" }}
                      >
                        7,360,109
                      </motion.span>
                    </Typography>
                  </MotionBox>

                  {/* Video Thumbnail */}
                  <MotionBox
                    onHoverStart={() => setVideoHovered(true)}
                    onHoverEnd={() => setVideoHovered(false)}
                    whileHover={{ scale: 1.025, y: -3 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      position: "relative",
                      borderRadius: "14px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      maxWidth: { xs: "100%", sm: 340, md: "100%" },
                      aspectRatio: "16/9",
                      background:
                        "radial-gradient(ellipse 70% 80% at 30% 60%, #0a1540 0%, #050810 100%)",
                      boxShadow: videoHovered
                        ? "0 20px 60px rgba(37,99,235,0.25), 0 0 0 1px rgba(37,99,235,0.2)"
                        : "0 8px 32px rgba(0,0,0,0.5)",
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    {/* Glowing star shape */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="160"
                        height="120"
                        viewBox="0 0 160 120"
                        fill="none"
                        style={{ position: "absolute" }}
                      >
                        <ellipse
                          cx="60"
                          cy="80"
                          rx="60"
                          ry="20"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          opacity="0.7"
                        />
                        <ellipse
                          cx="100"
                          cy="50"
                          rx="50"
                          ry="16"
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          opacity="0.5"
                          transform="rotate(-30 100 50)"
                        />
                        <path
                          d="M80 20 L95 55 L130 55 L102 76 L112 110 L80 88 L48 110 L58 76 L30 55 L65 55 Z"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          opacity="0.9"
                        />
                      </svg>
                    </Box>

                    {/* Play button */}
                    <AnimatePresence>
                      <motion.div
                        animate={{
                          scale: videoHovered ? 1.15 : 1,
                          opacity: videoHovered ? 1 : 0.85,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 40, sm: 48 },
                            height: { xs: 40, sm: 48 },
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PlayArrowRoundedIcon
                            sx={{
                              color: "white",
                              fontSize: { xs: 22, sm: 28 },
                            }}
                          />
                        </Box>
                      </motion.div>
                    </AnimatePresence>
                  </MotionBox>
                </MotionBox>
              </Grid>
            </Grid>

            {/* Bottom Bar */}
            <MotionBox
              variants={itemVariants}
              sx={{
                mt: { xs: 5, sm: 6 },
                pt: 2.5,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.78rem", sm: "0.82rem" },
                }}
              >
                © {new Date().getFullYear()} {generalInfo.companyName}
              </Typography>

              <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 } }}>
                {generalInfo.footerLinks.map((item) => (
                  <MotionTypography
                    key={item}
                    component="a"
                    href="#"
                    whileHover={{ color: "#e2e8f0" }}
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.78rem", sm: "0.82rem" },
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                  >
                    {item}
                  </MotionTypography>
                ))}
              </Box>
            </MotionBox>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
