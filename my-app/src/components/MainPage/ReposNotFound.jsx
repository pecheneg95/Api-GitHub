import React from "react";

import reposNotFoundImg from "../../assets/svg/reposNotFound.svg";
import styles from "./MainPage.module.css";

function ReposNotFound() {
  return (
    <div className={styles.reposNotFound}>
      <div className={styles.emptyStateMessage}>
        <img src={reposNotFoundImg} alt="repositories not found"></img>
        <p className={styles.message}>Repository list is empty</p>
      </div>
    </div>
  );
}
export default React.memo(ReposNotFound);
