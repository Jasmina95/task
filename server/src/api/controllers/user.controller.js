const User = require('../models/user.model');
const errorHandler = require('../helpers/dbErrorHandler');

const create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    return res.status(200).json({ message: 'Signup successful!' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

module.exports = { create };
