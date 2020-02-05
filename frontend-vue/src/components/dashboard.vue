<template>
    <div >
        <div v-if="editToggle">
            <Edit v-on:back="editToggles" v-bind:id="editId"></Edit>
        </div>
        <div v-else>
             <div class="d-flex">
        <div class="box-shadow">
          <form action="">
              <h2 class="text-info">Add Course</h2>
            <table>
              <tr>
                <td>Course Name:</td>
                <td>
                  <input
                    type="text"
                    placeholder="Course Name"
                    name="courseName"
                    v-model="courseName"
                    class="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>
                  <input
                    type="text"
                    placeholder="Price in £"
                    name="coursePrice"
                    v-model="coursePrice"
                    class="form-control"
                  />
                </td>
              </tr>
              <tr>
                  <td>Location:</td>
                  <td>
                      <input type="text"
                        placeholder="Location"
                        name="courseLocation"
                        v-model="courseLocation"
                        class="form-control"
                      />
                  </td>
              </tr>
              <tr>
                <td>
                  <button class="btn btn-primary" @click="addCourse">
                    AddCourse
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>

        <div>
          <table class="table">
            <h2 class="text-info">My Courses</h2>
            <button class="btn btn-danger" style="position: relative;right: -713px;top: -34px;" @click="logout">Logout</button>
            <tr>
              <th>Course Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>

            <tr v-for="course in courses" v-bind:key="course._id">
              
              <td>{{course.courseName}}</td>
              <td>{{course.coursePrice}}</td>
             
              <td ><button class="btn btn-warning" v-on:click="editToggles(course._id)">EDIT</button></td>
              <td ><button class="btn btn-danger" @click="deleteCourse(course._id)">DELETE</button></td>

            </tr>
          </table>
        </div>
      </div>
        </div>
     
    </div>
    
</template>


<script>
import Edit from "../components/editcourse"
export default {
    components:{
        "Edit":Edit
    },
    data(){
        return{
            courseName: null,
            coursePrice: null,
            courseProvider: localStorage.getItem("userEmail"),
            courses: [],
            editToggle:false,
            editId:""
        }
    },
    created() {
       this.fetchData();
      },
     methods: {
        fetchData:function(){
             fetch(
          `http://localhost:8081/courses/filter?provider=${localStorage.getItem(
            "userEmail"
          )}`
        ).then(res =>
          res.json().then(data => {
            this.courses = data.courses;
          })
        );
        } ,
        logout:function(){
            localStorage.removeItem('userEmail');
            localStorage.removeItem('token');
            this.$router.push("/login")
        },
        addCourse: function(e) {
          e.preventDefault();
          fetch(`http://localhost:8081/courses/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
              courseName: this.courseName,
              coursePrice: this.coursePrice,
              courseProvider: this.courseProvider
            })
          }).then(res =>
            res.json().then(data => {
             
              this.courses.push({
                courseName: this.courseName,
                coursePrice: this.coursePrice,
                _id:data.course._id
                
              });
              this.courseName = "";
              this.coursePrice = "";
            })
          );
        },
        editToggles:function(id){
           this.editToggle = !this.editToggle;
           this.editId = id;
          this.fetchData();
           
        },
        deleteCourse:function(id){
          fetch(`http://localhost:8081/courses/delete/${id}`,{
            method:"DELETE",

          }).then(fetch(
          `http://localhost:8081/courses/filter?provider=${localStorage.getItem(
            "userEmail"
          )}`
        ).then(res =>
          res.json().then(data => {
            this.courses = data.courses;
          })
        ))
        }

      },
      
}
</script>


<style scoped>
    body{
        margin:0px!important;
        padding:0px!important;
    }
    .box-shadow{
        box-shadow:0px 0px 10px -3px #404040;
        height:100vh;
        padding:10px;
    }
</style>