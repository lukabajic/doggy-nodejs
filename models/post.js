const mongoose = require("mongoose");

const { Schema } = mongoose;

const postsSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const likesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const postSchema = new Schema(
  {
    imageData: {
      type: String,
      default: "https://source.unsplash.com/288x162?dog",
    },
    imageName: {
      type: String,
      default: undefined,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: [postsSchema],
      default: [],
    },
    likes: {
      type: [likesSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
