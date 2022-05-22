import React from "react";

import styles from "./MainPage.module.css";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}
export default React.memo(Loader);
