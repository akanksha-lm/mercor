import React from "react";
import styles from "./UserDetails.module.css";
import { DEFAULT_LOCATION } from "../../../contants/constants";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SocialSection from "./SocialSection";
import TagsSection from "./TagsSection";
import FollowSection from "./FollowSection";

const UserDetails = ({ userDetails }) => {
  const tagsList = userDetails.tags.custom.map((tag) => {
    return tag.title;
  });

  return (
    <div className={styles["user-details"]}>
      <div className={styles["user-profile"]}>
        <img
          className={styles["profile-image"]}
          src={userDetails.profile_image.large}
          alt='profile'
        />
        <h2 className={styles["heading"]}>
          {userDetails.name}
          <VerifiedIcon className={styles["available-badge"]} />
        </h2>
        <p className={styles["location"]}>
          <LocationOnIcon className={styles["location-icon"]} />
          {userDetails.location != null
            ? userDetails.location
            : DEFAULT_LOCATION}
        </p>
      </div>

      <div className={styles["user-info-section"]}>
        <p className={styles["bio"]}>{userDetails.bio}</p>
        <FollowSection userDetails={userDetails} />
        <TagsSection tagsList={tagsList} />
      </div>
      <SocialSection userDetails={userDetails} />
    </div>
  );
};

export default UserDetails;
