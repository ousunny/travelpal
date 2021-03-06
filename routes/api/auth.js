const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route     GET api/auth
// @desc      Check to see if user is logged in
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/auth
// @desc      Authenticate user and get token
// @access    Public

router.post(
  '/',
  [
    check('username', 'Username required').exists(),
    check('password', 'Password required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        errors: errors.array()
      });

    const { username, password } = req.body;

    try {
      let user = await User.findOne({
        username
      });

      if (!user)
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials'
            }
          ]
        });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials'
            }
          ]
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
