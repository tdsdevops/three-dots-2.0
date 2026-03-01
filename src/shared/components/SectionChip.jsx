import { Box, Typography } from "@mui/material";

function SectionChip({ label }) {
  return (
    <Box
      sx={{
        backdropFilter: "blur(2.5px)",
        background:
          "linear-gradient(0.07383128568086761deg, rgba(0, 85, 255, 0.08) 0%, rgba(153, 153, 153, 0.1) 100%)",
        borderRadius: "10px",
        opacity: 1,
        gap: "10px",
        padding: "6px 14px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        width: "fit-content",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "30px",
          opacity: 1,
          width: "6px",
          height: "6px",
        }}
      />

      <Typography
        sx={{
          display: "inline-block",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage:
            "linear-gradient(90deg, var(--token-59e77027-930e-45f7-94aa-a8ffadf9e382, rgb(255, 255, 255)) 0%, var(--token-69ff14d1-f0d2-4345-baec-a0ff0f57f0ca, rgba(153, 153, 153, 0)) 409.99999999999994%)",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default SectionChip;
