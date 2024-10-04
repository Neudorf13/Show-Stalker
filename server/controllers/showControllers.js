const db = require("../db");

const {
  handleShowLookUp,
  handleDetailedShowLookUp,
} = require("../services/showService");

//search bar route
const showSearch = async (req, res) => {
  const { text } = req.body;
  console.log(text);

  console.log(`request: ${text}`);

  if (!text || text.trim().length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Search text cannot be empty" });
  }

  console.log("Search request received: ", text);

  try {
    const showList = await handleShowLookUp(text);
    return res.json({ success: true, shows: showList });
  } catch (error) {
    console.error("Error during show lookup: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve shows." });
  }
};

const detailedShowSearch = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Show ID is required" });
  }
  console.log("id is: " + id);
  try {
    const showDetails = await handleDetailedShowLookUp(id);
    return res.status(200).json({ success: true, show: showDetails });
  } catch (error) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

const findOrCreateShow = (showID, showName, showRating, showImage) => {
  return new Promise((resolve, reject) => {
    // Check if the show already exists by showID
    const query = "SELECT * FROM shows WHERE showID = ?";
    db.get(query, [showID], (err, row) => {
      if (err) {
        console.error(err);
        return reject({ success: false, message: "Internal server error" });
      }

      // If the show doesn't exist, insert it
      if (!row) {
        const insertQuery = `
          INSERT INTO shows (showID, showName, showRating, showImage) 
          VALUES (?, ?, ?, ?)
        `;
        db.run(insertQuery, [showID, showName, showRating, showImage], (err) => {
          if (err) {
            console.error(err);
            return reject({
              success: false,
              message: "Failed to insert show into the database",
            });
          }
          console.log(`Show with ID: ${showID} was successfully added.`);
          return resolve({ success: true, message: "Show successfully added" });
        });
      } else {
        console.log(`Show with ID: ${showID} already exists.`);
        return resolve({ success: true, message: "Show already exists" });
      }
    });
  });
};


const addUserShow = async (req, res) => {
  const { userID, showID, showName, showRating, showImage } = req.body;

  if (!userID || !showID || !showName || !showRating || !showImage) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    console.log("Looking for show in the database...");

    const showResult = await findOrCreateShow(showID, showName, showRating, showImage);
    
    if (!showResult.success) {
      // If there was an issue adding the show, send a response
      return res.status(500).json({ success: false, message: showResult.message });
    }

    console.log("Show found or added.");

    const query = "INSERT INTO userShows (userID, showID) VALUES (?, ?)";
    db.run(query, [userID, showID], (err) => {
      if (err) {
        console.error("Error adding show to userShows:", err);
        return res.status(500).json({ success: false, message: "Failed to add show for user." });
      }
      return res
        .status(200)
        .json({ success: true, message: "Show successfully added to user's account." });
    });


  } catch (error) {
    console.error("Error adding show for user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add show for user." });
  }
};

const deleteUserShow = async (req,res) => {
  const {userID, showID} = req.body;

  try {
    console.log("Attempting to remove show...");
    
    const query = "DELETE FROM userShows WHERE userID = ? AND showID = ?";
    db.run(query, [userID, showID], (err) => {
      if (err) {
        console.error("Error removing show from userShows:", err);
        return res.status(500).json({ success: false, message: "Failed to delete show for user." });
      }
      return res
        .status(200)
        .json({ success: true, message: "Show successfully deleted from user's account." });
    });
  } catch (error) {
    console.error("Error removing show for user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove show for user." });
  }
};

module.exports = {
  showSearch,
  detailedShowSearch,
  addUserShow,
  deleteUserShow,
};
