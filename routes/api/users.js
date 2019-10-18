const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

const User = require('../../models/User');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    check('username', 'Username required')
      .not()
      .isEmpty(),
    check('firstName', 'First name required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name required')
      .not()
      .isEmpty(),
    check('password', 'Password needs to have 6 characters or more').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({
        errors: errors.array()
      });

    const { username, firstName, lastName, password } = req.body;

    try {
      let user = await User.findOne({
        username
      });

      if (user)
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists'
            }
          ]
        });

      user = new User({
        username,
        firstName,
        lastName,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
