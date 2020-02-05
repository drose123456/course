const Course = require("../models/courses");
// database query for filtering out the course in price range 
const filterPrice = async (min,max) =>{
   
        const courses = await Course.find({coursePrice:{$gte:min,$lte:max}}) 
        return courses;
     
}



module.exports = filterPrice;