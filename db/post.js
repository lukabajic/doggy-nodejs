const Post = require("../models/post");
const { throwError } = require("../utility/errors");

exports.getPosts = async () => {
  const posts = await Post.find({});

  return posts || [];
};

exports.getPost = async (id) => {
  const post = Post.findById(id);
  !post && throwError("Couldn't find a post with this id.", 404);

  return post;
};
