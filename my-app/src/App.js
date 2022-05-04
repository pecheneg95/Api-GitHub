import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import SearchLine from "./components/SearchLine/SearchLine.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";

import { REPOS_ON_PAGE } from "./constants.js";

function App() {
  const [parametrsRequestUser, setParametrsRequestUser] = useState({
    isStart: true,
    userInfo: null,
    userRepos: null,
    userReposPage: 1,
  });

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isReposLoading, setIsReposLoading] = useState(false);

  const setUserReposPage = async (newNumberPage) => {
    setIsReposLoading(true);
    console.log(isReposLoading);
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
    console.log(isReposLoading);
  };

  const onSearch = async (newSearch) => {
    try {
      setIsUserLoading(true);
      console.log(isUserLoading);
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
        setParametrsRequestUser({
          ...parametrsRequestUser,
          isStart: false,
          userInfo: result.data,
          userRepos: userReposList,
          userReposPage: 1,
        });
        setIsUserLoading(false);
        console.log(isUserLoading);
        return;
      }
      if (result.data.public_repos === 0) {
        setParametrsRequestUser({
          isStart: false,
          userInfo: result.data,
          userRepos: null,
          userReposPage: null,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setParametrsRequestUser({
          isStart: false,
          userInfo: null,
          userRepos: null,
          userReposPage: null,
        });
        if (newSearch === "") {
          setParametrsRequestUser({
            isStart: true,
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
        params={parametrsRequestUser}
        setUserReposPage={setUserReposPage}
        isUserLoading={isUserLoading}
        isReposLoading={isReposLoading}
      />
    </div>
  );
}

export default App;
