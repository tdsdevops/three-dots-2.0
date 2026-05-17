import { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { ThemeContext } from "../../appConstant";
import FaqSection from "../../shared/components/FaqSection";
import CtaBanner from "../../shared/components/CtaBanner";
import { sendEmail } from "../../utils/sendEmail";
import { getContactEmailTemplate } from "../../utils/emailTemplates";
import generalInfo from "../../data/generalInfo.json";

/* ─── Theme ─────────────────────────────────────────────────── */

const MotionBox = motion(Box);

/* ─── Info Card ──────────────────────────────────────────────── */
function InfoCard({
  icon,
  label,
  badge,
  badgeColor = "#2563EB",
  children,
  delay = 0,
}) {
  return (
    <MotionBox
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      sx={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        p: { xs: 2.5, md: 3 },
        bgcolor: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Box sx={{ color: "rgba(255,255,255,0.6)", display: "flex" }}>
          {icon}
        </Box>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          {label}
        </Typography>
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{
              bgcolor: badgeColor,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.65rem",
              height: 20,
              borderRadius: "8px",
              ml: 0.5,
            }}
          />
        )}
      </Box>
      {children}
    </MotionBox>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function ContactUs() {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const { bgVdo } = useContext(ThemeContext);
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const payload = {
        to: import.meta.env.VITE_CONTACT_EMAIL,
        from: import.meta.env.VITE_FROM_EMAIL,
        subject: `New Contact Inquiry from ${form.firstName} ${form.lastName}`,
        html: getContactEmailTemplate({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          country,
          category,
          message: form.message,
        })
      };

      const functionName = import.meta.env.VITE_EDGE_FUNCTION_NAME || "email-services";
      const res = await sendEmail(functionName, payload);
      console.log("Email sent successfully", res);
      alert("Message sent successfully!");
      
      // Reset form
      setForm({ firstName: "", lastName: "", email: "", message: "" });
      setCountry("");
      setCategory("");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  /* shared input sx */
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      bgcolor: "rgba(255,255,255,0.04)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&.Mui-focused fieldset": { borderColor: "#2563EB" },
    },
    "& input, & textarea": { color: "#fff" },
    "& label": { color: "rgba(255,255,255,0.4)" },
    "& label.Mui-focused": { color: "#2563EB" },
  };

  const selectSx = {
    borderRadius: "10px",
    bgcolor: "rgba(255,255,255,0.04)",
    color: "#fff",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#2563EB" },
    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
  };

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* ═══════════════ CONTACT SECTION ═══════════════════════ */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        {/* ── Background video — top 50% only ── */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
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
          {/* bottom fade */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "65%",
            }}
          />
          {/* top fade */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "30%",
            }}
          />
        </Box>

        {/* ── Blue glow blobs ── */}
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "-8%",
            width: { xs: "280px", md: "480px" },
            height: { xs: "280px", md: "480px" },
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "18%",
            right: "-4%",
            width: { xs: "180px", md: "320px" },
            height: { xs: "180px", md: "320px" },
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                label="24/7"
                sx={{
                  bgcolor: "#2563EB",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  height: 26,
                  borderRadius: "8px",
                  px: 0.5,
                }}
              />
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                Let's Work Together
              </Typography>
            </Box>
          </MotionBox>

          {/* Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            sx={{ textAlign: "center", mb: 3 }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "2.2rem",
                  sm: "3.2rem",
                  md: "4.5rem",
                  xl: "5.5rem",
                },
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
              }}
            >
              Any Questions Rising?
              <br />
              We are All Here.
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            sx={{ textAlign: "center", mb: 5 }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.4)",
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                maxWidth: 420,
                mx: "auto",
                lineHeight: 1.75,
              }}
            >
              Whether you have a question, need assistance,
              <br />
              or want to start a new project, our team is here to help.
            </Typography>
          </MotionBox>

          {/* CTA scroll-to-form */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 7, md: 10 },
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#2563EB",
                px: 4,
                py: 1.5,
                fontSize: "0.9rem",
                "&:hover": { bgcolor: "#1d4ed8" },
              }}
            >
              Fill The Form Out!
            </Button>
          </MotionBox>

          {/* ── Form + Info Cards ── */}
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
            {/* Contact Form */}
            <Grid item xs={12} lg={8}>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                sx={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  p: { xs: 3, md: 4 },
                  bgcolor: "rgba(10,10,20,0.7)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Row 1: First + Last name */}
                <Grid container spacing={2} sx={{ mb: 2.5 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.78rem",
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      First name*
                    </Typography>
                    <TextField
                      fullWidth
                      name="firstName"
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      sx={inputSx}
                      inputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.78rem",
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      Last Name*
                    </Typography>
                    <TextField
                      fullWidth
                      name="lastName"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      sx={inputSx}
                      inputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>
                </Grid>

                {/* Row 2: Email */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.78rem",
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    How can we reach you?*
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    placeholder="jane@framer.com"
                    value={form.email}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={inputSx}
                    inputProps={{ style: { color: "#fff" } }}
                  />
                </Box>

                {/* Row 3: Country + Category */}
                <Grid container spacing={2} sx={{ mb: 2.5 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.78rem",
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      Where Are you from?*
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      size="small"
                      sx={selectSx}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#111",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                          },
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        disabled
                        sx={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Select your country...
                      </MenuItem>
                      {[
                        "United States",
                        "United Kingdom",
                        "India",
                        "Germany",
                        "Australia",
                        "Canada",
                        "Other",
                      ].map((c) => (
                        <MenuItem
                          key={c}
                          value={c}
                          sx={{
                            color: "#fff",
                            bgcolor: "#111",
                            "&:hover": { bgcolor: "#1a1a2e" },
                          }}
                        >
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.78rem",
                        mb: 1,
                        fontWeight: 500,
                      }}
                    >
                      What's the type of your company?*
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      size="small"
                      sx={selectSx}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#111",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                          },
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        disabled
                        sx={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Select Category
                      </MenuItem>
                      {[
                        "Startup",
                        "SME",
                        "Enterprise",
                        "Agency",
                        "Freelancer",
                        "Non-profit",
                      ].map((c) => (
                        <MenuItem
                          key={c}
                          value={c}
                          sx={{
                            color: "#fff",
                            bgcolor: "#111",
                            "&:hover": { bgcolor: "#1a1a2e" },
                          }}
                        >
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                {/* Row 4: Message */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.78rem",
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    Message*
                  </Typography>
                  <TextField
                    fullWidth
                    name="message"
                    placeholder="Type your message..."
                    value={form.message}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={inputSx}
                    inputProps={{ style: { color: "#fff" } }}
                  />
                </Box>

                {/* Submit */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: "#2563EB",
                    borderRadius: "12px",
                    py: 1.8,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    "&:hover": { bgcolor: "#1d4ed8" },
                  }}
                >
                  Submit Now
                </Button>
              </MotionBox>
            </Grid>

            {/* Info Cards */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <InfoCard
                  icon={<EmailOutlinedIcon fontSize="small" />}
                  label="Email"
                  badge="24/7"
                  delay={0.55}
                >
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.9rem",
                      mt: 0.5,
                    }}
                  >
                    {generalInfo.email}
                  </Typography>
                </InfoCard>

                <InfoCard
                  icon={<PhoneOutlinedIcon fontSize="small" />}
                  label="Phone"
                  delay={0.65}
                >
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.9rem",
                      mt: 0.5,
                    }}
                  >
                    {generalInfo.phone}
                  </Typography>
                </InfoCard>

                <InfoCard
                  icon={<LocationOnOutlinedIcon fontSize="small" />}
                  label="Address"
                  badge="REMOTE"
                  badgeColor="#1e40af"
                  delay={0.75}
                >
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.9rem",
                      mt: 0.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {generalInfo.address.line1}
                    <br />
                    {generalInfo.address.line2}
                    <br />
                    {generalInfo.address.country}
                  </Typography>
                </InfoCard>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ═══════════════ FAQ SECTION ════════════════════════════ */}
      <FaqSection />
      {/* ═══════════════ CTA Banner ════════════════════════════ */}
      <CtaBanner />
    </Box>
  );
}
