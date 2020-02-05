require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");

const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/users");


//connecting to mongodb database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});

const app = express();
app.use(cors('*'));
app.use(express.static("public"));
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/courses", courseRoutes);
app.use("/users", userRoutes);

app.use(function(req, res, next) {
  const err = new Error('Not Found'); //set a error message here
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if(err.status === 404){
    
    res.status(404).send(err.message) //send 404 page here 
  }
})
// app.listen(process.env.PORT, () => {
//   console.log(`server started listening at port ${process.env.PORT}`);
// });


module.exports = app;