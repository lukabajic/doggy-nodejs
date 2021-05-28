const { catchError } = require("../utility/errors");
const Post = require("../models/post");
const { postData } = require("../utility/data");
const { getPosts } = require("../db/post");

exports.create = async (req, res) => {
  const { userId } = req;
  const { content } = req.body;

  try {
    const post = new Post({ content, userId });
    await post.save();

    res.status(201).json({
      statusCode: 201,
      post: postData(post),
    });
  } catch (err) {
    catchError(res, err);
  }
};

exports.fetchPosts = async (req, res) => {
  try {
    const posts = await getPosts();

    res.status(201).json({
      statusCode: 201,
      posts: posts.map((p) => postData(p)),
    });
  } catch (err) {
    catchError(res, err);
  }
};
