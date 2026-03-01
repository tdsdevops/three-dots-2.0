import React from "react";
import AppButton from "../AppButton";
import { Link } from "react-router";
import LinkButton from "../LinkButton";

function ConnectWithUsButton() {
  return (
    <LinkButton
      to="/contact"
      element={
        <AppButton
          btnText="Connect With Us"
          bgColor={"#efeeec"}
          color="#131313"
          width={"12rem"}
          showBoxShadow={false}
        />
      }
    />
  );
}

export default ConnectWithUsButton;
