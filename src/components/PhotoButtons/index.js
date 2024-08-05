import React, { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Buttons from "../Buttons";
import UserInfo from "../../views/Feed/components/UserInfo";

import styles from "./style.module.css";

const PhotoButtons = ({ photo }) => {
  const [hasLiked, setHasLiked] = useState(photo.liked_by_user);
  return (
    <div className={styles["overlay"]}>
      <div className={styles["user-info"]}>
        <UserInfo photo={photo} />
      </div>
      <Buttons
        buttonStyles={styles["download-button"]}
        icon={<SaveAltIcon className={styles["download-icon"]} />}
        onClick={() => window.open(photo.links.download, "_blank")}
        variant='transparent-button'
      />
      <div className={styles["action-buttons"]}>
        <Buttons
          icon={<VisibilityIcon className={styles["icon"]} />}
          iconPosition='left'
          variant='transparent-button'
          label={`${photo.height / 100}k`}
        />
        <Buttons
          icon={
            hasLiked ? (
              <FavoriteIcon className={styles["icon"]} />
            ) : (
              <FavoriteBorderIcon className={styles["icon"]} />
            )
          }
          label={photo.likes}
          iconPosition='left'
          variant='transparent-button'
          onClick={() => setHasLiked((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default PhotoButtons;
