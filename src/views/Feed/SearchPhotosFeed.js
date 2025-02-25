import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ErrorPage from "../../components/ErrorPage";
import PhotoFeed from "./components/PhotoFeed";
import { setRemainingRequests } from "../../store/clientSlice";

const SearchPhotosFeed = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const observer = useRef();
  const fetchedPages = useRef(new Set());

  const clientId = useSelector((state) => state.client.clientId);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const dispatch = useDispatch();

  const fetchPhotos = useCallback(
    async (page) => {
      if (fetchedPages.current.has(page)) return;
      fetchedPages.current.add(page);

      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            headers: {
              Authorization: `Client-ID ${clientId}`,
            },
            params: {
              query: searchQuery,
              per_page: 12,
              page: page,
            },
          }
        );
        // Update remaining requests in the Redux store
        const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
        dispatch(setRemainingRequests(rateLimitRemaining));

        setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
      } catch (error) {
        console.error("Error fetching data from Unsplash", error);
        setError(true);
      }
      setLoading(false);
    },
    [clientId, searchQuery, dispatch]
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
    <PhotoFeed
      photos={photos}
      loading={loading}
      lastPhotoElementRef={lastPhotoElementRef}
    />
  );
};

export default SearchPhotosFeed;
