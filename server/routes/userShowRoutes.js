const express = require("express");
const router = express.Router();
const {subscribeToShow} = require("../controllers/userShowControllers");

router.post("/subscribeToShow", subscribeToShow);


module.exports = router;