import React, { useState } from "react";
import ReactDOM from "react-dom";
import iconFollowing from "../../../assets/svg/person.svg";
import iconFollowers from "../../../assets/svg/shared.svg";
import styles from "./UserInfo.module.css";
import { abbreviateNumber } from "js-abbreviation-number";

function UserInfo(props) {
  return (
    <div className={styles.userInfo}>
      <img className={styles.avatar} src={props.params.userInfo.avatar_url} />
      <div className={styles.userTextContent}>
        <p className={styles.userName}>{props.params.userInfo.name}</p>
        <a
          className={styles.userLink}
          href={props.params.userInfo.html_url}
          target="_blank"
        >
          {props.params.userInfo.login}
        </a>
        <div className={styles.follow}>
          <div className={styles.followers}>
            <img className={styles.followIcon} src={iconFollowers} />
            <p className={styles.followText}>
              {abbreviateNumber(props.params.userInfo.followers, 1)} followers
            </p>
          </div>
          <div className={styles.following}>
            <img className={styles.followIcon} src={iconFollowing} />
            <p className={styles.followText}>
              {abbreviateNumber(props.params.userInfo.following, 1)} following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
