import React from "react";
import styles from "./FollowSection.module.css";

const FollowSection = ({ userDetails }) => {
  const getDiv = (number, text) => {
    return (
      <div className={styles["inner-div"]}>
        <p className={styles["numbers"]}>{number}</p>
        <p className={styles["text"]}>{text}</p>
      </div>
    );
  };

  return (
    <div className={styles["follow-section"]}>
      {getDiv(userDetails.followers_count, "Followers")}
      {getDiv(userDetails.following_count, "Following")}
      {getDiv(userDetails.total_photos, "Photos")}
      {getDiv(userDetails.total_promoted_photos, "Promoted Photos")}
    </div>
  );
};

export default FollowSection;
