//SearchBar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      .post("http://localhost:8080/api/search", { text })
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

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchInput"
        value={text}
        onChange={handleTextChange}
        placeholder="search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
