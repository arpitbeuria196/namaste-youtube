const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/youtubeDB';
    await mongoose.connect(mongoURI); // Removed deprecated options
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit process on connection failure
  }
};
