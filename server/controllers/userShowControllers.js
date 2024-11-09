const { subscribeUserToShow } = require("../services/userShowService");

const subscribeToShow = async (req, res) => {
  try {
    console.log("In subscribe userShow route.");
    const data = req.body;
    const userID = data.userID;
    const showID = data.showID;

    const result = await subscribeUserToShow(userID, showID);

    if (result.changes > 0) {
      res.status(200).json({
        message: "User successfully subscribed to show.",
        subscribed: true,
      });
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
