//userShowControllers.js
const { subscribeUserToShow, fetchUpcomingEpisodes, createCalendarEvents } = require("../services/userShowService");

const subscribeToShow = async (req, res) => {
  try {
    console.log("In subscribe userShow route.");
    const data = req.body;
    const userID = data.userID;
    const showID = data.showID;

    const result = await subscribeUserToShow(userID, showID);

    if (result.changes > 0) {

      const episodes = await fetchUpcomingEpisodes(showID);
      console.log(episodes);

      if(episodes.length > 0) {
        console.log("Before create calendar events");
        const eventsResult = await createCalendarEvents(userID, episodes);
        console.log("After create calendar events");

        res.status(200).json({
          message: "User successfully subscribed to show and events created.",
          subscribed: true,
          eventsCreated: eventsResult,
        });
      }
      else {
        res.status(200).json({
          message: "User successfully subscribed to show, but there are currently no upcoming episodes to add to calendar.",
          subscribed: true,
          eventsCreated: 0,
        });
      }

      
    } else {
      res.status(404).json({
        message: "User or show not found. Subscription could not be updated.", 
        subscribed: false 
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to subscribe user to show.",
        subscribed: false,
      });
  }
};

module.exports = {
  subscribeToShow,
};
