const Course = require("../models/courses");


const filterProvider = async(provider)=>{
        console.log(provider)
        let courses = await Course.find({
        "courseProvider": provider
      });
     
      return courses;


}


module.exports = filterProvider;