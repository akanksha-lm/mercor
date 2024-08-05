import React from "react";
import { Instagram, Twitter, Link, PhotoLibrary } from "@mui/icons-material";
import styles from "./SocialSection.module.css";

const SocialSection = ({ userDetails }) => {
  const getListItem = (url, icon, name) => {
    if (!name) return;
    return (
      <li className={styles["list-item"]}>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {icon}
        </a>
      </li>
    );
  };
  return (
    <div className={styles["social-section"]}>
      <p className={styles["heading"]}>Let's connect</p>
      <ul className={styles["social-list"]}>
        {getListItem(
          `https://instagram.com/${userDetails.social.instagram_username}`,
          <Instagram className={styles["icon"]} />,
          userDetails.social.instagram_username
        )}
        {getListItem(
          `https://twitter.com/${userDetails.social.twitter_username}`,
          <Twitter className={styles["icon"]} />,
          userDetails.social.twitter_username
        )}
        {getListItem(
          userDetails.social.portfolio_url,
          <Link className={`${styles["icon"]} ${styles["link-icon"]}`} />,
          "Portfolio"
        )}
        {getListItem(
          userDetails.links.self,
          <PhotoLibrary className={styles["icon"]} />,
          "Unsplash Portfolio"
        )}
      </ul>
    </div>
  );
};

export default SocialSection;
