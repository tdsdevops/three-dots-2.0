import { Box } from "@mui/material";
import ThreeDotsLogo from "../../assets/threedots.svg";

// ─── Logo ─────────────────────────────────────────────────────────────────────
export default function Logo({ width = "auto" }) {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: 22,
          color: "primary.main",
          fontWeight: 900,
          letterSpacing: -1,
        }}
      >
        <img src={ThreeDotsLogo} width={width} />
      </Box>
    </Box>
  );
}
