const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');

const Trip = require('../../models/Trip');

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
    ({
      destination,
      date,
      title,
      description,
      information
    } = req.body);

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

    res.json(trip);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

module.exports = router;