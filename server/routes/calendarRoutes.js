const express = require("express");
const router = express.Router();
const { handleGoogleAuthCallback, createEvent } = require('../controllers/calendarControllers');

router.get('/oauth2/callback', handleGoogleAuthCallback);
router.post('/createEvent', createEvent);

module.exports = router;