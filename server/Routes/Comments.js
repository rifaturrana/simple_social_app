const express = require("express");
const db = require("../config/db");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const comments = require("../Query/Comment");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await comments.getComments(postId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body.commentBody;
  const username = req.user.username;
  const PostId = req.body.PostId;

  try {
    const result = await comments.commentInsert(comment, PostId, username);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    await comments.deleteComment(commentId);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(400).json({ massage: error.massage });
  }
});

module.exports = router;
