import React from "react";

const StyledButton = () => {
  return (
    <button
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => console.log("Button clicked!")}
    >
      Click Me
    </button>
  );
};

export default StyledButton;
