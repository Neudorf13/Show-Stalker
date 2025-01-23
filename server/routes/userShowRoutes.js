const express = require("express");
const router = express.Router();
const {subscribeToShow, getSubscribed} = require("../controllers/userShowControllers");

router.post("/subscribeToShow", subscribeToShow);
router.get("/getSubscribed", getSubscribed);

module.exports = router;