const express = require("express");
const router = express.Router();
const { showSearch, detailedShowSearch } = require('../controllers/showControllers');

router.post("/search", showSearch);
router.post("/detailedSearch", detailedShowSearch);

module.exports = router;
