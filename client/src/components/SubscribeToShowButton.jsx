import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const SubscribeToShowButton = ({ id }) => {
  const [subscribed, setSubscribed] = useState(false);

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
      const url = "http://localhost:8080/api/userShows/subscribeToShow";
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
