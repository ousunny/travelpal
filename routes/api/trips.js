const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const moment = require('moment');

const auth = require('../../middleware/auth');

const Trip = require('../../models/Trip');
const Profile = require('../../models/Profile');
const Activity = require('../../models/Activity');

// @route     GET api/trips
// @desc      Get all trips
// @access    Public
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();

    res.json(trips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/trips
// @desc      Create a trip
// @access    Private
router.post('/', [
  auth,
  [
    check('destination', 'Destination required').not().isEmpty(),
    check('title', 'Title required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({
    errors: errors.array()
  });

  try {
    const {
      destination,
      date,
      title,
      description,
      information
    } = req.body;

    date.start = moment(date.start, 'YYYY-MM-DD');
    date.end = moment(date.end, 'YYYY-MM-DD');

    const dates = [];
    const currentDate = date.start.clone();

    while (currentDate.isSameOrBefore(date.end)) {
      dates.push({
        date: currentDate.toDate()
      });
      currentDate.add(1, 'days');
    }

    const newTrip = new Trip({
      user: req.user.id,
      destination,
      date,
      title,
      description,
      information,
      itinerary: dates
    });

    newTrip.members.push(req.user.id);

    const trip = await newTrip.save();

    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) return res.status(404).json({
      msg: 'Profile not found'
    });

    profile.trips.push(trip);
    await profile.save();

    res.json(trip);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

// @route     GET api/trips/:id
// @desc      Get a trip
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({
      msg: 'Trip not found'
    });

    let isMember = trip.members.some((member) => {
      return member.equals(req.user.id);
    });

    if (!isMember) return res.status(401).json({
      msg: 'Not authorized'
    });

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });

    res.status(500).send('Server error');
  }
});

// @route     GET api/trips/:id/members
// @desc      Get list of members in trip
// @access    Private
router.get('/:id/members', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id
    }, {
      user: 0,
      destination: 0,
      date: 0,
      title: 0,
      description: 0,
      information: 0
    }).populate('members', '-password');

    if (!trip) return res.status(404).json({
      msg: 'Trip not found'
    });

    let isMember = trip.members.some((member) => {
      return member.equals(req.user.id);
    });

    if (!isMember) return res.status(401).json({
      msg: 'Not authorized'
    });

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });
    res.status(500).send('Server error');
  }
});

// @route     PATCH api/trips/:id/members
// @desc      Add or remove a member in a trip
// @access    Private
router.patch('/:id/members', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip.user.toString() !== req.user.id) return res.status(401).json({
      msg: 'Not authorized'
    });

    let isMember = trip.members.some((member) => {
      return member.equals(req.body.member);
    });

    switch (req.body.op) {
      case 'add':
        if (isMember) return res.status(409).json({
          msg: 'Member already exists'
        });

        // Add member to trip
        trip.members.push(req.body.member);
        await trip.save();

        // Update profile of added user to include trip
        await Profile.updateOne({
          user: req.body.member
        }, {
          $push: {
            trips: req.params.id
          }
        });

        break;
      case 'remove':
        if (!isMember) return res.status(404).json({
          msg: 'Member not found'
        });

        // Remove member from trip
        await Trip.updateOne({
          _id: req.params.id
        }, {
          $pull: {
            members: req.body.member
          }
        });

        // Remove trip from removed user's profile
        await Profile.updateOne({
          user: req.body.member
        }, {
          $pull: {
            trips: req.params.id
          }
        });

        break;
      default:
        return res.status(400).json({
          msg: 'Invalid action'
        });
    }

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/trips/:id
// @desc      Delete a trip
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({
      msg: 'Trip not found'
    });

    if (trip.user.toString() !== req.user.id) return res.status(401).json({
      msg: 'Not authorized'
    });

    await trip.remove();

    // Remove trip from user's profile
    await Profile.updateOne({
      user: req.user.id
    }, {
      $pullAll: {
        trips: [trip._id]
      }
    });

    res.json({
      msg: 'Trip removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });
    res.status(500).send('Server error');
  }
});

// @route     GET api/trips/:id/activities
// @desc      Get all activities in a trip
// @access    Private
router.get('/:id/activities', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({
      msg: 'Trip not found'
    });

    let isMember = trip.members.some((member) => {
      return member.equals(req.user.id);
    });

    if (!isMember) return res.status(401).json({
      msg: 'Not authorized'
    });

    const itinerary = await Trip.findOne({
      _id: req.params.id
    }, {
      user: 0,
      members: 0,
      destination: 0,
      date: 0,
      title: 0,
      description: 0,
      information: 0
    });

    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });
    res.status(500).send('Server error');
  }
});

// @route     POST api/trips/:id/activities
// @desc      Create activity for trip
// @access    Private
router.post('/:id/activities', [
  auth,
  [
    check('title', 'Title required').not().isEmpty()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
      errors: errors.array()
    });

    let trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({
      msg: 'Trip not found'
    });

    let isMember = trip.members.some((member) => {
      return member.equals(req.user.id)
    });

    if (!isMember) return res.status(401).json({
      msg: 'Not authorized'
    });

    const user = await User.findById(req.user.id);

    const {
      firstName,
      lastName
    } = user;

    const {
      title,
      description,
      information
    } = req.body;

    let {
      date
    } = req.body;

    date = moment(date, 'YYYY-MM-DD');

    const activity = {
      user: req.user.id,
      firstName,
      lastName,
      title,
      date,
      description,
      information
    }

    let foundActivity = trip.itinerary.find(activity => {
      return date.isSame(activity.date);
    });

    foundActivity.activities.push(activity);

    trip = await trip.save();

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });
    res.status(500).send('Server error');
  }
});

// @route     PATCH api/trips/:tripId/activities/:activityId
// @desc      Delete or edit an activity from a trip
// @access    Private
router.patch('/:tripId/activities/:activityId', auth, async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.tripId);

    if (trip.user.toString() !== req.user.id) return res.status(401).json({
      msg: 'Not authorized'
    });

    const {
      title,
      date,
      description
    } = req.body;

    switch (req.body.op) {
      case 'remove':
        trip.itinerary.map(day => {
          if (moment(day.date, 'YYYY-MM-DD').isSame(date)) {
            day.activities = day.activities.filter(activity => {
              return activity._id.toString() !== req.params.activityId;
            });
          }
        });
        break;
      case 'edit':
        trip.itinerary.map(day => {
          if (moment(day.date, 'YYYY-MM-DD').isSame(date)) {
            day.activities.map(activity => {
              if (activity._id.toString() === req.params.activityId) {
                if (title) activity.title = title;
                if (description) activity.description = description;
              }
            });
          }
        });
        break;
      default:
        return res.status(400).json({
          msg: 'Invalid action'
        });
    }

    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({
      msg: 'Trip not found'
    });
    res.status(500).send('Server error');
  }
});

module.exports = router;