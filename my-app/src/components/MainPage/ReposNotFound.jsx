import React, { useState } from "react";
import ReactDOM from "react-dom";
import reposNotFoundImg from "../../assets/svg/reposNotFound.svg";
import styles from "./MainPage.module.css";

function ReposNotFound() {
  return (
    <div className={styles.reposNotFound}>
      <div className={styles.emptyStateMessage}>
        <img src={reposNotFoundImg}></img>
        <p className={styles.message}>Repository list is empty</p>
      </div>
    </div>
  );
}
export default ReposNotFound;