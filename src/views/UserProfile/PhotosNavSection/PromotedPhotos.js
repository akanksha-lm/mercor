import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NoData from "../../../components/NoData";
import PhotoButtons from "../../../components/PhotoButtons";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";
import { setRemainingRequests } from "../../../store/clientSlice";

import styles from "./Photos.module.css";

const PromotedPhotos = () => {
  const { username } = useParams();
  const clientId = useSelector((state) => state.client.clientId);
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/users/${username}/photos`,
          {
            params: {
              per_page: 100,
              page: 1,
            },
            headers: {
              Authorization: `Client-ID ${clientId}`,
            },
          }
        );

        // Update remaining requests in the Redux store
        const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
        dispatch(setRemainingRequests(rateLimitRemaining));

        const promotedPhotos = response.data.filter(
          (photo) => photo.promoted_at !== null
        );
        setPhotos(promotedPhotos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [username, clientId, dispatch]);

  if (error) {
    return <ErrorPage />;
  }

  if (!loading && photos.length === 0) {
    return <NoData message='Nothing here!!' />;
  }

  return (
    <div className={styles["photos-grid"]}>
      {photos.map((photo) => {
        return (
          <div key={photo.id} className={styles["photo-item"]}>
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className={styles["main-image"]}
            />
            <PhotoButtons photo={photo} />
          </div>
        );
      })}
      {loading && <LoadingPage className={styles["loading-page"]} />}
    </div>
  );
};

export default PromotedPhotos;
