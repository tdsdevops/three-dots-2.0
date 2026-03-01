import React, { useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../appConstant";
import bgVdo from "../../assets/bgVdo.mp4";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0055ff" },
    background: { default: "#020718", paper: "#060d24" },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.55)" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: { fontFamily: "'DM Sans', sans-serif", fontWeight: 800 },
    h2: { fontFamily: "'DM Sans', sans-serif", fontWeight: 800 },
    h3: { fontFamily: "'DM Sans', sans-serif", fontWeight: 700 },
  },
  components: {},
});
function useSmoothScroll() {
  const contentRef = useRef(null); // the motion.div with transform
  const proxyRef = useRef(null); // hidden overflow:auto proxy for middle-mouse
  const scrollY = useMotionValue(0);
  const EASE = 0.08;
  const targetY = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const proxy = proxyRef.current;
    if (!content || !proxy) return;

    const getMax = () =>
      Math.max(0, content.scrollHeight - globalThis.innerHeight);

    // Keep the proxy inner spacer height = content height
    // so the proxy's scrollbar range exactly matches scrollable area
    const syncProxyHeight = () => {
      const spacer = proxy.firstElementChild;
      if (spacer) spacer.style.height = content.scrollHeight + "px";
    };
    const ro = new ResizeObserver(syncProxyHeight);
    ro.observe(content);
    syncProxyHeight();

    // ── Wheel ──
    // Only intercept when NOT zooming (ctrlKey = zoom gesture on trackpad/mouse)
    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return; // let browser handle zoom
      e.preventDefault();
      targetY.current = Math.max(
        0,
        Math.min(getMax(), targetY.current + e.deltaY),
      );
      proxy.scrollTop = targetY.current; // keep proxy in sync
    };

    // ── Middle-mouse proxy scroll ──
    // Browser writes proxy.scrollTop during autoscroll; we read it here
    const onProxyScroll = () => {
      targetY.current = proxy.scrollTop;
    };

    // ── Touch ──
    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetY.current = Math.max(
        0,
        Math.min(getMax(), targetY.current + delta),
      );
      proxy.scrollTop = targetY.current;
    };

    // ── Keyboard ──
    const onKeyDown = (e) => {
      const step = 80;
      const pageStep = globalThis.innerHeight * 0.85;
      const map = {
        ArrowDown: step,
        ArrowUp: -step,
        PageDown: pageStep,
        PageUp: -pageStep,
        End: getMax(),
        Home: 0,
      };
      if (e.key in map) {
        e.preventDefault();
        const next =
          e.key === "End"
            ? getMax()
            : e.key === "Home"
              ? 0
              : targetY.current + map[e.key];
        targetY.current = Math.max(0, Math.min(getMax(), next));
        proxy.scrollTop = targetY.current;
      }
    };

    // ── RAF lerp → drives scrollY MotionValue → content transform ──
    const tick = () => {
      currentY.current += (targetY.current - currentY.current) * EASE;
      if (Math.abs(currentY.current - targetY.current) < 0.05)
        currentY.current = targetY.current;
      scrollY.set(currentY.current);
      rafId.current = requestAnimationFrame(tick);
    };

    globalThis.addEventListener("wheel", onWheel, { passive: false });
    globalThis.addEventListener("touchstart", onTouchStart, { passive: true });
    globalThis.addEventListener("touchmove", onTouchMove, { passive: true });
    globalThis.addEventListener("keydown", onKeyDown);
    proxy.addEventListener("scroll", onProxyScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      globalThis.removeEventListener("wheel", onWheel);
      globalThis.removeEventListener("touchstart", onTouchStart);
      globalThis.removeEventListener("touchmove", onTouchMove);
      globalThis.removeEventListener("keydown", onKeyDown);
      proxy.removeEventListener("scroll", onProxyScroll);
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, []);

  return { scrollY, contentRef, proxyRef };
}
function Cursor() {
  const cursorX = useSpring(0, { stiffness: 1000, damping: 60 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 60 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    globalThis.addEventListener("mousemove", move);
    return () => globalThis.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 15,
        height: 15,
        borderRadius: "50%",
        background: "#ffffff",
        pointerEvents: "none",
        zIndex: 9999,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
// // ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
function ThemeContextProvider({ children }) {
  const { scrollY, contentRef, proxyRef } = useSmoothScroll();
  const contentY = useTransform(scrollY, (v) => -v);

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          scrollY,
          contentRef,
          proxyRef,
          theme,
          contentY,
          fadeUp,
          stagger,
          bgVdo,
        }}
      >
        <Cursor />

        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default ThemeContextProvider;
