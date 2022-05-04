import React from "react";
import ReactDOM from "react-dom";
import styles from "./MainPage.module.css";

function Loader() {
  return (
<div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
  </div>
  );
}
export default Loader;