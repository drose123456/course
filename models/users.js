const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  userName: String,
  password: String,
  role: String
});

module.exports = mongoose.model("User", userSchema);
//this is the database schema we made for user with properties name password and role 