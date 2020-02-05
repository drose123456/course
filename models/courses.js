let mongoose = require("mongoose");

let courseSchema = new mongoose.Schema({
  courseName: String,
  coursePrice: Number,
  courseProvider: String,
  courseReviews: []
});

module.exports = mongoose.model("Course", courseSchema);

///course schema