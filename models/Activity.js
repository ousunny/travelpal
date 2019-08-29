const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
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
    required: true
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  interested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  uninterested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

module.exports = Activity = mongoose.model('activity', ActivitySchema);