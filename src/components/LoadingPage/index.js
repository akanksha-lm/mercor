import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styles from "./style.module.css";

const LoadingPage = ({ className }) => {
  return (
    <div className={`${styles["loading-page"]} ${className}`}>
      <p className={styles["heading"]}>Fetching data</p>
      <PulseLoader color='#767676' size={10} margin={10} />
    </div>
  );
};

export default LoadingPage;
