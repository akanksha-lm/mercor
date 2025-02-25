import React, { useState, useEffect } from "react";
import Photos from "./Photos";
import PromotedPhotos from "./PromotedPhotos";
import Pill from "../../../components/Pill";
import UserDetails from "../UserDetailsSection/UserDetails";

import styles from "./PhotosNavSection.module.css";

const PhotosNavSection = ({ userDetails }) => {
  const [activeTab, setActiveTab] = useState("Photos");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Photos":
        return <Photos item='allPhotos' />;
      case "Promoted Photos":
        return <PromotedPhotos userDetails={userDetails} />;
      case "Liked Photos":
        return <Photos item='likes' />;
      case "User Details":
        return <UserDetails userDetails={userDetails} />;
      default:
        return null;
    }
  };

  const navBarButtons = [
    {
      name: "User Details",
      id: 1,
    },
    { name: "Photos", id: 2, photoCount: userDetails.total_photos },
    {
      name: "Promoted Photos",
      id: 3,
      photoCount: userDetails.total_promoted_photos,
    },
    { name: "Liked Photos", id: 4 },
  ];

  return (
    <div className={styles["photos-nav-section"]}>
      <nav className={styles["nav-bar"]}>
        {navBarButtons.map((button) => {
          if (button.name === "User Details" && !isMobile) {
            return null;
          } else {
            return (
              <button
                key={button.id}
                className={activeTab === button.name ? styles["active"] : ""}
                onClick={() => setActiveTab(button.name)}
              >
                {button.name}
                {button.photoCount && (
                  <Pill
                    count={button.photoCount}
                    className={styles["pill-nav"]}
                    variant={
                      activeTab === button.name
                        ? "active-pill"
                        : "inactive-pill"
                    }
                  />
                )}
              </button>
            );
          }
        })}
      </nav>
      <div className={styles["content"]}>{renderContent()}</div>
    </div>
  );
};

export default PhotosNavSection;
