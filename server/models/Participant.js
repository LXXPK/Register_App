const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: String,
  email: String,
  qrCode: String,
  isCheckedIn: { type: Boolean, default: false },
});

module.exports = mongoose.model('Participant', participantSchema);
