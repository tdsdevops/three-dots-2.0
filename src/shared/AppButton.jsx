import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { ThemeContext } from "../appConstant";

const BaseStyledButton = styled(Button)(() => ({
  fontSize: "16px",
  borderRadius: "10px",
  textTransform: "none",
  padding: "10px 18px",
  fontWeight: 400,
}));

function AppButton({
  btnText,
  color = "#ffffff",
  bgColor,
  width,
  variant = "contained",
  height = "3rem",
  showBoxShadow = true,
}) {
  const { theme } = useContext(ThemeContext);
  const shadowColor = bgColor
    ? `rgba(${bgColor
        .slice(1)
        .match(/.{1,2}/g)
        .map((x) => parseInt(x, 16))
        .join(", ")}, 0.5)`
    : "rgba(0, 85, 255, 0.5)";

  return (
    <BaseStyledButton
      variant={variant}
      sx={{
        color: color,
        boxShadow: showBoxShadow
          ? `${shadowColor} 0px 8px 40px 0px, rgba(255, 255, 255, 0) 0px 0px 10px 1px inset, ${shadowColor} 0px 0px 0px 1px`
          : "none",
        backgroundColor: bgColor || theme.palette.primary.main,
        width: width || "max-content",
        height: height,
        "&:hover": {
          backgroundColor: bgColor ? bgColor : theme.palette.primary.dark,
        },
      }}
    >
      {btnText}
    </BaseStyledButton>
  );
}

export default AppButton;
