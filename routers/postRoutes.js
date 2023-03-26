const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { createPost, deletePost } = require('../controllers/postController');

router.post('/posts', authMiddleware, createPost);
router.delete('/:postId', authMiddleware, deletePost);

module.exports = router;