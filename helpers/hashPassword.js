const bcrypt = require("bcryptjs");
exports.hash = password => {
  let hashedPasword = bcrypt.hashSync(password, 10);
  return hashedPasword;
};
