import { Box } from "@mui/material";
import "./loader.css";
function DotLoader() {
  return (
    <>
      <Box className="dot-container">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </Box>
    </>
  );
}

export default DotLoader;
