import React from "react";
import PictureCard from "./PictureCard";
import NoData from "../../../components/NoData";
import styles from "./PhotoFeed.module.css";
import LoadingPage from "../../../components/LoadingPage";

const PhotoFeed = ({ photos, loading, lastPhotoElementRef }) => {
  return (
    <div className={styles["feed-container"]}>
      <div className={styles["photo-feed"]}>
        {photos.map((photo, index) => {
          if (index === photos.length - 1) {
            return (
              <PictureCard
                ref={lastPhotoElementRef}
                key={photo.id}
                photo={photo}
              />
            );
          } else {
            return <PictureCard key={photo.id} photo={photo} />;
          }
        })}
        {loading && (
          <LoadingPage className={styles["loading-page"]} />
        )}
      </div>
      {photos.length === 0 && !loading && <NoData message='No photos found' />}
    </div>
  );
};

export default PhotoFeed;
