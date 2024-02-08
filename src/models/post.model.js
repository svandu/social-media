const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String, 
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [String],
  selectedField: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
