const { catchError } = require("../utility/errors");
const Post = require("../models/post");
const { postData } = require("../utility/data");

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
