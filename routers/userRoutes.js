const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllUsers, getMyUser, updateMyUser } = require('../controllers/userControllers');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.get('/user', authMiddleware, getMyUser);
router.put('/updateUser', authMiddleware, upload.single('photo'), updateMyUser);

module.exports = router;
