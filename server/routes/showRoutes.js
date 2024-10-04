const express = require("express");
const router = express.Router();
const { showSearch, detailedShowSearch, addUserShow, deleteUserShow } = require('../controllers/showControllers');

router.post("/search", showSearch);
router.post("/detailedSearch", detailedShowSearch);
router.post("/addUserShow", addUserShow);
router.post("/deleteUserShow", deleteUserShow);

module.exports = router;
