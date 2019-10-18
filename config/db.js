const mongoose = require('mongoose');
const config = require('config');

const db = process.env.DB || config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });

    console.log('Connected to DB');
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

module.exports = connectDB;
