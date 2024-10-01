const express = require("express");
const router = express.Router();
const { handleShowLookUp, handleDetailedShowLookUp } = require("../services/showService");

//search bar route
router.post("/search", async (req, res) => {
    const query = req.body;
    const textValue = query.text; // Access the 'text' property directly
    console.log(`request: ${textValue}`);
  
    if (query && textValue) {
      console.log("Post request receiverd:", textValue);
      const showList = await handleShowLookUp(textValue);
  
      if (showList) {
        return res.status(200).json({ status: "success", shows: showList });
      } else {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to retrieve shows" });
      }
    } else {
      return res.status(400).json({ status: "error", message: "Bad Request" });
    }
    //res.json({ success: true, message: 'Query received', data: query });
  });

  router.post("/detailedSearch", async (req, res) => {
    //fill in here
  
    try {
      const { id } = req.body;
      console.log("id is: " + id);
      const showDetails = await handleDetailedShowLookUp(id);
      //console.log(showDetails);
      res.status(200).json(showDetails);
    } catch (error) {
      res.status(500).json({ success: false, message: "error" });
    }
    //   console.log("test");
    //   const query = req.body;
    //   const id = query.id;
    //   console.log("id: " + id);
  
    //   if (!id) {
    //     return res.status(400).json({ message: "Show ID is required" });
    //   }
  
    //   const mockResponse = {
    //     id,
    //     name: "Sample Show",
    //     description: "This is a detailed description of the show.",
    //     genres: ["Drama", "Action"],
    //     rating: 8.7,
    //     image: "https://example.com/sample.jpg",
    //   };
  
    //   res.status(200).json(mockResponse);
  });

  module.exports = router;