import React from "react";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <button 
    aria-pressed={props.isHeld}
    aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
    style={styles} onClick={props.hold}>
      {props.value}
    </button>
  );
};

export default Die;
