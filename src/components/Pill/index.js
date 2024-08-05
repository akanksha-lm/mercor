import React from "react";
import styles from "./style.module.css";

const Pill = ({ count, className, variant = "active-pill" }) => {
  return (
    <span className={`${styles["pill"]} ${className} ${styles[variant]}`}>
      {count}
    </span>
  );
};

export default Pill;
