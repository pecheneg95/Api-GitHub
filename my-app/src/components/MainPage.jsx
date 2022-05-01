import React from "react";
import ReactDOM from "react-dom";
import searchImg from "../assets/svg/search.svg";
import notFoundImg from "../assets/svg/Union.svg";

function MainPage(props) {
  if (props.params.isStart === true) {
    return (
      <div className="main-page">
        <div className="start-message">
          <img src={searchImg}></img>
          <p className="message">Start with searching a GitHub user</p>
        </div>
      </div>
    );
  }
  if (!props.params.userInfo) {
    return (
      <div className="main-page">
        <div className="union-message">
          <img src={notFoundImg}></img>
          <p className="message">User not found</p>
        </div>
      </div>
    );
  }
  if (props.params.userInfo) {
    if (props.isRepoFound) {
      return <div className="main-page"></div>;
    }

    return <div className="main-page"></div>;
  }
}

export default MainPage;
