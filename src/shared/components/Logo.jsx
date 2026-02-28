import { Box } from "@mui/material";
import ThreeDotsLogo from "../../assets/threedots.svg";

// ─── Logo ─────────────────────────────────────────────────────────────────────
export default function Logo({ width = "50px" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box
        component="span"
        sx={{
          fontSize: 22,
          color: "primary.main",
          fontFamily: "Syne",
          fontWeight: 900,
          letterSpacing: -1,
        }}
      >
        <img src={ThreeDotsLogo} width={width} />
      </Box>
    </Box>
  );
}
