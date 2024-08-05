import React from "react";
import styles from "./style.module.css";

const Buttons = ({
  icon,
  iconPosition = "left",
  label = "",
  onClick,
  variant = "box-button",
  disabled = false,
  buttonStyles,
}) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={`${styles[variant]} ${buttonStyles} ${styles["button"]}`}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      {iconPosition === "left" && icon}
      {label !== "" && (
        <span
          style={
            iconPosition === "left"
              ? { marginLeft: "0.25rem" }
              : { marginRight: "0.25rem" }
          }
        >
          {label}
        </span>
      )}
      {iconPosition === "right" && icon}
    </button>
  );
};

export default Buttons;
