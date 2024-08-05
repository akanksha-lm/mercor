import React from "react";
import styles from "./style.module.css";

const ProfilePicture = ({ pictureSource, pictureAlt, className }) => {
  return (
    <img
      src={pictureSource}
      alt={pictureAlt}
      className={`${styles["profile-image"]} ${className}`}
    />
  );
};

export default ProfilePicture;
