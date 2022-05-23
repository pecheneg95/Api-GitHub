import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";

import iconFollowing from "../../../assets/svg/person.svg";
import iconFollowers from "../../../assets/svg/shared.svg";
import styles from "./UserInfo.module.css";

function UserInfo({ userInfo }) {
  return (
    <div className={styles.userInfo}>
      <img className={styles.avatar} src={userInfo.avatar_url} alt="user avatar" />
      <div className={styles.userTextContent}>
        <p className={styles.userName}>{userInfo.name}</p>
        <a className={styles.userLink} href={userInfo.html_url} target="_blank">
          {userInfo.login}
        </a>
        <div className={styles.follow}>
          <div className={styles.followers}>
            <img className={styles.followIcon} src={iconFollowers} alt="icon followers" />
            <p className={styles.followText}>
              {abbreviateNumber(userInfo.followers, 1)} followers
            </p>
          </div>
          <div className={styles.following}>
            <img className={styles.followIcon} src={iconFollowing} alt="icon following"/>
            <p className={styles.followText}>
              {abbreviateNumber(userInfo.following, 1)} following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserInfo);
