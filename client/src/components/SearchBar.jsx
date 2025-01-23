//SearchBar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SearchBar.css';
import { getBaseURL } from "../config/config";

const baseURL = getBaseURL();

import { FcSearch } from "react-icons/fc";

const SearchBar = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    //Form submisions automatically refresh the page
    //Calling prevent default prevents this behavior
    //This allows for things like API requests to not have to refresh the page
    e.preventDefault();

    axios
      .post(`${baseURL}/api/shows/search`, { text })
      .then((response) => {
        console.log(response.data);

        navigate("/searchResults", {
          state: { searchResults: response.data.shows },
        });
      })
      .catch((error) => {
        console.error("Error performing search operation", error.message);
        alert("An error occurred during the search. Please try again.");
      });
  };

  return (

    <form onSubmit={handleSubmit} className="searchForm">
      <input
        type="text"
        className="searchInput"
        value={text}
        onChange={handleTextChange}
        placeholder="Search"
      />
      <button type="submit" className='searchButton'><FcSearch size={24} /></button>
    </form>
  );
};

export default SearchBar;
