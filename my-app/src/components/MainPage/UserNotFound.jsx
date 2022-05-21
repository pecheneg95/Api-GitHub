import React, { useState } from "react";
import ReactDOM from "react-dom";
import unionImg from "../../assets/svg/Union.svg";
import styles from "./MainPage.module.css";

function UserNotFound () {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateMessage}>
        <img src={unionImg}></img>
        <p className={styles.message}>User not found</p>
      </div>
    </div>
  );
}
export default React.memo(UserNotFound);
