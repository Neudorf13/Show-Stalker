import "./Pages.css";
import Header from "../components/Header";
import axios from "axios";
import CalendarSubscribeButton from "../components/CalendarSubscribeButton";
import LinkCalendarButton from "../components/LinkCalendarButton";
import { getBaseURL } from "../config/config";

const baseURL = getBaseURL();

const Calendar = () => {

  //take users shows and search for upcoming episodes
  const findUpcomingEpisodes = async (showID) => {
    console.log("finding upcoming episodes...");

    try {
      const url = `https://api.tvmaze.com/shows/${showID}/episodes`;
      const response = await axios.get(url);
      console.log(response);
      const episodes = response.data;
      console.log(episodes);

      const today = new Date();
      console.log(today);

      const upcomingEpisodes = episodes.filter(episode => {
        const airdate = new Date(episode.airdate);
        return airdate >= today;
    });

    console.log(upcomingEpisodes);


    } catch (error) {
      console.error("Something went wrong while searching for upcoming episodes", error);
    }
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
        `${baseURL}/api/calendar/createEvent`,
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
      <LinkCalendarButton/>

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

      <button onClick={() => findUpcomingEpisodes(69603)}>Find episodes for show!</button>
    </div>
  );
};

export default Calendar;
