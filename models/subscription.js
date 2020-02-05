let mongoose = require("mongoose");

let subscriptionSchema = new mongoose.Schema({
  courseId: String,
  userEmail: String
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
