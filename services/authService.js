const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return { name: user.name, email: user.email, token };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return { name: user.name, email: user.email, token };
};

exports.logout = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.refreshToken = null;
    await user.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

