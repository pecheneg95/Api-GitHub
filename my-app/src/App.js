import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import axios from "axios";
import SearchLine from "./components/SearchLine/SearchLine.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";

import { REPOS_ON_PAGE } from "./constants.js";

function App() {
  const [parametrsRequestUser, setParametrsRequestUser] = useState({
    userInfo: null,
    userRepos: null,
    userReposPage: 1,
  });

  const [isInitial, setIsInitial] = useState({
    isInitial: true,
  });

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isReposLoading, setIsReposLoading] = useState(false);

  const setUserReposPage = useCallback(
    async (newNumberPage) => {
      setIsReposLoading(true);
      const userReposList = await axios.get(
        `https://api.github.com/users/${parametrsRequestUser.userInfo.login}/repos`,
        {
          params: {
            per_page: REPOS_ON_PAGE,
            page: newNumberPage,
          },
        }
      );
      setParametrsRequestUser({
        ...parametrsRequestUser,
        userReposPage: newNumberPage,
        userRepos: userReposList,
      });
      setIsReposLoading(false);
    },
    [REPOS_ON_PAGE, parametrsRequestUser]
  );

  const onSearch = async (newSearch) => {
    try {
      setIsUserLoading(true);
      const result = await axios.get(
        `https://api.github.com/users/${newSearch}`
      );

      if (result.data.public_repos > 0) {
        const userReposList = await axios.get(
          `https://api.github.com/users/${newSearch}/repos`,
          {
            params: {
              per_page: REPOS_ON_PAGE,
              page: 1,
            },
          }
        );
        setIsInitial({
          isInitial: false,
        });
        setParametrsRequestUser({
          ...parametrsRequestUser,
          userInfo: result.data,
          userRepos: userReposList,
          userReposPage: 1,
        });
        setIsUserLoading(false);
        return;
      }
      if (result.data.public_repos === 0) {
        setIsInitial({
          isInitial: false,
        });
        setParametrsRequestUser({
          userInfo: result.data,
          userRepos: null,
          userReposPage: null,
        });
        setIsUserLoading(false);
      }
    } catch (error) {
      setIsUserLoading(false);
      console.log(error);
      if (error.response.status === 404) {
        setIsInitial({
          isInitial: false,
        });
        setParametrsRequestUser({
          userInfo: null,
          userRepos: null,
          userReposPage: null,
        });
        if (newSearch === "") {
          setIsInitial({
            isInitial: true,
          });
          setParametrsRequestUser({
            userInfo: null,
            userRepos: null,
            userReposPage: null,
          });
        }
        return;
      }
    }
  };
  return (
    <div className="App">
      <SearchLine onSearch={onSearch} />
      <MainPage
        parametrsRequestUser={parametrsRequestUser}
        setUserReposPage={setUserReposPage}
        isUserLoading={isUserLoading}
        isReposLoading={isReposLoading}
        isInitial={isInitial.isInitial}
      />
    </div>
  );
}

export default React.memo(App);
