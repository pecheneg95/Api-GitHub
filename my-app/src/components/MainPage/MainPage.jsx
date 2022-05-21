import React from "react";
import ReactDOM from "react-dom";
import { Suspense } from "react";
import StartPage from "./StartPage";
import Loader from "./Loader";
import UserNotFound from "./UserNotFound";
import ReposNotFound from "./ReposNotFound";
import UserInfo from "./UserInfo/UserInfo";
import ReposList from "./ReposList/ReposList";
import styles from "./MainPage.module.css";

function MainPage({isUserLoading, isReposLoading, parametrsRequestUser, setUserReposPage, isInitial}) {
  if (isUserLoading) {
    return <Loader />;
  }
  if (isInitial) {
    return <StartPage />;
  }
  if (!parametrsRequestUser.userInfo) {
    return <UserNotFound />;
  }
  if (parametrsRequestUser.userInfo) {
    if (parametrsRequestUser.userRepos) {
      return (
        <div className={styles.mainPage}>
          <UserInfo userInfo={parametrsRequestUser.userInfo} />
          <ReposList
            parametrsRequestUser={parametrsRequestUser}
            setUserReposPage={setUserReposPage}
            isReposLoading={isReposLoading}
          />
        </div>
      );
    }
    if (!parametrsRequestUser.userRepos) {
      return (
        <div className={styles.mainPage}>
          <UserInfo userInfo={parametrsRequestUser.userInfo} />
          <ReposNotFound />
        </div>
      );
    }
    return;
  }
}

export default React.memo(MainPage);
