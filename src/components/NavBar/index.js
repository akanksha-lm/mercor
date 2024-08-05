import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  updateSearchQuery,
  setShouldFetch,
  clearSearch,
} from "../../store/searchSlice";

import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./style.module.css";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    dispatch(updateSearchQuery(searchTerm));
    dispatch(setShouldFetch(true));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleHomeClick = () => {
    setSearchTerm("");
    dispatch(clearSearch());
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles["nav-list"]}>
        <li className={styles["logo-container"]}>
          <Link to='/home' onClick={handleHomeClick}>
            <img src={logo} alt='Logo' className={styles.logo} />
          </Link>
        </li>
        {location.pathname === "/home" && (
          <li className={styles["search-div"]}>
            <div className={styles["search-bar"]}>
              <button
                onClick={handleSearch}
                className={styles["search-button"]}
              >
                <SearchIcon />
              </button>
              <input
                type='text'
                placeholder='Search Photos...'
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles["search-input"]}
                onKeyPress={handleKeyPress}
              />
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
