const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');

const Trip = require('../../models/Trip');
const Profile = require('../../models/Profile');

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

    const newTrip = new Trip({
      user: req.user.id,
      destination,
      date,
      title,
      description,
      information
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

    res.json(trip);
  } catch (err) {
    console.error(err.message);
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

    const activities = await Trip.findOne({
      _id: req.params.id
    }, {
      user: 0,
      members: 0,
      destination: 0,
      date: 0,
      title: 0,
      description: 0,
      information: 0
    }).populate('activities');

    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;