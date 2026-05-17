import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "../../utils/sendEmail";
import { getAppointmentEmailTemplate } from "../../utils/emailTemplates";

const MotionBox = motion(Box);

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    transition: "background 0.3s ease",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
      transition: "border-color 0.3s ease",
    },
    "&:hover": {
      background: "rgba(255,255,255,0.05)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3B6EF8",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.5)",
    "&.Mui-focused": { color: "#3B6EF8" },
  },
  "& input::placeholder, & textarea::placeholder": {
    color: "rgba(255,255,255,0.3)",
    opacity: 1,
  },
  "& input": {
    colorScheme: "dark",
  },
};

export default function AppointmentDialog({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      alert("Please fill out all required fields.");
      return;
    }
   onClose()
    setLoading(true);
    try {
      const payload = {
        to: import.meta.env.VITE_CONTACT_EMAIL,
        from: import.meta.env.VITE_FROM_EMAIL,
        subject: `New Appointment Request from ${form.name}`,
        html: getAppointmentEmailTemplate(form),
      };

      const functionName = import.meta.env.VITE_EDGE_FUNCTION_NAME || "email-services";
      await sendEmail(functionName, payload);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: "", email: "", phone: "", date: "", time: "", message: "" });
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#0d1117",
          backgroundImage: "none",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #3B6EF8, #8B5CF6)" }} />
      
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 4, px: { xs: 3, sm: 5 } }}>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif" }}>
          Book a Call
        </Typography>
        <IconButton onClick={onClose} disabled={loading} sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 3, sm: 5 }, pb: 5 }}>
        <AnimatePresence mode="wait">
          {success ? (
            <MotionBox
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              sx={{ textAlign: "center", py: 6 }}
            >
              <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Booking Confirmed!</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>We've received your request and will be in touch shortly to finalize the details.</Typography>
            </MotionBox>
          ) : (
            <MotionBox
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4, fontSize: "0.95rem" }}>
                Select a time that works for you and let's discuss how we can help your business grow.
              </Typography>
              <Grid container spacing={2.5}>
                <Grid width={"80%"} item xs={12} sm={6} display={"flex"} alignItems={"center"} justifyContent={"space-between"} gridTemplateRows={"auto auto"} gap={2.5}>
                  <TextField required fullWidth label="Full Name" name="name" placeholder="e.g. John Doe" InputLabelProps={{ shrink: true }} value={form.name} onChange={handleChange} sx={inputSx} disabled={loading} />
                  <TextField required fullWidth label="Email Address" type="email" name="email" placeholder="e.g. john@example.com" InputLabelProps={{ shrink: true }} value={form.email} onChange={handleChange} sx={inputSx} disabled={loading} />
                </Grid>
                  <Grid  width={"80%"} item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" name="phone" placeholder="e.g. +1 (555) 000-0000" InputLabelProps={{ shrink: true }} value={form.phone} onChange={handleChange} sx={inputSx} disabled={loading} />
                </Grid>
                <Grid width={"80%"} item xs={12} sm={6} display={"flex"} alignItems={"center"} justifyContent={"space-between"} gridTemplateRows={"auto auto"} gap={2.5}>
                  <TextField required fullWidth label="Preferred Date" type="date" name="date" InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange} sx={inputSx} disabled={loading} />
                  <TextField required fullWidth label="Preferred Time" type="time" name="time" InputLabelProps={{ shrink: true }} value={form.time} onChange={handleChange} sx={inputSx} disabled={loading} />
                </Grid>
              
                
               
                <Grid width={"80%"} item xs={12}>
                  <TextField fullWidth label="Briefly describe your project/needs" name="message" placeholder="Tell us about your project goals, timeline, or specific requirements..." multiline rows={3} InputLabelProps={{ shrink: true }} value={form.message} onChange={handleChange} sx={inputSx} disabled={loading} />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: "12px",
                  background: loading ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #3B6EF8, #8B5CF6)",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: loading ? "none" : "0 8px 25px rgba(59, 110, 248, 0.4)",
                  "&:hover": { background: "linear-gradient(135deg, #2a5ce8, #7a4be5)", boxShadow: "0 10px 30px rgba(59, 110, 248, 0.6)" },
                }}
              >
                {loading ? "Submitting..." : "Confirm Booking"}
              </Button>
            </MotionBox>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
