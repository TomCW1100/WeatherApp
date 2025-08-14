const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const widgetRoutes = require('./routes/widgetRoutes');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/widgets', widgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
