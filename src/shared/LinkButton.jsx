import React from "react";
import { Link } from "react-router";

function LinkButton({ element, to }) {
  return (
    <Link
      to={to}
      style={{ textDecoration: "none", display: "inline-block", width: "100%" }}
    >
      {element}
    </Link>
  );
}

export default LinkButton;
