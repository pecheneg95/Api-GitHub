import React, { useState, useCallback } from "react";
import axios from "axios";

import "./App.css";
import SearchLine from "./components/SearchLine/SearchLine.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import { REPOS_ON_PAGE } from "./constants.js";

function App() {
  const [parametersRequestUser, setparametersRequestUser] = useState({
    userInfo: null,
    userRepos: null,
    userReposPage: 1,
  });

  const [isInitial, setIsInitial] = useState(true);

  const [isUserLoading, setIsUserLoading] = useState(false);

  const [isReposLoading, setIsReposLoading] = useState(false);

  const setUserReposPage = useCallback(
    async (newNumberPage) => {
      setIsReposLoading(true);
      const userReposList = await axios.get(
        `https://api.github.com/users/${parametersRequestUser.userInfo.login}/repos`,
        {
          params: {
            per_page: REPOS_ON_PAGE,
            page: newNumberPage,
          },
        }
      );
      setparametersRequestUser({
        ...parametersRequestUser,
        userReposPage: newNumberPage,
        userRepos: userReposList,
      });
      setIsReposLoading(false);
    },
    [parametersRequestUser]
  );

  const onSearch = useCallback(
    async (newSearch) => {
      if (newSearch === "") {
        setIsInitial(true);
        setparametersRequestUser({
          userInfo: null,
          userRepos: null,
          userReposPage: null,
        });

        return;
      }

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
          setIsInitial(false);
          setparametersRequestUser({
            userInfo: result.data,
            userRepos: userReposList,
            userReposPage: 1,
          });
          setIsUserLoading(false);

          return;
        }

        if (result.data.public_repos === 0) {
          setIsInitial(false);
          setparametersRequestUser({
            userInfo: result.data,
            userRepos: null,
            userReposPage: null,
          });
          setIsUserLoading(false);
        }
      } catch (error) {
        console.log(error);

        setIsUserLoading(false);

        if (error.response.status === 404) {
          setIsInitial(false);
          setparametersRequestUser({
            userInfo: null,
            userRepos: null,
            userReposPage: null,
          });
        }
      }
    },
    [parametersRequestUser]
  );

  return (
    <div className="App">
      <SearchLine onSearch={onSearch} />
      <MainPage
        parametersRequestUser={parametersRequestUser}
        setUserReposPage={setUserReposPage}
        isUserLoading={isUserLoading}
        isReposLoading={isReposLoading}
        isInitial={isInitial}
      />
    </div>
  );
}

export default React.memo(App);
