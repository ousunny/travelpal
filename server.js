const express = require('express');

const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({
  extended: false
}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));