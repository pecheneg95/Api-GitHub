import React from "react";
import ReactDOM from "react-dom";

import StartPage from "./StartPage";
import UserNotFound from "./UserNotFound";
import ReposNotFound from "./ReposNotFound";
import UserInfo from "./UserInfo/UserInfo";
import ReposList from "./ReposList/ReposList";
import styles from "./MainPage.module.css";

function MainPage(props) {
  if (props.params.isStart === true) {
    return <StartPage />;
  }
  if (!props.params.userInfo) {
    return <UserNotFound />;
  }
  if (props.params.userInfo) {
    if (props.params.userRepos) {
      return (
        <div className={styles.mainPage}>
          <UserInfo params={props.params} />;
          <ReposList params={props.params} setUserReposPage={props.setUserReposPage} />
        </div>
      );
    }
    if (!props.params.userRepos) {
      return (
        <div className={styles.mainPage}>
          <UserInfo params={props.params} />;
          <ReposNotFound />
        </div>
      );
    }
    return;
  }
}

export default MainPage;
