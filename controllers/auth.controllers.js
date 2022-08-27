const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = (req, res, next) => {
  const { email, password } = req.body;
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
      console.log("user created:", createdUser);
      return res.status(201).send({ message: "User created", createdUser });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  signup,
};
