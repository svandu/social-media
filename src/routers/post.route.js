const express = require("express");
const {
  getPostBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
} = require("../controllers/post.controller.js");
const auth = require("../middlewares/auth.js");

const router = express.Router();

router.get("/search", getPostBySearch);
router.get("/all-posts", getPosts);
router.post("/create-new-post", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

module.exports = router;
