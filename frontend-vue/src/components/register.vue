<template>
        <div id="app" class="row">
            <div id="bannerimage" class="col-md-7 gradient"></div>
      <form id="registerform" class="col-md-3">
          <h1>Membership Form</h1>
        <table >
           
          <tr>
            <td>Username:</td>
            <td>
              <input
                type="text"
                v-model="username"
                name="username"
                placeholder="Enter username"
                required
              />
            </td>
          </tr>
          <tr>
            <td class="error_text" colspan="2">{{username_error}}</td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                type="password"
                v-model="password"
                name="username"
                placeholder="Enter password"
                required
              />
            </td>
          </tr>
          <tr>
            <td class="error_text" colspan="2">{{password_error}}</td>
          </tr>
          <tr>
            <td>Choose Your Role:</td>
            <td>
              <select name="" id="" v-model="role" required>
                <option value="provider">Service Provider</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button @click="login" class="btn-primary">Signup</button>
            </td>
          </tr>
        </table>
      
            <router-link to="login">Login</router-link>
      
      </form>
      
    </div>
</template>

<script>
export default {
    data(){
        return{
            username:null,
            password:null,
            role:null,
            username_error:null,
            password_error:null
        }
    },
    methods:{
        login:function(e){
              
            e.preventDefault();
            if (this.username && this.password) {
              if (!this.username.includes("@")) {
                return (this.username_error =
                  "username must be an email address");
              }
              if (this.password.length < 6) {
                return (this.password_error =
                  "Password must be at least 6 characters long");
              }
            }
            if (this.username === null && this.password === null) {
              this.username_error = "Username is required";
              this.password_error = "Password is required";
              return;
            }
            if (this.password === null) {
              this.username_error = "";
              this.password_error = "Password is required";
              return;
            }
            if (this.username === null) {
              this.password_error = "";
              this.username_error = "username is required";
              return;
            }
            fetch("http://localhost:8081/users/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              },
              body: JSON.stringify({
                userName: this.username,
                password: this.password,
                role: this.role
              })
            })
              .then(res => {
                return res.json();
              })
              .then(data => {
                if (data) {
                  this.$router.push("login")
                }
              });
          
        }
        
    }

}
</script>


<style  scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
      *{
        margin:0px !important;
        padding:0px;
        box-sizing: border-box;
       font-family: 'Roboto Condensed', sans-serif;
      }
     
      
    #app{
       
        height:100vh;
    }
     
      .btn-primary {
        background-color: teal;
        color: white;
        padding: 10px;
        border: 1px solid teal;
        
      }
      .error_text {
        color: tomato;
        font-size: 12px;
        font-weight: lighter;
      }

      .gradient{
       background: #ec008c;  /* fallback for old browsers */
       background: -webkit-linear-gradient(to right, #fc6767, #ec008c);  /* Chrome 10-25, Safari 5.1-6 */
       background: linear-gradient(to right, #fc6767, #ec008c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
       position: relative;

      }
      input{
          border:none;
          border-bottom: 1px solid #404040;
          margin:20px !important;
      }
      input:focus{
          outline: none;
      }
      .vertical_middle{
          position:absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
          color:white;
      }
      form{
       color:#404040;
       text-align: center;
       padding: 10px;
      }
</style>