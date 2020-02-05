<template>
    <div id="app" class="container">
        <h2 class="text-info" style="text-decoration: underline;text-decoration-color: green;">Review</h2>
        <form action="">
            <p style="text-align:left" class="text-info">Say some thing about course</p>
            <table>
                <tr>
                   
                    <td><textarea v-model="reviewText" name="" id="" cols="70" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td><button class="btn btn-primary" @click="postreview">Post</button></td>
                </tr>
            </table>
        </form>
    </div>
</template>


<script>
export default {
    data(){
        return{
            reviewText:null,
            courseId:window.location.href.split('/').pop(),
            userEmail:localStorage.getItem('userEmail')
        }
    },
          methods:{
                postreview:function(e){
                    e.preventDefault();
                    fetch(`http://localhost:8081/courses/comment`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json;charset=utf-8"
                        },
                        body:JSON.stringify({userEmail:this.userEmail,courseId:this.courseId,reviewText:this.reviewText})
                    }).then(res=>{res.json()}).then(()=>{this.$router.push(`/review/${this.courseId}`)})

                }
            }
    }


</script>


<style lang="stylus" scoped>


</style>