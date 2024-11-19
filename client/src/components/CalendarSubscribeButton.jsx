

//THIS IS OUTDATED CODE AND SHOULD ONLY BE USED TO TAKE ICONS FROM THEN DELETE THE COMPONENT



/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";

const CalendarSubscribeButton = () => {
  const [saved, setSaved] = useState(false);

  const addSubscription = async () => {
    console.log("adding subscription to show");

    const userID = localStorage.getItem("userID");
    //temp vars
    //const userID = 1;
    const showID = 41428;
    //const showID = -5;

    const data = {userID, showID};

    try {
        const response = await axios.post("http://localhost:8080/api/userShows/subscribeToShow", data);
        console.log("Subscription response:", response.data);
        alert("success");
    }
    catch (error) {
        console.error("something went wrong while subscribing user to show.", error);
        alert("failure");
    }
  };

  return (
    <div>
      {saved ? (
        <FaRegCalendarCheck
          className="calendarSubscribeButton calendarSubscribeButtonFilled"
          size={40} onClick={addSubscription}
        />
      ) : (
        <FaRegCalendarTimes className="calendarSubscribeButton" size={40} onClick={addSubscription}/>
      )}
    </div>
  );
};

export default CalendarSubscribeButton;
