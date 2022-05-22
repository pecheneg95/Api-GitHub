import React from "react";

import StartPage from "./StartPage";
import Loader from "./Loader";
import UserNotFound from "./UserNotFound";
import ReposNotFound from "./ReposNotFound";
import UserInfo from "./UserInfo/UserInfo";
import ReposList from "./ReposList/ReposList";
import styles from "./MainPage.module.css";

function MainPage({
  isUserLoading,
  isReposLoading,
  parametersRequestUser,
  setUserReposPage,
  isInitial,
}) {
  const { userRepos, userInfo } = parametersRequestUser;

  if (isUserLoading) {
    return <Loader />;
  }

  if (isInitial) {
    return <StartPage />;
  }

  if (!userInfo) {
    return <UserNotFound />;
  }

  if (userInfo && userRepos) {
    
    return (
      <div className={styles.mainPage}>
        <UserInfo userInfo={userInfo} />
        <ReposList
          parametersRequestUser={parametersRequestUser}
          setUserReposPage={setUserReposPage}
          isReposLoading={isReposLoading}
        />
      </div>
    );
  }

  return (
    <div className={styles.mainPage}>
      <UserInfo userInfo={userInfo} />
      <ReposNotFound />
    </div>
  );
}

export default React.memo(MainPage);
