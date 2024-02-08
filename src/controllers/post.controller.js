const Post = require("../models/post.model");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  try {
    const post = await Post.find({});

    return res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, message, tags, selectedFile } = req.body;
  const newPost = new Post({
    title,
    message,
    tags,
    selectedFile,
    creator: newPost.user._id, // Assuming req.userId is the authenticated user's ID
  });

  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with this ${id}`);

  // {title, name, message, tags}
  const updatePost = { creator, title, message, tags, selectedFile, _id: id };

  await Post.findByIdAndUpdate(_id, updatePost, {
    new: true,
  });

  res.json(updatePost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await Post.findByIdAndDelete(id);

  console.log("deleted");
  res.json({ message: "Post deleted successfully" });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post
    post.likes.post(req.userId);
  } else {
    //dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatePost);
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
