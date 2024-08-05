import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import UserDetails from "./UserDetailsSection/UserDetails";
import PhotosNavSection from "./PhotosNavSection/PhotosNavSection";
import LoadingPage from "../../components/LoadingPage";
import ErrorPage from "../../components/ErrorPage";

import styles from "./style.module.css";

const UserProfile = () => {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const clientId = useSelector((state) => state.client.clientId);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/users/${username}`,
          {
            headers: {
              Authorization: `Client-ID ${clientId}`,
            },
          }
        );
        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username, clientId]);

  let returnContainer = null;
  if (loading) {
    returnContainer = <LoadingPage />;
  } else if (error) {
    returnContainer = <ErrorPage error={error} />;
  } else {
    returnContainer = (
      <>
        <UserDetails userDetails={userDetails} />
        <PhotosNavSection userDetails={userDetails} />
      </>
    );
  }

  return <div className={styles["profile-container"]}>{returnContainer}</div>;
};

export default UserProfile;
