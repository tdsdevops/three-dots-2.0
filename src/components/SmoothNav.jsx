import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

// --- Data ---
const pages = [
  {
    id: "home",
    label: "Home",
    icon: HomeRoundedIcon,
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accent: "#a78bfa",
    title: "Morning Run",
    subtitle: "6:42 AM · Central Park",
    tag: "Fitness",
    stat: "5.2 km",
    statLabel: "Today",
    avatar: "https://i.pravatar.cc/150?img=3",
    user: "alex.moves",
  },
  {
    id: "explore",
    label: "Explore",
    icon: ExploreRoundedIcon,
    bg: "linear-gradient(135deg, #093028 0%, #237a57 100%)",
    accent: "#34d399",
    title: "Hidden Cafe",
    subtitle: "Tokyo, Japan · 3h ago",
    tag: "Travel",
    stat: "4.9 ★",
    statLabel: "Rating",
    avatar: "https://i.pravatar.cc/150?img=12",
    user: "wanderlust.kai",
  },
  {
    id: "create",
    label: "Create",
    icon: AddCircleRoundedIcon,
    bg: "linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)",
    accent: "#fb7185",
    title: "New Drop",
    subtitle: "Limited Edition · 48h left",
    tag: "Design",
    stat: "247",
    statLabel: "Waiting",
    avatar: "https://i.pravatar.cc/150?img=25",
    user: "studio.nova",
  },
  {
    id: "favorites",
    label: "Saved",
    icon: BookmarkRoundedIcon,
    bg: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 100%)",
    accent: "#fbbf24",
    title: "Golden Hour",
    subtitle: "Santorini · Saved 2 days ago",
    tag: "Photography",
    stat: "1.2k",
    statLabel: "Saves",
    avatar: "https://i.pravatar.cc/150?img=47",
    user: "frame.by.mia",
  },
  {
    id: "profile",
    label: "Profile",
    icon: PersonRoundedIcon,
    bg: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
    accent: "#60a5fa",
    title: "Your Story",
    subtitle: "Member since 2023",
    tag: "Profile",
    stat: "89",
    statLabel: "Posts",
    avatar: "https://i.pravatar.cc/150?img=68",
    user: "you",
  },
];

// --- Variants ---
const pageVariants = {
  enter: (dir) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 35,
  mass: 0.8,
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

// --- Card Content ---
function PageContent({ page }) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        p: 3,
        pb: "100px",
        background: page.bg,
      }}
    >
      {/* Background decorative blob */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "-10%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: page.accent,
          opacity: 0.12,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <motion.div
        custom={0}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{ position: "absolute", top: 40, left: 24, right: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Chip
          label={page.tag}
          size="small"
          sx={{
            background: `${page.accent}22`,
            color: page.accent,
            border: `1px solid ${page.accent}44`,
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
            <NotificationsRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </motion.div>

      {/* Main visual area */}
      <motion.div
        custom={1}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
      >
        <Box
          sx={{
            width: 180,
            height: 180,
            borderRadius: "28px",
            background: `${page.accent}18`,
            border: `2px solid ${page.accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(20px)",
            boxShadow: `0 0 60px ${page.accent}30`,
          }}
        >
          <Typography sx={{ fontSize: "4rem" }}>
            {page.id === "home" ? "🏃" : page.id === "explore" ? "☕" : page.id === "create" ? "✦" : page.id === "favorites" ? "📸" : "✦"}
          </Typography>
        </Box>
      </motion.div>

      {/* Stat pill */}
      <motion.div custom={2} variants={contentVariants} initial="hidden" animate="visible">
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 1,
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50px",
            px: 2.5,
            py: 1,
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: page.accent, lineHeight: 1, fontFamily: "Georgia, serif" }}>
            {page.stat}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>
            {page.statLabel}
          </Typography>
        </Box>
      </motion.div>

      {/* Title */}
      <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible">
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            fontFamily: "Georgia, 'Times New Roman', serif",
            mb: 1,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {page.title}
        </Typography>
      </motion.div>

      {/* Subtitle */}
      <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible">
        <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", mb: 2 }}>
          {page.subtitle}
        </Typography>
      </motion.div>

      {/* User row */}
      <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={page.avatar}
              sx={{
                width: 36,
                height: 36,
                border: `2px solid ${page.accent}`,
                boxShadow: `0 0 12px ${page.accent}60`,
              }}
            />
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
              @{page.user}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" sx={{ color: "rgba(255,255,255,0.5)" }}>
              <FavoriteRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: "rgba(255,255,255,0.5)" }}>
              <ShareRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

// --- Bottom Nav ---
function BottomNav({ current, onChange, pages }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: "rgba(5,5,15,0.85)",
        backdropFilter: "blur(30px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        zIndex: 100,
        px: 1,
      }}
    >
      {pages.map((page, i) => {
        const Icon = page.icon;
        const isActive = current === i;
        return (
          <Box
            key={page.id}
            onClick={() => onChange(i)}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, cursor: "pointer", minWidth: 56, position: "relative" }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: "absolute",
                  top: -8,
                  left: "50%",
                  x: "-50%",
                  width: 32,
                  height: 3,
                  borderRadius: 2,
                  background: page.accent,
                  boxShadow: `0 0 10px ${page.accent}`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -2 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
              <Icon
                sx={{
                  fontSize: 24,
                  color: isActive ? pages[current].accent : "rgba(255,255,255,0.3)",
                  filter: isActive ? `drop-shadow(0 0 6px ${pages[current].accent})` : "none",
                  transition: "color 0.3s, filter 0.3s",
                }}
              />
            </motion.div>
            <Typography
              sx={{
                fontSize: "0.6rem",
                fontWeight: isActive ? 700 : 400,
                color: isActive ? pages[current].accent : "rgba(255,255,255,0.25)",
                letterSpacing: 0.5,
                transition: "color 0.3s",
              }}
            >
              {page.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

// --- Main App ---
export default function SmoothNav() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const navigate = useCallback(
    (newIndex) => {
      if (newIndex === currentIndex) return;
      setPage([newIndex, newIndex > currentIndex ? 1 : -1]);
    },
    [currentIndex]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#000",
      }}
    >
      {/* Phone frame */}
      <Box
        sx={{
          width: 375,
          height: 720,
          borderRadius: "44px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1)",
          background: "#000",
        }}
      >
        {/* Pages */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            style={{ position: "absolute", inset: 0 }}
          >
            <PageContent page={pages[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Bottom Nav */}
        <BottomNav current={currentIndex} onChange={navigate} pages={pages} />
      </Box>
    </Box>
  );
}