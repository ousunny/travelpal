const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  destination: {
    type: String,
    required: true
  },
  date: {
    start: {
      type: Date,
      default: Date.now()
    },
    end: {
      type: Date
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  information: {
    type: String
  },
  activities: [{
    date: {
      type: Date
    },
    dailyActivities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'activity'
    }]
  }]
});

module.exports = Trip = mongoose.model('trip', TripSchema);