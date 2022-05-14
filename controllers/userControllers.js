const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const passwordHash = require('../passwordAuth/passwordHash');

// ?REGISTER USER

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, city } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error('user Already Exists');
  }
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      city,
      password,
    });
    console.log('user');
    const newUser = await user.save();
    if (newUser) {
      console.log(newUser);
      res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
      });
    }
  } catch (error) {
    res.status(501);
    throw new Error('user not created');
  }
});

//?GET ALL USER
const getAllUser = asyncHandler(async (req, res) => {
  console.log('entered all user');
  const allUsers = await User.find({});

  res.status(200).json(allUsers);
});

module.exports = { registerUser, getAllUser };
