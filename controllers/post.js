const { catchError } = require("../utility/errors");
const Post = require("../models/post");
const { postData } = require("../utility/data");
const { getPosts, getPost } = require("../db/post");

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

exports.like = async (req, res) => {
  const { userId } = req;
  const { postId } = req.body;

  try {
    const post = await getPost(postId);

    const hasLiked = post.likes.find((l) => l === userId);

    if (hasLiked) {
      post.likes = post.likes.filter((l) => l !== userId);
    } else {
      post.likes.push(userId);
    }
    const result = await post.save();

    res.status(201).json({
      statusCode: 201,
      post: postData(result),
    });
  } catch (err) {
    catchError(res, err);
  }
};
