import React from "react";
import noData from "../../assets/noData.png";
import styles from "./style.module.css";

const NoData = ({ message = "No data found" }) => {
  return (
    <div className={styles["no-data-div"]}>
      <p className={styles["heading"]}> {message}</p>
      <img src={noData} alt='no-data' className={styles["no-data-image"]} />
    </div>
  );
};

export default NoData;
