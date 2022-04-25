import React from "react";
import ReactDOM from "react-dom";
import logo from "../assets/svg/gitHub-logo.svg";

function SearchLine() {
  return (
    <div className="search-line-block">
      <img src={logo} alt="logo" />
      <div class="search-line">
        <input
          type="search"
          class="search"
          autocomplete="off"
          placeholder="Enter GitHub username"
        />
      </div>
    </div>
  );
}

export default SearchLine;
