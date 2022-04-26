import React from "react";
import ReactDOM from "react-dom";
import searchImg from "../assets/svg/search.svg";
import notFoundImg from "../assets/svg/Union.svg";

function MainPage(props) {
  return (
      /* Стартовое состояние */
    <div className="main-page">
      <div className="start-message">
        <img src={searchImg}></img>
        <p className="message">Start with searching a GitHub user</p>
      </div>
    </div>
    
   /* User not found 
    <div className="main-page">
    <div class="union-message">
      <img src={notFoundImg}></img>
      <p className="message">User not found</p>
    </div>
  </div>
  */
  );
  
}

export default MainPage;
