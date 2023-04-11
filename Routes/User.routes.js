const express = require("express");
const { UserModel } = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const newUser = await UserModel.find({ email });
    if (newUser.length > 0) {
      res.send({ msg: "User already exists with the email" });
    } else {
      bcrypt.hash(pass, 5, async function (err, hash) {
        if (err) {
          res.send({ msg: "Something went wrong", error: err.message });
        } else {
          const user = new UserModel({ email, pass: hash });
          await user.save();
          res.send({ msg: "New User Registered" });
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.send({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { userRouter };
