import React from "react";
import ReactDOM from "react-dom";
import searchImg from "../../assets/svg/search.svg";
import notFoundImg from "../../assets/svg/Union.svg";
import iconFollowing from "../../assets/svg/person.svg";
import iconFollowers from "../../assets/svg/shared.svg";
import styles from "./MainPage.module.css";
import { abbreviateNumber } from "js-abbreviation-number";

function MainPage(props) {
  if (props.params.isStart === true) {
    return (
      <div className={styles.mainPage + " " + styles.mainPageCenter}>
        <div className="start-message">
          <img src={searchImg}></img>
          <p className="message">Start with searching a GitHub user</p>
        </div>
      </div>
    );
  }
  if (!props.params.userInfo) {
    return (
      <div className={styles.mainPage + " " + styles.mainPageCenter}>
        <div className="union-message">
          <img src={notFoundImg}></img>
          <p className="message">User not found</p>
        </div>
      </div>
    );
  }
  if (props.params.userInfo) {
    if (props.params.userRepos) {
      const userReposList = props.params.userRepos.data;
      const listUserReposItem = userReposList.map((userReposList) => (
        <div className={styles.userReposItem}>
          <a
            className={styles.userReposItemName}
            href={userReposList.html_url}
            target="_blank"
          >
            {userReposList.name}
          </a>
          <p className={styles.userReposItemDescription}>
            {userReposList.description}
          </p>
        </div>
      ));

      return (
        <div className={styles.mainPage}>
          <div className={styles.userInfo}>
            <img
              className={styles.avatar}
              src={props.params.userInfo.avatar_url}
            />
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
                    {abbreviateNumber(props.params.userInfo.followers, 1)}{" "}
                    followers
                  </p>
                </div>
                <div className={styles.following}>
                  <img className={styles.followIcon} src={iconFollowing} />
                  <p className={styles.followText}>
                    {abbreviateNumber(props.params.userInfo.following, 1)}{" "}
                    following
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.userRepos}>
            <p className={styles.userInfoHeader}>
              Repositories (
              {abbreviateNumber(props.params.userRepos.data.length)})
            </p>
            <ul className={styles.userReposList}>{listUserReposItem}</ul>
          </div>
        </div>
      );
    }

    return <div className="main-page"></div>;
  }
}

export default MainPage;
