import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { getBaseURL } from "../config/config";

const baseURL = getBaseURL();

const SubscribeToShowButton = ({ id }) => {
  const [subscribed, setSubscribed] = useState(false);

  //check if user is already subscribed
  useEffect(() => {
    const savedShows = localStorage.getItem("savedShows");
    if (savedShows) {
      const shows = JSON.parse(savedShows); // Parse the JSON string into an array
      const isSubscribed = shows.some(
        (show) => show.showID === id && show.subscribed === 1
      );

      if (isSubscribed) {
        console.log(`Show with ID ${id} is subscribed.`);
        setSubscribed(true);
      } else {
        console.log(`Show with ID ${id} is not subscribed.`);
      }
    }

  }, []);

  const handleAction = () => {
    if (subscribed) {
      unsubscribeToShow();
    } else {
      subscribeToShow();
    }
  };

  const subscribeToShow = async () => {
    console.log("subscribing to show.");

    try {
      const url = `${baseURL}/api/userShows/subscribeToShow`;
      const userID = localStorage.getItem("userID");
      const showID = id;
      const data = { userID, showID };

      const response = await axios.post(url, data);
      console.log(response);
      setSubscribed(true);

    } catch (error) {
      console.error("Something went wrong while subscribing to show.", error);
    }
  };

  const unsubscribeToShow = () => {
    console.log("unsubscribing to show.");
    setSubscribed(false);
  };



  return (
    <div>
      <button onClick={handleAction}>
        {subscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
};

SubscribeToShowButton.propTypes = {
  id: PropTypes.number,
};

export default SubscribeToShowButton;
