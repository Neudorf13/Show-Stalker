import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./ShowCard.css";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthContext";
import { GoHeart, GoHeartFill } from "react-icons/go";

const AddShowButton = ({ id, name, rating, img }) => {
  const { userID } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const localShows = JSON.parse(localStorage.getItem("savedShows")) || [];
    const showExists = localShows.some((show) => show.showID === id); // Check if showID exists in savedShows
    setIsSaved(showExists); // Set state based on whether the show exists or not
  }, [id]);

  const addShow = () => {
    console.log("show added button pressed!");
    console.log("show name: " + name + " id: " + id);

    const showData = {
      userID: userID,
      showID: id,
      showName: name,
      showRating: rating,
      showImage: img,
    };

    return axios
      .post("http://localhost:8080/api/shows/addUserShow", showData)
      .then((response) => {
        console.log(response.data.message);

        let localShows = JSON.parse(localStorage.getItem("savedShows")) || [];
        console.log(localShows);

        const tempShow = {
          showID: id,
          showName: name,
          showRating: rating,
          showImage: img,
        };

        localShows.push(tempShow);

        localStorage.setItem("savedShows", JSON.stringify(localShows));

        //set the show as saved => render filled heart icon
        setIsSaved(true);
        alert("show added!");
      })
      .catch((error) => {
        console.error("Error adding show to user list", error.message);
        alert("An error occurred while adding the show. Please try again.");
      });
  };

  const deleteShow = () => {
    console.log("delete show button clicked!");

    const showData = {
      userID: userID,
      showID: id,
    };

    return axios
      .post("http://localhost:8080/api/shows/deleteUserShow", showData)
      .then((response) => {
        console.log(response.data.message);

        // Retrieve the current savedShows array from localStorage
        let localShows = JSON.parse(localStorage.getItem("savedShows")) || [];
        console.log(localShows);

        // Filter out the show with the specific showID
        const updatedShows = localShows.filter((show) => show.showID !== id);

        // Update the savedShows array in localStorage with the new filtered array
        localStorage.setItem("savedShows", JSON.stringify(updatedShows));

        console.log("Show removed from savedShows");

        setIsSaved(false);
        alert("show removed!");
      })
      .catch((error) => {
        console.error("Error removing show from user list", error.message);
        alert("An error occurred while removing the show. Please try again.");
      });
  };

  return (
    <div>
      {isSaved ? (
        <GoHeartFill className="addShowButton" size={40} onClick={deleteShow} />
      ) : (
        <GoHeart className="addShowButton" size={40} onClick={addShow} />
      )}
    </div>
  );
};

AddShowButton.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  rating: PropTypes.number,
  img: PropTypes.string,
};

export default AddShowButton;
