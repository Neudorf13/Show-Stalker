const express = require("express");
const router = express.Router();
const { showSearch, detailedShowSearch, addUserShow } = require('../controllers/showControllers');

router.post("/search", showSearch);
router.post("/detailedSearch", detailedShowSearch);
router.post("/addUserShow", addUserShow);

module.exports = router;
