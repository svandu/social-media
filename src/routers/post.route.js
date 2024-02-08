const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/post.controller.js");
const auth = require("../middlewares/auth.js");

const router = express.Router();

router.get("/all-posts", getPosts);
router.post("/create-new-post", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/like-post", auth, likePost);

module.exports = router;
