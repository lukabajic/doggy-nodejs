const Post = require("../models/post");

exports.getPosts = async () => {
  const posts = await Post.find({});

  return posts || [];
};
