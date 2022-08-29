const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const user = require('../models/user');

const signup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ username: email }).then((existingUser) => {
    // check if user already registerd with that email
    if (existingUser) {
      console.log('existingUser >>>', existingUser);
      return res.status(409).send({
        message: 'User with that email already existed',
        existingUser,
        success: 'false',
      });
    }
    return bcrypt
      .genSalt(6)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then((hashedPassword) => {
        const user = new User({ username: email, password: hashedPassword });
        return user.save();
      })
      .then((createdUser) => {
        console.log('createdUser is, need id >>>', createdUser._id);
        const token = jwt.sign({ id: createdUser._id }, config.secret, {
          expiresIn: 86400, //24 hours
        });
        console.log('user created:', createdUser);
        // return res.status(201).send({
        res.status(201).send({
          message: 'User created',
          createdUser,
          success: 'true',
          accessToken: token,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = {
  signup,
};
