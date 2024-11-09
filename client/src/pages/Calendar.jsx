import "./Pages.css";
import Header from "../components/Header";
import axios from "axios";
import CalendarSubscribeButton from "../components/CalendarSubscribeButton";

const Calendar = () => {
  //TODO: fix uri+clientID
  const redirect_uri = "http://localhost:8080/api/calendar/oauth2/callback"; //DEVELOPMENT
  const clientID =
    "953851801147-s168o6tbd5813rn707m44pqmncf51c20.apps.googleusercontent.com"; //TODO
  const scope = "https://www.googleapis.com/auth/calendar";
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  const handleLinkClick = () => {
    // Redirect to the Google OAuth URL
    window.location.href = googleAuthUrl;
  };

  const createEvent = async () => {
    //call backend route
    try {
      console.log("tstst");

      const title = document.getElementById("title").value;
      const date = document.getElementById("date").value; // Expected in "YYYY-MM-DD"
      const startTime = document.getElementById("startTime").value; // Expected in "HH:MM"
      const endTime = document.getElementById("endTime").value; // Expected in "HH:MM"

      // Convert date and times to ISO format required by Google Calendar
      const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
      const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

      const eventData = {
        summary: title,
        start: {
          dateTime: startDateTime,
          timeZone: "America/Chicago", // Adjust to your local time zone
        },
        end: {
          dateTime: endDateTime,
          timeZone: "America/Chicago", // Adjust to your local time zone
        },
      };

      console.log(eventData);

      // Call backend route to create event
      const response = await axios.post(
        "http://localhost:8080/api/calendar/createEvent",
        eventData
      );

      if (response.status === 200) {
        alert("Event created successfully!");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("error creating event.", error);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="pageTitle">Link your Google Calendar</h1>
      <button onClick={handleLinkClick}>Link Google Calendar</button>

      <br />

      <form action="">
        <label htmlFor="title">Event: </label>
        <input type="text" id="title" required />

        <label htmlFor="date">Date: </label>
        <input type="text" id="date" required />

        <label htmlFor="startTime">Start Time: </label>
        <input type="text" id="startTime" required />

        <label htmlFor="endTime">End Time: </label>
        <input type="text" id="endTime" required />

        <button type="button" onClick={createEvent}>
          Create Event
        </button>
      </form>

      <CalendarSubscribeButton/>
    </div>
  );
};

export default Calendar;
