<template>
   <div class="container-fluid" id="app">
      <div class="row top_head">
        <div class="col-md-12 nopadding">
          <nav class="navbar navbar-expand-lg navbar-primary bg-dark navbar-fixed-top">
            <a class="navbar-brand" href="#">Courses/Activities</a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#" @click="minecourses"
                      >My Courses</a
                    >
                    <router-link class="dropdown-item" to="Login">Login</router-link>
                    <div class="dropdown-divider"></div>
                    <router-link class="dropdown-item" to="register">Register</router-link>
                  </div>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
       
      </div>
     
    
      <div class="row ">
        <div class="col-md-3 sidebar nopadding">
         
          <ul style="list-style:none;">
            <li class="text-info">Providers</li>
            <li v-for="provider in providers" v-bind:key="provider._id"> <input  type="checkbox" @click="filterProvider" v-bind:value= provider._id>{{provider._id}}</li>
          </ul>
          <table style="width:fit-content">
            <tr>
              <td><h6>Filter By Price</h6></td>
            </tr>
            <tr>
              <td><input type="number" v-model="min" placeholder="Min Price" style="width: 95px;margin:5px;"></td>
              <td><input type="number" v-model="max" placeholder="Max Price" style="width: 95px;"></td>

            </tr>
            <tr>
              <td>  
                <button class="btn btn-warning" @click="filterPrice">APPLY</button>
              </td>
              
            </tr>
          </table>
        </div>
          
        
        <div class="col-md-9 nopadding content">
          <div class="d-flex" style="flex-wrap: wrap;">
            <div class="card" style="width: 18rem;" v-for="course in courses" v-bind:key="course._id">
              <img src="../assets/logo.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">
                  {{course.courseName}} By {{course.courseProvider}}
                </h5>
                <p class="card-text">
                  £{{course.coursePrice}}
                </p>
                <div class="d-flex" style="justify-content: space-around;">
                  <a v-if="issubscribe === false" href="#" class="btn btn-primary btn-sm" @click="subscribe(course._id)"
                  >Subscribe</a>
                  <!-- <a v-if="issubscribe === false" v-bind:href="'/review/'+course._id" class="btn btn-success btn-sm"
                  >View Reviews</a> -->
                  <router-link :to="`/review/${course._id}`" v-if="issubscribe === false"  class="btn btn-success">View Review</router-link>
                <a v-if="issubscribe === true" href="#" class="btn btn-danger btn-sm" @click="unsubscribe(course._id)"
                >UnSubscribe</a
              >
              <a v-if="issubscribe === true" v-bind:href="'/review/add/'+course._id" class="btn btn-success btn-sm " >Add Review</a>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
</template>

<script>
  export default {
    name: 'Courses',
     data() {
      return {
        courses: null,
        providers:null,
        max:null,
        min:null,
        issubscribe:false
      };
    },
    methods: {
          subscribe: function(courseId) {
            fetch(`http://localhost:8081/courses/subscribe`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              body: JSON.stringify({
                courseId: courseId,
                userEmail: localStorage.getItem("userEmail")
              })
            }).then(res => {
              res.json().then(message => alert(message.message))
            });
          },
          unsubscribe:function(courseId){
            fetch(`http://localhost:8081/courses/unsubscribe`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              body: JSON.stringify({
                courseId: courseId,
                userEmail: localStorage.getItem("userEmail")
              })
            }).then(res => {
              res.json().then();
              this.minecourses();
            });
          },
          minecourses: function(e) {
            e.preventDefault();
            fetch(`http://localhost:8081/courses/subscribed`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              body: JSON.stringify({
                userEmail: localStorage.getItem("userEmail")
              })
            }).then(res => {
              res.json().then(data => {
              
                this.courses = data.data;
                this.issubscribe = true;
              });
            });
          },
          filterPrice:function(){
           fetch(`http://localhost:8081/courses/filterPrice`,{
             method:"POST",
             headers:{
               "Content-Type":"application/json;charset=utf-8"
             },
             body:JSON.stringify({min:this.min,max:this.max})
           }).then(res=>{res.json().then(data=>{ this.courses = data.filteredCourses})})
          },
          filterProvider:function(){
            
            let chooseProviders =  Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(item=>{
              return item.value;
            })
            // debugger;
            fetch(`http://localhost:8081/courses/filterProviders`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json;charset=utf-8"
              },
              body:JSON.stringify({providers:chooseProviders})
            }).then(res=>{
              res.json().then(data=>{this.courses = data.courses})
            })
          }
        },

    created(){
             fetch(`http://localhost:8081/courses/all`).then(res =>
            res.json().then(data => (this.courses = data.courses))
          );
           fetch(`http://localhost:8081/courses/providers`).then(res=>{
            res.json().then(data=>{this.providers = data.providers})
          })
        }

  }
</script>

<style scoped>
.card img {
        max-width: 100%;
        height: 159px;
        object-fit: scale-down;
      }
      .sidebar{
        text-align: left;
        padding: 0px;
      }
</style>