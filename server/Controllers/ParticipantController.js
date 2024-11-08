const Participant = require('../models/Participant');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

// Register participant and generate QR code
exports.registerParticipant = async (req, res) => {
  const { name, email } = req.body;
  const id = uuidv4();
  const qrCodeData = await QRCode.toDataURL(id);

  const participant = new Participant({ name, email, qrCode: id });
  await participant.save();

  res.json({ qrCode: qrCodeData, participant });
};

// Check-in participant by QR code
exports.checkInParticipant = async (req, res) => {
  const { qrCode } = req.body;  // UUID received from the QR code scan

  // Debugging: Log the UUID received in the request
  console.log("Received QR Code:", qrCode);

  // Find participant by UUID
  const participant = await Participant.findOne({ qrCode });

  // Debugging: Log the participant found
  console.log("Participant found:", participant);

  if (!participant) {
    return res.json({ message: "Participant not found" });
  }

  if (participant.isCheckedIn) {
    return res.json({ message: "Already checked in" });
  }

  participant.isCheckedIn = true;
  await participant.save();

  res.json({ message: "Check-in successful", participant });
};

