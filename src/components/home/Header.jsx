import { ThemeContext } from "../../appConstant";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";

import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../../shared/components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import LinkButton from "../../shared/LinkButton";
import AppButton from "../../shared/AppButton";
import AppDivider from "../../shared/components/AppDivider";

function Header() {
  const context = useContext(ThemeContext);
  const themes = useTheme();
  const { scrollY, theme } = context;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(themes.breakpoints.down("md"));
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!scrollY) return;
    const unsub = scrollY.on("change", (v) => {
      setScrolled(v > 20);
      if (v > 80) setHidden(v > lastScrollY.current);
      else setHidden(false);
      lastScrollY.current = v;
    });
    return unsub;
  }, [scrollY]);

  // FIX: body scroll lock — use position:fixed technique, NOT overflow:hidden
  // overflow:hidden on body breaks Ctrl+Wheel zoom and middle-mouse autoscroll
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth =
        globalThis.innerWidth - document.documentElement.clientWidth;
      const currentScrollY = scrollY?.get() ?? 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";
      if (top) globalThis.scrollTo(0, parseInt(top || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileOpen]);

  const links = ["Home", "About", "Portfolio", "Contact", "FAQ"];
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <motion.div
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background:
              "linear-gradient(rgba(19, 19, 19, 0.5) 6.64238%, rgba(0, 0, 0, 0.3) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 40px rgba(0,0,20,0.4)",
            position: "relative",
            "&::before": {
              content: scrolled ? '""' : "none",
              position: "absolute",
              top: 0,
              left: "5%",
              right: "5%",
              height: "1px",
              background:
                "linear-gradient(rgba(19, 19, 19, 0.5) 6.64238%, rgba(0, 0, 0, 0.3) 100%)",
              borderRadius: "0 0 50% 50%",
            },
            transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ py: { xs: 1.2, md: 1.5 }, justifyContent: "space-between" }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flex: "1 0 0px",
                  flexFlow: "row",
                  height: "min-content",
                  overflow: "visible",
                  position: "relative",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flex: "0 0 auto",
                    flexFlow: "row",
                    gap: "40px",
                    height: "min-content",
                    overflow: "hidden",
                    padding: "0px",
                    position: "relative",
                    width: "min-content",
                  }}
                >
                  <Logo />
                  {!isMobile && (
                    <>
                      <div
                        style={{
                          background:
                            "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)",
                          opacity: 1,
                          flex: "0 0 auto",
                          height: "40px",
                          overflow: "hidden",
                          position: "relative",
                          width: "1px",
                        }}
                      ></div>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{
                          flex: "0 0 auto",
                          height: "auto",
                          position: "relative",
                          width: "auto",
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: "flex-start",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            gap: "38px",
                            height: "min-content",
                            overflow: "hidden",
                            padding: "0px",
                            position: "relative",
                            width: "min-content",
                          }}
                        >
                          {links.map((l) => (
                            <Link
                              key={l}
                              to={`/${l.toLowerCase()}`}
                              sx={{
                                alignItems: "center",
                                cursor: "pointer",
                                display: "flex",
                                flexFlow: "row",
                                gap: "10px",
                                height: "min-content",
                                overflow: "visible",
                                padding: "0px",
                                position: "relative",
                                textDecoration: "none",
                                width: "min-content",
                              }}
                            >
                              <span
                                style={{
                                  opacity:
                                    location.pathname === `/${l.toLowerCase()}`
                                      ? 1
                                      : 0.6,

                                  display: "inline-block",
                                  backgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundImage:
                                    "linear-gradient(90deg, var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255)) 0%, var(--token-69ff14d1-f0d2-4345-baec-a0ff0f57f0ca, rgba(153, 153, 153, 0)) 409.99999999999994%)",
                                }}
                              >
                                {l}
                              </span>
                            </Link>
                          ))}
                        </Box>
                      </Stack>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    flex: "0 0 auto",
                    height: "auto",
                    position: "relative",
                    width: "auto",
                  }}
                >
                  {!isMobile && (
                    <LinkButton
                      element={<AppButton btnText="Get In Touch" />}
                      to="/contact"
                    />
                  )}
                  {isMobile && (
                    <IconButton
                      onClick={() => setMobileOpen(true)}
                      sx={{ color: "#fff", p: 0.5 }}
                      aria-label="Open menu"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          width: 22,
                        }}
                      >
                        <Box
                          sx={{
                            height: 2,
                            background: "#fff",
                            borderRadius: 1,
                          }}
                        />
                        <Box
                          sx={{
                            height: 2,
                            background: "#fff",
                            borderRadius: 1,
                            width: "70%",
                          }}
                        />
                      </Box>
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,10,0.55)",
                zIndex: 98,
              }}
            />
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.6 }}
              animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
              exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.6 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                background:
                  "linear-gradient(180deg, rgb(19, 19, 19) 6.642384572072071%, rgba(0, 0, 0, 0.3) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
                boxShadow:
                  "0 24px 60px rgba(0,0,30,0.55), inset 0 -1px 0 rgba(255,255,255,0.06)",
                overflow: "clip",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                  transform: "none",
                  transformOrigin: "50% 50% 0px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "5%",
                  right: "5%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), rgba(140,180,255,0.25), rgba(255,255,255,0.18), transparent)",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2.5,
                  py: 1.5,
                  position: "relative",
                  zIndex: 1,
                }}
                width={"100%"}
              >
                <Logo />
                <IconButton
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    p: 0.6,
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <AppDivider />

              <Box
                sx={{
                  px: 2.5,
                  pt: 1,
                  pb: 1,
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {links.map((l, i) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.06,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      key={l}
                      to={`/${l.toLowerCase()}`}
                      sx={{
                        alignItems: "center",
                        cursor: "pointer",
                        display: "flex",
                        flexFlow: "row",
                        gap: "10px",
                        height: "min-content",
                        overflow: "visible",
                        padding: "0px",
                        position: "relative",
                        textDecoration: "none",
                        width: "min-content",
                      }}
                    >
                      <span
                        style={{
                          opacity:
                            location.pathname === `/${l.toLowerCase()}`
                              ? 1
                              : 0.6,

                          display: "inline-block",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundImage:
                            "linear-gradient(90deg, var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255)) 0%, var(--token-69ff14d1-f0d2-4345-baec-a0ff0f57f0ca, rgba(153, 153, 153, 0)) 409.99999999999994%)",
                        }}
                      >
                        {l}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </Box>

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.35 }}
                width={"100%"}
              >
                <Box
                  sx={{ px: 2.5, py: 2, position: "relative", zIndex: 1 }}
                  width={"100%"}
                >
                  <LinkButton
                    element={
                      <AppButton btnText="Get In Touch" width={"100%"} />
                    }
                    to="/contact"
                  />
                </Box>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
