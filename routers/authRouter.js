const express = require('express');
const { check } = require('express-validator');
const { register, login, logout } = require('../controllers/authControllers');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], register);

router.post('/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
], login);

router.post('/logout', authMiddleware, logout);

module.exports = router;
