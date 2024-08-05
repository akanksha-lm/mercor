import React, { forwardRef } from "react";

import PhotoButtons from "../../../components/PhotoButtons";
import styles from "./PictureCard.module.css";

const PictureCard = forwardRef(({ photo }, ref) => {
  return (
    <div key={photo.id} className={styles["photo-card"]} ref={ref}>
      <img
        src={photo.urls.small}
        alt={photo.description}
        className={styles["main-image"]}
      />
      <PhotoButtons photo={photo} />
    </div>
  );
});

export default PictureCard;
