<template>
      <div id="app" class="row"> 
      <div id="bannerimage" class="col-md-8 gradient">
          <h2 class="vertical_middle">Online Course</h2>
      </div>
      <form class="col-md-3 ">
        <h3>LogIn</h3>
        <table>
          <tr>
            <td>Username:</td>
            <td>
              <input
                type="text"
                v-model="username"
                name="username"
                placeholder="Enter username"
              />
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                type="password"
                v-model="password"
                name="username"
                placeholder="Enter password"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2"><button @click="login" class="btn-primary btn btn-lg">LogIn</button></td>
            
           
          </tr>
          <tr>
              <td colspan="2"><router-link to="register">Register</router-link></td>
          </tr>
        </table>
      </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username:null,
            password:null
        }
    },
    methods:{
         login: function(e) {
            e.preventDefault();
            fetch("http://localhost:8081/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              },
              body: JSON.stringify({
                userName: this.username,
                password: this.password
              })
            })
              .then(res => {
                return res.json();
              })
              .then(data => {
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("userEmail", data.userName);
                switch (data.role) {
                  case "provider":
                    return (this.$router.push('/courses/add'));
                  case "student":
                    return (this.$router.push('/'));
                  case "parent":
                    return (this.$router.push('/'));
                }
              });
          }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
      *{
        
       font-family: 'Roboto Condensed', sans-serif;
      }
        body {
        font-family: "Montserrat", sans-serif;
        overflow: hidden;
    
      }
      #registerform td {
        padding:3px;
      }
      #app{
          height: 100vh;
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
          margin:20px;
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
</style>