import React from "react";
import notFound from "../../assets/notFoundImage.jpg";
import styles from "./style.module.css";

const ErrorPage = () => {
  return (
    <div className={styles["error-page-div"]}>
      <h1 className={styles["error-message"]}>
        Seems like we have hit a roadblock! Please try again.
      </h1>
      <img
        src={notFound}
        alt='not-found'
        className={styles["not-found-image"]}
      />
    </div>
  );
};

export default ErrorPage;
