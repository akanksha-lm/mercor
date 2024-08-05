import React from "react";
import styles from "./style.module.css";

const ProfileCard = ({ pictureSource, pictureAlt, username, className }) => {
  return (
    <div className={`${styles["profile-card-box"]} ${className}`}>
      <img
        src={pictureSource}
        alt={pictureAlt}
        className={styles["profile-image"]}
      />
      <p className={styles["user-name"]}>{username}</p>
    </div>
  );
};

export default ProfileCard;
