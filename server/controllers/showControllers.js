const {
    handleShowLookUp,
    handleDetailedShowLookUp,
  } = require("../services/showService");

//search bar route
const showSearch = async (req, res) => {

    const {text} = req.body;
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


  module.exports = {
    showSearch,
    detailedShowSearch,
  };