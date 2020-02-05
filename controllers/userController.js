let User = require("../models/users");// requiring the schema for user 
let hashHelper = require("../helpers/hashPassword"); // requiring the helper we made for hashing the password 
let generateTokenHelper = require("../helpers/generateToken"); // requiring the helper we made for genereating token which we can save after successful login 
let bcrypt = require("bcryptjs");  // npm module which hash the password with some algorthim 
const path = require("path"); // path module for resolving directory pathnames 
//registers a new user 
exports.register = async (req, res) => {
  let user = new User(); // making a new users object from user model whhich we required above 
  user.userName = req.body.userName;  // req.body catches the request object from the api call and has data sent such as heere username 
  user.password = hashHelper.hash(req.body.password);
  user.role = req.body.role;

  let result = await user.save(); // it is the mongo db function for saving a user in database 
  res.status(200).json({ result });
};
//code for checking user credentials match or  not in database login 
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
