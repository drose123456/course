<template>
     <div class="light-blue">
       
        <p v-if="reviews.length === 0" class="message">No Reviews Yet</p>
        <center><h3 v-if="reviews.length > 0">Reviews</h3></center>
        <div v-for="item in reviews" v-bind:key="item._id">
            <div class="d-flex review_container">
                <div class="user_container">
                  <div class="d-flex" style="flex-direction: column;">
                    <div>
                        <img class="avatar" src="/images/user.png" alt="">
                    </div>
                   <div>
                    {{item.userEmail}}
                   </div>
                  </div>
                </div>
                <div class="reviewtext_container">
                    <p >{{item.reviewText}}</p>
                </div>
            </div>
        </div>
      
    </div>
</template>


<script>
export default {
    name:"Review",
    data (){
        return {
                reviews:[],
                courseId:window.location.href.split('/').pop()
            };
        },
           async created(){
                try{
                    let  reviews =  await fetch(`http://localhost:8081/courses/reviewdata/${this.courseId}`)
                    reviews = await reviews.json();
                    this.reviews = reviews.data;
                    
                }
                catch(err){
                   err;
                }
               
            }
}
</script>


<style scoped>
        .light-blue
        {
            background-color: #3399AD!important;
            height: 100vh;
        }
          
    .review_container{
        
        width:500px;
        margin:10px auto;
        background-color: #32437d;
        color: white;
        box-shadow: 0px 0px 4px #ffff;
        
        border-radius: 8px;
        box-sizing: border-box;
    }
    .user_container{
        border-right: 3px solid #404040;
        margin-left: 5px;
        
    }
    .reviewtext_container{
       text-align: center;
    }
    .avatar {
        width: 60px;
        height: 60px;
    }
    .message {
        font-size: 28px;
        color: white;
       position: absolute;
       top:50%;
       left: 50%;
       transform: translate(-50%,-50%);
    }
</style>