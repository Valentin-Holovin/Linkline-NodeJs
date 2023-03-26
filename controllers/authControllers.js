const { validationResult } = require('express-validator');
const { registerUser, login, logout } = require('../services/authService');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.json(user);
  } catch (err) {
    if (err.message === 'Email already registered') {
      return res.status(422).json({ errors: 'Email already registered' });
    }

    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
  
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await login(email, password);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

exports.logout = async (req, res) => {
  try {
    await logout(req.userId);
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
