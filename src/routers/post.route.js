const express = require("express");
const {getPosts, createPost, updatePost, deletePost, likePost} = require("../controllers/post.controller.js")
const router = express.Router();

router.get("/all-posts", getPosts);
router.post("/create-new-post", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/like-post", likePost);

module.exports = router;
