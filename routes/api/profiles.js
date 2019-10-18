const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

// @route     GET api/profiles/me
// @desc      Get current user's profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', '-password');

    if (!profile) {
      return res.status(400).json({
        msg: 'No profile for user'
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/profiles
// @desc      Get all profiles
// @access    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find(
      {},
      {
        savedActivities: 0
      }
    ).populate('user', '-password');

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/profiles
// @desc      Create profile for user
// @access    Private
router.post('/', auth, async (req, res) => {
  try {
    const newProfile = new Profile({
      user: req.user.id
    });

    const profile = await newProfile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     GET api/profiles/:id
// @desc      Get profile by id
// @access    Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne(
      {
        user: req.params.id
      },
      {
        savedActivities: 0
      }
    );

    if (!profile)
      return res.status(404).json({
        msg: 'Profile not found'
      });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId')
      return res.status(404).json({
        msg: 'Profile not found'
      });

    res.status(500).send('Server error');
  }
});

// @route     GET api/profiles/:id/trips
// @desc      Get all trips for a specific profile
// @access    Private
router.get('/:id/trips', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne(
      {
        user: req.params.id
      },
      {
        savedActivities: 0
      }
    ).populate({
      path: 'trips',
      populate: {
        path: 'members',
        select: '-password'
      }
    });

    if (!profile)
      return res.status(404).json({
        msg: 'Profile not found'
      });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId')
      return res.status(404).json({
        msg: 'User not found'
      });

    res.status(500).send('Server error');
  }
});

module.exports = router;
