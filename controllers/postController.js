const postService = require('../services/postService');

exports.createPost = async (req, res) => {
    try {
    const { title, description, time, photos } = req.body;
    const userId = req.userId;

    const post = await postService.createPost(title, description, time, photos, userId);

    res.status(201).json(post);
    } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;

        const deletedPost = await postService.deletePost(postId, userId);

        if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
