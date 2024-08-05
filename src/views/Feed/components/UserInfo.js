import React from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../../utils/helperFunctions";
import ProfilePicture from "../../../components/ProfilePicture";
import styles from "./UserInfo.module.css";

const UserInfo = ({ photo }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/user/${photo.user.username}`);
  };

  return (
    <div className={styles["info"]}>
      <button className={styles["profile-button"]} onClick={handleProfileClick}>
        <ProfilePicture
          pictureSource={photo.user.profile_image.medium}
          pictureAlt={photo.user.first_name}
        />
      </button>
      <div>
        <p className={styles["photo-author"]}>{photo.user.name}</p>
        <p className={styles["photo-time"]}>
          Posted {timeAgo(photo.created_at)} ago
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
