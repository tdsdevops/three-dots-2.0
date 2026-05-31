import React, { useRef, useState } from "react";
import { Box, Button, Container, Grid, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Stack, CircularProgress } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { sendEmail } from "../../utils/sendEmail";
import { getContactEmailTemplate } from "../../utils/emailTemplates";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SERVICES_LIST = [
  "Website Development",
  "E-commerce Solutions",
  "CMS & SaaS Platforms",
  "ERP & Business Dashboards",
  "Custom Web Applications",
  "UX/UI Design"
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  companyName: Yup.string().required("Please enter your company name"),
  email: Yup.string().email("Please enter a valid email").required("Please enter your email"),
  service: Yup.string().required("Please select a service"),
  message: Yup.string().required("Please tell us about your project"),
});

export default function RequestQuoteSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        to: import.meta.env.VITE_CONTACT_EMAIL,
        from: import.meta.env.VITE_FROM_EMAIL,
        subject: `New Project Quote Inquiry from ${values.name}`,
        html: getContactEmailTemplate({
          firstName: values.name,
          lastName: `(${values.companyName})`,
          email: values.email,
          country: values.service,
          category: "Project Quote Request",
          message: values.message,
        })
      };

      const functionName = import.meta.env.VITE_EDGE_FUNCTION_NAME || "email-services";
      await sendEmail(functionName, payload);
      setSubmitted(true);
      resetForm();
    } catch (err) {
      console.error("Error submitting quote request", err);
      alert("Failed to submit request. Please try again or email us directly at threedotssoftwaredevelopment@gmail.com");
    } finally {
      setSubmitting(false);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      bgcolor: "rgba(255,255,255,0.03)",
      color: "#fff",
      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
      "&:hover fieldset": { borderColor: "rgba(59,110,248,0.3)" },
      "&.Mui-focused fieldset": { borderColor: "#3B6EF8" },
    },
    "& input, & textarea": { color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" },
    "& label": { color: "rgba(255,255,255,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif" },
    "& label.Mui-focused": { color: "#3B6EF8" },
  };

  const selectSx = {
    borderRadius: "10px",
    bgcolor: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(59,110,248,0.3)" },
    "&.Mui-focused fieldset": { borderColor: "#3B6EF8" },
    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.4)" },
  };

  return (
    <Box
      id="request-quote"
      ref={ref}
      sx={{

        position: "relative",
        overflow: "clip",
        py: { xs: 10, md: 16 },
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Decorative Blur Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "8%",
          width: { xs: 240, md: 450 },
          height: { xs: 240, md: 450 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,110,248,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: { xs: 200, md: 350 },
          height: { xs: 200, md: 350 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 6, md: 8, lg: 10 },
            alignItems: "center",
          }}
        >
          {/* Left Text Column */}
          <Box sx={{ flex: 1, width: "100%", maxWidth: { xs: "100%", lg: "44%" } }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#3B6EF8",
                    boxShadow: "0 0 8px #3B6EF8",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#7da4ff",
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  GET AN ESTIMATE
                </Typography>
              </Stack>

              <Typography
                variant="h2"
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: 800,
                  fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
                  color: "#fff",
                  lineHeight: 1.12,
                  mb: 2.5,
                }}
              >
                Ready to Build <br />
                <Box component="span" sx={{ color: "#3B6EF8" }}>
                  Something That Lasts?
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.8,
                  fontSize: { xs: 14, md: 15.5 },
                  maxWidth: 480,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Tell us about your project, your timeline, and your goals. We'll analyze your requirements and reach back to you within one business day with a clear scope document and a transparent cost assessment.
              </Typography>
            </motion.div>
          </Box>

          {/* Right Form Column */}
          <Box sx={{ flex: 1.2, width: "100%", display: "flex", justifyContent: { xs: "center", lg: "flex-end" } }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", maxWidth: "620px" }}
            >
              <Box
                sx={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  p: { xs: 4, md: 5 },
                  background: "linear-gradient(145deg, rgba(8,16,52,0.7) 0%, rgba(6,12,38,0.85) 100%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 12px 50px rgba(0,0,30,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                  position: "relative",
                  overflow: "hidden",


                }}
              >
                {/* Submit Success State */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center", padding: "40px 0" }}
                  >
                    <CheckCircleOutlineIcon sx={{ fontSize: 72, color: "#4CAF50", mb: 3 }} />
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: "DM Sans",
                        fontWeight: 700,
                        fontSize: "1.8rem",
                        color: "#fff",
                        mb: 2,
                      }}
                    >
                      Request Sent!
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 15,
                        maxWidth: 400,
                        mx: "auto",
                        lineHeight: 1.7,
                      }}
                    >
                      Thank you! We've received your project requirements. Our engineering team will review everything and reach back to you within 24 hours.
                    </Typography>
                  </motion.div>
                ) : (
                  <Formik
                    initialValues={{ name: "", companyName: "", email: "", service: "", message: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <Grid sx={{ flexDirection: { xs: "column" } }} container spacing={3}>
                          {/* Row 1: Name, Company, Email (3 Columns side-by-side on desktop) */}
                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="name"
                              label="Your Name*"
                              variant="outlined"
                              size="medium"
                              sx={inputSx}
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="companyName"
                              label="Company Name*"
                              variant="outlined"
                              size="medium"
                              sx={inputSx}
                              error={touched.companyName && Boolean(errors.companyName)}
                              helperText={touched.companyName && errors.companyName}
                            />
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="email"
                              label="Email Address*"
                              variant="outlined"
                              size="medium"
                              sx={inputSx}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>

                          {/* Row 2: Service Dropdown (takes 6/12 columns on desktop) */}
                          <Grid item xs={12} md={6}>
                            <FormControl
                              fullWidth
                              variant="outlined"
                              size="medium"
                              error={touched.service && Boolean(errors.service)}
                            >
                              <InputLabel id="service-label" sx={{ color: "rgba(255,255,255,0.4)", "&.Mui-focused": { color: "#3B6EF8" } }}>
                                What service do you need?*
                              </InputLabel>
                              <Field
                                as={Select}
                                labelId="service-label"
                                name="service"
                                label="What service do you need?*"
                                sx={selectSx}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      bgcolor: "#060d24",
                                      border: "1px solid rgba(255,255,255,0.1)",
                                      borderRadius: "10px",
                                    },
                                  },
                                }}
                              >
                                {SERVICES_LIST.map((srv) => (
                                  <MenuItem
                                    key={srv}

                                    value={srv}
                                    sx={{
                                      color: "#fff",
                                      bgcolor: "#060d24",
                                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                                      "&:hover": { bgcolor: "rgba(59,110,248,0.15)" },
                                      "&.Mui-selected": { bgcolor: "rgba(59,110,248,0.25)" },
                                    }}
                                  >
                                    {srv}
                                  </MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          </Grid>

                          {/* Row 3: Message Field (Full width) */}
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="message"
                              label="Project Details & Requirements*"
                              variant="outlined"
                              multiline
                              rows={4}
                              sx={inputSx}
                              error={touched.message && Boolean(errors.message)}
                              helperText={touched.message && errors.message}
                            />
                          </Grid>

                          {/* Row 4: Submit Button (Full width) */}
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              disabled={isSubmitting}
                              sx={{
                                px: 4,
                                py: 1.4,
                                fontSize: 14,
                                background: "#3B6EF8",
                                "&:hover": { background: "#2a5ce8" },
                                alignSelf: "flex-start",
                              }}
                            >
                              {isSubmitting ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                              ) : (
                                "Submit Quote Request"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                )}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
