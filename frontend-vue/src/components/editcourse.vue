<template>
     <div id="app" class="container">
        <form action="" style="margin-top:20px;">
            
            <table>
             <h2 class="text-warning">Update Course</h2>
                <tr>
                    <td>CourseName:</td>
                    <td><input v-model="courseName" type="text" placeholder="courseName" class="form-control"></td>
                </tr>
                <tr>
                    <td>CoursePrice:</td>
                    <td><input v-model="coursePrice" type="text" placeholder="coursePrice" class="form-control"></td>
                </tr>
                <br><br>
                <tr>
                    <td><button class="btn btn-primary" @click="edit">Update</button> </td>
                    <td><button v-on:click="goback" class="btn btn-success">GO BACK</button></td>
                </tr>
                <tr>
                    
                </tr>
            </table>
        </form>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            courseName:null,
            coursePrice:null
        }
    },
    methods:{
            edit:function(e){
                    e.preventDefault();
                    
                    fetch(`http://localhost:8081/courses/edit/${this.id}`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json;charset=utf-8"
                        },
                        body:JSON.stringify({courseName:this.courseName,coursePrice:this.coursePrice})
                    }).then(res =>{ if(res.status === 201){
                        this.$emit('back');
                    }})
                      
                },
                goback:function(){
                    this.$emit('back')
                }
            }
}
</script>

<style scoped>

</style>