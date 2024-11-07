//calendarControllers.js
const { setUserRefreshToken } = require("../services/userService");
const { addCalendarEvent } = require("../services/calendarService");
const axios = require("axios");
require('dotenv').config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const handleGoogleAuthCallback = async (req, res) => {
  const authorizationCode = req.query.code;

  if (!authorizationCode) {
    return res.status(400).send("Authorization code not found");
  }

  try {
    // Exchange the authorization code for access and refresh tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code: authorizationCode,
        client_id:
        googleClientId, //TODO
        client_secret: googleClientSecret,
        redirect_uri: "http://localhost:8080/api/calendar/oauth2/callback", // DEVELOPMENT
        grant_type: "authorization_code",
      }
    );

    const tokens = tokenResponse.data;

    // Handle token storage or further processing here
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);

    //store refresh token in database TODO
    const userID = 1;
    //const userID = localStorage.getItem("userID");
    //console.log("user ID: " + userID);
    setUserRefreshToken(userID, tokens.refresh_token);

    //store access token in some type of temp storage
    req.session.accessToken = tokens.access_token;

    if (req.session.accessToken) {
        console.log("Access token successfully stored in session:", req.session.accessToken);
    } else {
        console.log("Failed to store access token in session.");
    }

    // Redirect or respond based on the outcome
    //res.redirect("/calendar?linked=true"); // Redirect to indicate successful linking
    res.redirect("http://localhost:5173/calendar?linked=true");
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).send("Failed to retrieve tokens");
  }
};

const createEvent = async (req, res) => {
  try {
    console.log("in createEvent route");
    const eventData = req.body; // Event data from the frontend
    const result = await addCalendarEvent(req, eventData);
    res.status(200).json(result); // Respond with the created event data
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

module.exports = {
  handleGoogleAuthCallback,
  createEvent,
};
