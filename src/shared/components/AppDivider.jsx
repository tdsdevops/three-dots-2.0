import React from "react";

function AppDivider() {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%)",
        flex: "0 0 auto",
        height: "1px",
        position: "relative",
        width: "100%",
      }}
    ></div>
  );
}

export default AppDivider;
