const axios = require("axios");
const { getUserRefreshToken } = require("./userService");
require('dotenv').config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const addCalendarEvent = async (req, eventData) => {
  try {
    //let accessToken = "ya29.a0AeDClZCskeV13_VmZL8yOC6d5kKnRI7FAke15m3y5tDigAMbMJdRxRBkzgwC9ChbA21BIg_R8sM4EZLq-5JzkPrLrzZS51EVP1X1kjefah71clQEmbAn2-L9egREpfSmzLwWiS_b8SI4j3tqkbuOxV-lgEx9dkrb1SqAwIMpaCgYKAZgSARASFQHGX2MiWoXgHSyIjxwAPCTdQIpBsg0175";

    //console.log(req);

    if (req.session.accessToken) {
      console.log("Access token exists in 2nd spot:", req.session.accessToken);
    } else {
      console.log("Failed to access token in 2nd spot.");
    }

    //let accessToken = req.session.accessToken;
    //console.log("access token: " + accessToken);
    let accessToken = null;
    const userID = 1;

    //no access token, retrieve refresh token to secure new access token with
    if (!accessToken) {
      console.log("test");
      //const refreshToken = await getUserRefreshToken(req.user.id);
      const refreshToken = await getUserRefreshToken(1);

      console.log("refresh token after retrieving from db: ", refreshToken);

      accessToken = await refreshAccessToken(refreshToken);

      console.log("access token after being retrieved: ", accessToken);
      //update access token
      req.session.accessToken = accessToken;
    }

    const response = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      eventData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Event created successfully:", response.data);
    return response.data; // Return the event data if needed for further processing
  } catch (error) {
    console.error("Error adding event to calendar:", error);
    throw error;
  }
};

const refreshAccessToken = async (refreshToken) => {
    console.log("refresh token inside refreshAccessToken function: ", refreshToken);

    

    try {
        const response = await axios.post("https://oauth2.googleapis.com/token", {
          client_id: googleClientId,          
          client_secret: googleClientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        });
    
        // Google will return the new access token in the response
        const newAccessToken = response.data.access_token;
        console.log("New access token retrieved:", newAccessToken);
    
        return newAccessToken;
      } catch (error) {
        console.error("Error refreshing access token:", error.response?.data || error.message);
        throw error;
      }
};

module.exports = {
  addCalendarEvent,
};
