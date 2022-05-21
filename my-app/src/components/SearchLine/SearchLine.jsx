import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import logo from "../../assets/svg/gitHub-logo.svg";
import styles from "./SearchLine.module.css";

const SearchLine = (props) => {
  const [search, setSearch] = useState("");

  const doSearch = useCallback(
    (event) => {
      if (event.key === "Enter" && props.onSearch) {
        props.onSearch(event.target.value);
      }
    },
    [props.onSearch]
  );
  const setValue = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  return (
    <div className={styles.searchLineBlock}>
      <img src={logo} alt="logo" />
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
