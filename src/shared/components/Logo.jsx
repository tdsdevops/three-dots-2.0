import { Box } from "@mui/material";
import ThreeDotsLogo from "../../assets/threedots.svg";
import { useNavigate } from "react-router";

// ─── Logo ─────────────────────────────────────────────────────────────────────
export default function Logo({ width = "auto" }) {
  const navigate=useNavigate()
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
      }}
      onClick={()=>{
        navigate("/")
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
