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
      type: Date
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
  itinerary: [{
    date: {
      type: Date
    },
    activities: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      title: {
        type: String,
        default: '',
        required: true
      },
      date: {
        type: Date
      },
      description: {
        type: String,
        default: ''
      },
      interested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }],
      uninterested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }]
    }]
  }]
});

module.exports = Trip = mongoose.model('trip', TripSchema);