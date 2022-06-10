const express = require("express");
const db = require("../config/db");

const router = express.Router();

const { validateToken } = require("../middlewares/AuthMiddleware");
const Likes = require("../Query/Likes");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  try {
    const found = await Likes.likes(PostId, UserId);

    if (!found[0]) {
      await Likes.likeInsert(PostId, UserId);
      res.status(201).json({ liked: true });
    } else {
      await Likes.deletlikes(PostId, UserId);
      res.status(201).json({ liked: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

module.exports = router;
