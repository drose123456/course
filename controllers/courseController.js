const Course = require("../models/courses");
const Subscribe = require("../models/subscription");
const Review = require("../models/review");
const path = require("path");
const mongoose = require("mongoose");
const webPush = require("web-push");
let subscriber;
const filterPriceService = require("../services/filterPrice")
const filterProviderService = require("../services/filterProvider")

const publicVapidKey = "BLeJdePtA2A0hL975YGx1mZqPxDcX3iCHbT2GAVx_6wO2DT1PrYpQPcBf_Cz9V0Q1OjkHJMlj_BxeDgNYUO16FY"
const privateVapidKey = "RZG69dbxn6K0T3iKzPUFwFxQFwof_JOIug-7N09Tubw"

webPush.setVapidDetails("mailto:test@test.com",publicVapidKey,privateVapidKey)

exports.subscription = async (req,res)=>{
  //Get push notification object
   subscriber = req.body;

  // //send 201 resource created 
  // res.status(201).json({})

  // //make a payload 
  // const payload = JSON.stringify({"title":"hello world"})

  // webPush.sendNotification(subscriptions,payload).catch(err=>console.log(err.message))

}

exports.all = async (req, res) => {
  let courses = await Course.find({});
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, PUT, PATCH, DELETE,GET');
  res.json({ courses });
};

exports.filterByProvider = async (req, res) => {
  try{
    let courses = await filterProviderService(req.query.provider)
    res.status(200).json({courses})
  }catch(e){
    res.status(500).json({"message":e.message})
  }
  
};


exports.filterProviders = async (req,res)=>{
  let courses =  await Course.find({
    courseProvider:{"$in":req.body.providers}
  })
  res.status(200).json({courses})
}
//saves a new course in database 
exports.create = (req, res) => {
  
  let course = new Course();
  course.courseName = req.body.courseName; // receiving the course details from the request object 
  course.courseProvider = req.body.courseProvider; // same 
  course.coursePrice = req.body.coursePrice; // same 

  course.save(function(err) { // saving in the database 
    if (err) console.error(err.message);
    res.status(200).json({ course });
    const payload = JSON.stringify({"title":course.courseName + "now available"})
    // sending notification after saving 
    webPush.sendNotification(subscriber,payload).catch(err=>console.log(err.message))
  });
};
// this function is responsible for updating course details 
exports.update = async (req, res) => {
  let course = await Course.findById(req.body.id);
  course.courseName = req.body.courseName
    ? req.body.courseName
    : course.courseName;
  course.courseProvider = req.body.courseProvider
    ? req.body.courseProvider
    : course.courseProvider;
  course.coursePrice = req.body.coursePrice
    ? req.body.coursePrice
    : course.coursePrice;

  course.save(function(err) {
    if (err) console.log(err.message);
    res.status(200).json({ course });
  });
};
// responsible for deleting the course from the database 
exports.delete = (req, res) => {
  Course.findByIdAndRemove(req.body.id, function(err, course) { // calling db method to actually delete 
    if (err) return res.status(500).send(err);
    const response = {
      message: "Course successfully deleted",
      id: course._id
    };
    return res.status(200).send(response);
  });
};

exports.add = (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/addcourse.html"));
};

exports.view = (req, res) => {
  res.sendFile(path.join(process.cwd(), "/views/courses.html"));
};
// responsible for subscribing the course by user 
exports.subscribe = (req, res) => {
  let courseId = req.body.courseId;
  let userEmail = req.body.userEmail;

  console.log(courseId, userEmail);
  let subscription = new Subscribe();
  subscription.courseId = courseId;
  subscription.userEmail = userEmail;
  //saving details of subscriptions in database 
  subscription.save(function(err) {
    if (err) throw err;
    res.json({ message: "subscribed to course" });
  });
};

// returns only subscribed courses for a particular user 
exports.subscribedCourse = async (req, res) => {
  let userEmail = req.body.userEmail;
  let ids = []
  let courses = await Subscribe.find({ userEmail: userEmail },{courseId:1});
  console.log(courses)
  courses.forEach(course=>{
    ids.push(`${course.courseId}`)
  })
  let myCourses = await Course.find({_id:{"$in":ids}});
  res.status(200).json({data:myCourses})
};

//edits the course details
exports.edit = async (request,res)=>{
  let id=request.params.id;
  Course.findOne({_id: id}, function(err, course) {
    if(!err) {
        if(!course) {
            course = new Course();
            course.courseName = request.body.courseName;
            course.coursePrice = request.body.coursePrice;
        }
        course.courseName = request.body.courseName;
        course.coursePrice = request.body.coursePrice;
        course.save(function(err) {
            if(!err) {
                console.log("course " + course.courseName + " created at " + course.createdAt + " updated at " + course.updatedAt);
                res.status(201).json({"message":"updated success"})
            }
            else {
                console.log("Error: could not save course " + course.courseName);
            }
        });
    }
});
}

exports.showedit = (req,res)=>{
res.sendFile(path.join(process.cwd(),'/views/editcourse.html'));
}

exports.deleteCourse = async (req,res)=>{
  await Course.remove({_id:req.params.id});
  res.json({"message":"deleted"})
}

exports.allProviders = async (req,res)=>{
//  var distinctIdCode = { $group: { providerName: "$providerName"  } }
 const providers = await Course.aggregate([ { $group : { _id : "$courseProvider" } } ])
//  const providers = await Course.aggregate([distinctIdCode])
 console.log(providers);
 res.status(200).json({providers})
}
//function responsible for filtering courses according to price 
exports.filterPrice = async (req,res)=>{

try{
  let filteredCourses = await filterPriceService(req.body.min,req.body.max); // this is the service get called for filtering we made 
  res.status(201).json({filteredCourses})
}catch(e){
  res.status(500).json({"message":e.message})
}
 
 
  
 
  
}
//unsubscribe the course with this code 
exports.unsubscribe = async (req,res)=>{
  try{
    await Subscribe.remove({courseId:req.body.courseId,userEmail:req.body.userEmail});
    res.status(201).json({"message":"unsubscribed to course"})
  }catch(err){
    console.log(err.message)
  }
}
//adding review for the course 
exports.comment = async (req,res)=>{
  try{
    let rev = new Review();
    rev.userEmail = req.body.userEmail;
    rev.reviewText = req.body.reviewText;
    rev.courseId = req.body.courseId;

    let result = await rev.save();
    res.status(200).json({"message":"review added"})
  }
  catch(err){
    console.log(err.message)
  }
}
exports.showcommentarea = (req,res)=>{
  res.sendFile(path.join(process.cwd(),'/views/review.html'));
}

exports.showreview = (req,res)=>{
  res.sendFile(path.join(path.join(process.cwd(),'/views/reviewlist.html')));
}
//it fetches all review details of a particular course from database
exports.getallReview = async(req,res)=>{
  const id = req.params.id;
  const reviews =  await Review.find({courseId:id})
  res.status(200).json({data:reviews})
}