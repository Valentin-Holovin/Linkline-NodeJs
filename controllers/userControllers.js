const User = require('../models/User');
const upload = require('../middleware/uploadMiddleware');
const multer = require('multer');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -__v');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMyUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -__v');

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.updateMyUser = async (req, res) => {
  try {
    await upload.single('photo')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send('File upload error: ' + err.message);
      } else if (err) {
        return res.status(400).send(err);
      }

      const { name, email, photo } = req.body;

      const userFields = {};
      if (name) userFields.name = name;
      if (email) userFields.email = email;
      if (photo) userFields.photo = photo;
      if (req.file) userFields.photo = req.file.path;

      if (email) {
        const existingUser = await User.findOne({ email: email });
        if (existingUser && existingUser._id.toString() !== req.userId) {
          return res.status(400).send('Email is already in use');
        }
      }

      const user = await User.findByIdAndUpdate(req.userId, userFields, { new: true });

      if (!user) {
        return res.status(404).send('User not found');
      }

      let responseData = {
        email: user.email,
        name: user.name,
        photo: null,
      };
      if (user.photo) {
        const photoUrl = req.protocol + '://' + req.get('host') + '/' + user.photo;
        responseData.photo = photoUrl.replace('http://localhost:3000/https://', 'https://');
      }

      res.send(responseData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};