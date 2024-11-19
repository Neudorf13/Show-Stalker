//userShowService.js
const db = require("../db");
const axios = require("axios");
const { backendAddCalendarEvent } = require("./calendarService");

const subscribeUserToShow = (userID, showID) => {
  console.log("userID: " + userID + " showID: " + showID);
  const query = `UPDATE userShows SET subscribed = true WHERE userID = ? AND showID = ?`;

  return new Promise((resolve, reject) => {
    db.run(query, [userID, showID], function (error) {
      if (error) {
        console.error(
          `Failed to subscribe user ${userID} to show ${showID}:`,
          error
        );
        return reject(error);
      }
      console.log("Changes made:", this.changes);
      if (this.changes > 0) {
        console.log("At least one change");
      } else {
        console.log("No changes");
      }
      resolve(this);
    });
  });
};

const fetchUpcomingEpisodes = async (showID) => {
  try {
    const url = `https://api.tvmaze.com/shows/${showID}/episodes`;
    const response = await axios.get(url);

    const episodes = response.data;
    console.log(episodes);

    const today = new Date();

    const upcomingEpisodes = episodes.filter((episode) => {
      const airdate = new Date(episode.airdate);
      return airdate >= today;
    });

    console.log(upcomingEpisodes);

    return upcomingEpisodes;
  } catch (error) {
    console.error(
      "Something went wrong while searching for upcoming episodes",
      error
    );
  }
};

const createCalendarEvents = async (userID, episodes) => {
  let eventsCreated = 0;

  for (const episode of episodes) {
    console.log("printing episode:");
    console.log(episode);

    const showName = episode._links.show.name;
    const episodeName = episode.name;
    const season = episode.season;
    const episodeNumber = episode.number;

    const title =
      showName + " (S" + season + "E" + episodeNumber + ") - " + episodeName;
    console.log(title);

    const date = episode.airdate;
    const airTime = episode.airtime; //check if its empty or not

    const eventData = {
      summary: title,
      start: { date },
      end: { date },
    };

    let result;
    result = await backendAddCalendarEvent(userID, eventData);

    if (result.success) {
      console.log("Event created");
      eventsCreated++;
    } else {
      console.log("Event not created");
    }
    //CALL CREATE EVENT FUNCTION FROM CALENDAR SERVICE CLASS

    // const eventData = {
    //     summary: title,
    //     start: {
    //       dateTime: startDateTime,
    //       timeZone: "America/Chicago", // Adjust to your local time zone
    //     },
    //     end: {
    //       dateTime: endDateTime,
    //       timeZone: "America/Chicago", // Adjust to your local time zone
    //     },
    //   };
  }

  return eventsCreated;
  //return number of events created
};

module.exports = {
  subscribeUserToShow,
  fetchUpcomingEpisodes,
  createCalendarEvents,
};
