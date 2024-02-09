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

//QUERY -> /posts?page=1 -> page = 1
//PARAMS -> /posts/:id -> id = 123

const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {

    /**
     * RegExp: It uses the searchQuery parameter as the pattern to match, and the "i" flag which makes the regular expression case-insensitive.
     * The $or operator performs a logical OR operation on an array of two or more query expressions.
     * The $in operator selects the documents where the value of a field equals any value in the specified array.
     * Post.find statement: It searches for posts where either the title matches the searchQuery pattern (case-insensitive) or the tags array contains any of the tags provided in the tags parameter. 
     * The tags.split(",") method splits the tags string into an array using commas as separators.
     */

    const title = new RegExp(searchQuery, "i"); // test Test TEST all are same and equals to 'test'

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
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
    creator: req.userId, // Assuming req.userId is the authenticated user's ID
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

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);

  post.comments.push(value); // here the values of the post is push in the comments array 

  const updatePost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatePost);
};

module.exports = {
  getPostBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
};
