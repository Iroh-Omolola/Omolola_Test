import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../css/search.css";
const SearchBar = ({ onChange }) => {
  return (
    <div class="wrapper">
      <div className="search-container">
        <AiOutlineSearch className="search-icon" />
        <input
          type="search"
          placeholder="Search your data here"
          onChange={onChange}
          class="search-input"
        />
      </div>
    </div>
  );
};
export default SearchBar;
