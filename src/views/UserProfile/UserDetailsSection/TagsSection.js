import React from "react";
import styles from "./TagsSection.module.css";

const TagsSection = ({ tagsList }) => {
  const getListItem = (tag, id) => {
    return (
      <li key={id} className={styles["list-item"]}>
        {tag}
      </li>
    );
  };
  return (
    <div className={styles["tags-section"]}>
      <p className={styles["heading"]}>Interests</p>
      <ul className={styles["tags-list"]}>
        {tagsList.map((tag, index) => getListItem(tag, index))}
      </ul>
    </div>
  );
};

export default TagsSection;
