const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'trip'
    }
  ],
  savedActivities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'activity'
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
