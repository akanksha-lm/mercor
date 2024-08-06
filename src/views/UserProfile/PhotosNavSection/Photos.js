import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NoData from "../../../components/NoData";
import PhotoButtons from "../../../components/PhotoButtons";
import LoadingPage from "../../../components/LoadingPage";
import ErrorPage from "../../../components/ErrorPage";
import { setRemainingRequests } from "../../../store/clientSlice";

import styles from "./Photos.module.css";

const Photos = ({ item }) => {
  const { username } = useParams();
  const clientId = useSelector((state) => state.client.clientId);
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Add state to track if more data is available
  const observer = useRef();
  const fetchedPages = useRef(new Set());

  const fetchUrl = item === "allPhotos" ? "photos" : "likes";

  useEffect(() => {
    const fetchPhotos = async (page) => {
      if (fetchedPages.current.has(page) || !hasMore) return;
      fetchedPages.current.add(page);

      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/users/${username}/${fetchUrl}`,
          {
            params: {
              per_page: 12,
              page: page,
            },
            headers: {
              Authorization: `Client-ID ${clientId}`,
            },
          }
        );
        // Update remaining requests in the Redux store
        const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
        dispatch(setRemainingRequests(rateLimitRemaining));

        if (response.data.length === 0) {
          setHasMore(false); // No more data available
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchPhotos(page);
  }, [page, username, fetchUrl, clientId, hasMore, dispatch]);

  useEffect(() => {
    // Reset state when item changes
    setPhotos([]);
    setPage(1);
    setHasMore(true); // Reset hasMore state
    fetchedPages.current.clear();
  }, [item]);

  const lastPhotoElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  if (error) {
    return <ErrorPage />;
  }
  if (!loading && photos.length === 0) {
    return <NoData message='Nothing here!!' />;
  }
  return (
    <div className={styles["photos-grid"]}>
      {photos.map((photo, index) => {
        const content = (
          <>
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className={styles["main-image"]}
            />
            <PhotoButtons photo={photo} />
          </>
        );
        if (photos.length === index + 1) {
          return (
            <div
              key={photo.id}
              className={styles["photo-item"]}
              ref={lastPhotoElementRef}
            >
              {content}
            </div>
          );
        } else {
          return (
            <div key={photo.id} className={styles["photo-item"]}>
              {content}
            </div>
          );
        }
      })}
      {loading && <LoadingPage className={styles["loading-page"]} />}
    </div>
  );
};

export default Photos;
