let mongoose = require("mongoose");

let reviewSchema = new mongoose.Schema({
  reviewText:String,
  userEmail:String,
  courseId:String
});

module.exports = mongoose.model("Review", reviewSchema);
//review sche