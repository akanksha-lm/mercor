import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ErrorPage from "../../components/ErrorPage";
import PhotoFeed from "./components/PhotoFeed";

const AllPhotosFeed = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const observer = useRef();
  const fetchedPages = useRef(new Set());

  const clientId = useSelector((state) => state.client.clientId);

  const fetchPhotos = useCallback(
    async (page) => {
      if (fetchedPages.current.has(page)) return;
      fetchedPages.current.add(page);

      try {
        setLoading(true);
        const response = await axios.get("https://api.unsplash.com/photos", {
          headers: {
            Authorization: `Client-ID ${clientId}`,
          },
          params: {
            per_page: 12,
            page: page,
          },
        });
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        setError(false); // Reset error state on successful fetch
      } catch (error) {
        console.error("Error fetching data from Unsplash", error);
        setError(true);
      }
      setLoading(false);
    },
    [clientId]
  );

  useEffect(() => {
    fetchPhotos(page);
  }, [page, fetchPhotos]);

  const lastPhotoElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
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

  if (error) {
    return <ErrorPage error='Error fetching data from Unsplash' />;
  }

  return (
    <PhotoFeed photos={photos} loading={loading} lastPhotoElementRef={lastPhotoElementRef} />
  );
};

export default AllPhotosFeed;
