import React, {useState} from "react";
import ReactDOM from "react-dom";
import logo from "../assets/svg/gitHub-logo.svg";

function SearchLine(props) {

  const [search, setSearch] = useState('');

  const doSearch = (event) => {
    if (props.onSearch) {
      props.onSearch(event.target.value)
    }
    setSearch(event.target.value) 
  }

  return (
    <div className="search-line-block">
      <img src={logo} alt="logo" />
      <div className="search-line">
        <input
          type="search"
          className="search"
          autoComplete="off"
          placeholder="Enter GitHub username"
          value={search}
          onChange={doSearch}
        />
      </div>
    </div>
  );
}

export default SearchLine;
