const Course = require("../models/courses");

const filterPrice = async (min,max) =>{
   
        const courses = await Course.find({coursePrice:{$gte:min,$lte:max}})
        return courses;
     
}



module.exports = filterPrice;