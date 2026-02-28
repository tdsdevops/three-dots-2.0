import { Button } from "@mui/material";
import React from "react";
import propTypes from "prop-types";
import "./css/global-styles.css";
import { classNames } from "../appConstant";

function MuiButton({ btnText, classname = classNames.requote,submitQuoteValue=()=>{},buttonType ,variant="outlined"}) {
  return (
    <Button className={classname} variant={variant}  color="primary" onClick={submitQuoteValue} type={buttonType} > 
      {btnText}
    </Button>
  );
}

export default MuiButton;
MuiButton.propTypes = {
  btnText: propTypes.string.isRequired,
  classname: propTypes.string,
};
