import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import PictureCard from "./components/PictureCard";
import NoData from "../../components/NoData";
import { setShouldFetch } from "../../store/searchSlice";

import styles from "./style.module.css";

const Feed = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const fetchedPages = useRef(new Set());

  const clientId = useSelector((state) => state.client.clientId);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const shouldFetch = useSelector((state) => state.search.shouldFetch);
  const dispatch = useDispatch();

  const fetchPhotos = useCallback(
    async (page) => {
      if (fetchedPages.current.has(page)) return;
      fetchedPages.current.add(page);

      try {
        let response;
        if (!searchQuery) {
          response = await axios.get("https://api.unsplash.com/photos", {
            headers: {
              Authorization: `Client-ID ${clientId}`,
            },
            params: {
              per_page: 12,
              page: page,
            },
          });
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        } else {
          response = await axios.get("https://api.unsplash.com/search/photos", {
            headers: {
              Authorization: `Client-ID ${clientId}`,
            },
            params: {
              query: searchQuery,
              per_page: 12,
              page: page,
            },
          });
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
        }

        dispatch(setShouldFetch(false));
      } catch (error) {
        console.error("Error fetching data from Unsplash", error);
      }
    },
    [clientId, searchQuery, dispatch]
  );
  useEffect(() => {
    setPhotos([]);
    fetchedPages.current.clear();
    setPage(1);
    fetchPhotos(1);
  }, [shouldFetch, fetchPhotos]);

  useEffect(() => {
    if (page > 1) {
      fetchPhotos(page);
    }
  }, [page, fetchPhotos]);

  const lastPhotoElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Last photo is intersecting, fetching next page");
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return photos.length === 0 ? (
    <NoData message='No photos found' />
  ) : (
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
      </div>
    </div>
  );
};

export default Feed;
