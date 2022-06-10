const express = require("express");
const router = express.Router();

const db = require("../config/db");
const { PostModel, PostResponseModel } = require("../Modles/Posts");
const { validateToken } = require("../middlewares/AuthMiddleware");
const Posts = require("../Query/Posts");

router.get("/", validateToken, async (req, res) => {
  try {
    const result1 = await Posts.getAllPosts();

    const result2 = await Posts.getAllLikedPosts(req.user.id);
    const result = [];
    for (let i = 0; i < result1.length; ) {
      const data = result1.filter((item) => {
        return item.id === result1[i].id;
      });

      result.push(PostModel(data));
      i = i + data.length;
    }

    res
      .status(200)
      .json({ listOfPosts: [...result], likedPosts: [...result2] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ massage: error.massage });
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Posts.getPostsById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ massage: error.massage });
  }
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result1 = await Posts.getById(id);
    const result = [];
    for (let i = 0; i < result1.length; ) {
      const data = result1.filter((item) => {
        return item.id === result1[i].id;
      });

      result.push(PostModel(data));
      i = i + data.length;
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ massage: error.massage });
  }
});

router.post("/", validateToken, async (req, res) => {
  const { title, postText } = req.body;
  try {
    const result = Posts.InsertPosts([
      title,
      postText,
      req.user.username,
      req.user.id,
    ]);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  try {
    await Posts.UpdateTitle(newTitle, id);
    res.status(201).json(newTitle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.put("/postText", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  try {
    await Posts.UpdateBody(newText, id);
    res.status(201).json(newText);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  try {
    await Posts.DeletePost(postId);

    res.status(200).json("DELETED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    res.status(400).json({ massage: error.massage });
  }
});

module.exports = router;
