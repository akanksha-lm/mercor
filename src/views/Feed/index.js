import React from "react";
import { useSelector } from "react-redux";
import SearchPhotosFeed from "./SearchPhotosFeed";
import AllPhotosFeed from "./AllPhotosFeed";

const Feed = () => {
  const shouldFetch = useSelector((state) => state.search.shouldFetch);

  return shouldFetch ? <SearchPhotosFeed /> : <AllPhotosFeed />;
};

export default Feed;
