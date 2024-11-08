const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const participantRoutes = require('./routes/Participants');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));



const PORT = process.env.PORT || 5000;


app.use('/api/participants', participantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
