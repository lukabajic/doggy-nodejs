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
      type: String,
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
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
