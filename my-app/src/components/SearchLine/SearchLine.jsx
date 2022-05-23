import React, { useState, useCallback } from "react";

import logo from "../../assets/svg/gitHub-logo.svg";
import styles from "./SearchLine.module.css";

const SearchLine = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const doSearch = useCallback(
    (event) => {
      if (event.key === "Enter" && onSearch) {
        onSearch(event.target.value);
      }
    },
    [onSearch]
  );

  const setValue = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  return (
    <div className={styles.searchLineBlock}>
      <img src={logo} alt="logo GitHub" />
      <div className={styles.searchLine}>
        <input
          type="search"
          className={styles.search}
          autoComplete="off"
          placeholder="Enter GitHub username"
          value={search}
          onChange={setValue}
          onKeyPress={doSearch}
        />
      </div>
    </div>
  );
};

export default React.memo(SearchLine);
