import React from "react";
import ReactDOM from "react-dom";
import img from "../assets/svg/search.svg";

function MainPage(props) {
  return (
    <div className="main-page">
      <div class="start-message">
        <img src={img}></img>
        <p className="message">Start with searching a GitHub user</p>
      </div>
    </div>
  );
}

export default MainPage;
