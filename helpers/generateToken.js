const jwt = require("jsonwebtoken");

exports.generateToken = username => {
  let token = jwt.sign({ username: username }, process.env.SECRET_KEY);
  return token;
};
