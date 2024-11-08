const express = require('express');
const router = express.Router();
const { registerParticipant, checkInParticipant } = require('./../Controllers/ParticipantController');

router.post('/register', registerParticipant);
router.post('/checkin', checkInParticipant);


module.exports = router;
