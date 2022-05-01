import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import SearchLine from "./components/SearchLine.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";

function App() {
  const [parametrsRequestUser, setParametrsRequestUser] = useState({
    isStart: true,
    userInfo: null,
    userRepos: null,
  });

  const onSearch = async (newSearch) => {
    try {
      const result = await axios.get(
        `https://api.github.com/users/${newSearch}`
      );

      if (result.data.public_repos > 0) {
        const userReposList = await axios.get(
          `https://api.github.com/users/${result.data.login}/repos`
        );
        setParametrsRequestUser({
          isStart: false,
          userInfo: result.data,
          userRepos: userReposList,
        });
        return;
      }

      setParametrsRequestUser({
        isStart: false,
        userInfo: result.data,
        userRepos: null,
      });
    } catch (error) {
      if (error.response.status === 404) {
        setParametrsRequestUser({
          isStart: false,
          userInfo: null,
          userRepos: null,
        });
        if (newSearch === "") {
          setParametrsRequestUser({
            isStart: true,
            userInfo: null,
            userRepos: null,
          });
        }
        return;
      }
      console.log(error);
      console.log("Unknown error");
    }
  };
  return (
    <div className="App">
      <SearchLine onSearch={onSearch} />
      <MainPage params={parametrsRequestUser} />
    </div>
  );
}

export default App;
