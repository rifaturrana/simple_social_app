const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const Users = require("../Query/Users");
router.post("/", async (req, res) => {
  const { username, password, usermail } = req.body;
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      const response = await Users.Register([username, hash, usermail]);
      res.status(201).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await Users.getUser(username);
    console.log(result);
    if (!result[0]) res.json({ error: "User Doesnt Exist" });
    const match = await bcrypt.compare(password, result[0].password);
    console.log(match);
    if (!match)
      res
        .status(401)
        .json({ error: "Wrong Username And Password Combination" });

    try {
      const accessToken = sign(
        { username: result[0].username, id: result[0].id },
        "importantsecret"
      );
      res
        .status(201)
        .json({ token: accessToken, username: username, id: result[0].id });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Users.getByid(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ massage: error.massage });
  }
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const results = await Users.getUser(req.user.username);
    console.log(results);
    if (!results[0]) res.json({ error: "User Doesn't Exist" });
    console.log(oldPassword, results[0].password);

    const match = await bcrypt.compare(oldPassword, results[0].password);
    console.log(match);
    if (!match) res.status(401).json({ error: "Password doesnt match" });

    bcrypt.hash(newPassword, 10).then(async (hash) => {
      const result2 = await Users.UpdatePassword(hash, req.user.username);
      console.log(result2);
      res.status(201).json(result2);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

module.exports = router;
