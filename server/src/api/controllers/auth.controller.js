const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        error: 'User not found!'
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(400).json({
        error: "Email and password don't match!"
      });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    return res.status(200).json(token);
  } catch (err) {
    return res.status(401).json({
      error: 'User not found!'
    });
  }
};

const signout = (req, res) => {
  return res.status(200).json({
    message: 'Signed out!'
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

module.exports = { signin, signout, requireSignin };
