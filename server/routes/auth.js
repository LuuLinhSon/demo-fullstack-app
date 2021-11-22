require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

// @router: POST api/auth/register
// @desc: Register user
// @access: Public
router.post("register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  }

  try {
    // Check existing user
    const user = User.findOne({ username });
    if (user)
      return res.status(400).json({
        success: false,
        message: "Username alredy taken",
      });

    // All good
    const hashedPass = argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPass,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch (e) {}
});

router.get("/", (req, res) => res.send("AUTH_ROUTER"));

module.exports = router;
