let User = require("../models/users");
let hashHelper = require("../helpers/hashPassword");
let generateTokenHelper = require("../helpers/generateToken");
let bcrypt = require("bcryptjs");
const path = require("path");

exports.register = async (req, res) => {
  let user = new User();
  user.userName = req.body.userName;
  user.password = hashHelper.hash(req.body.password);
  user.role = req.body.role;

  let result = await user.save();
  res.status(200).json({ result });
};

exports.login = async (req, res) => {
  let user = await User.findOne({ userName: req.body.userName });
  console.log(req.body.userName, req.body.password);
  if (user) {
    let isLoggedIn = bcrypt.compareSync(req.body.password, user.password);
    if (isLoggedIn) {
      const token = generateTokenHelper.generateToken(req.body.userName);
      res.cookie("accessToken", token);
      return res.status(200).json({
        userName: req.body.userName,
        accessToken: token,
        role: user.role
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(404).json({ message: "User does not exist" });
  }
};

exports.index = (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/login.html"));
};
exports.signup = (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/register.html"));
};

exports.subscribe = (req, res) => {};
