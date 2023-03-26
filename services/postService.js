const Post = require('../models/post');

exports.createPost = async (title, description, time, photos, userId) => {
  const post = new Post({
    title,
    description,
    time,
    photos,
    user: userId
  });

  await post.save();

  return post;
};

exports.deletePost = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    return null;
  }

  if (post.user.toString() !== userId) {
    return null;
  }

  return await Post.findByIdAndDelete(postId);
};

