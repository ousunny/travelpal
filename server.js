const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Routes
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const profilesRoutes = require('./routes/api/profiles');
const tripsRoutes = require('./routes/api/trips');

// Connect Database
connectDB();

// Middleware
app.use(
  express.json({
    extended: false
  })
);

// Define routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/trips', tripsRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
