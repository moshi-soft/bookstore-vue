<template>
<div class="container">
 <h1>Sign Up:</h1>
  <div class="row">
    <div class="col"></div>
    <div class="col">
      <form @submit.prevent="register">
      <ul>
                <li v-for="error,index in unprocessErrors" :key="index">{{error.description}}</li>
            </ul>
            <div class="mb-3">
                <label for="firstName" class='form-label float-start'>First Name:</label>
                <input type="text" v-model="firstName" name="firstName" class="form-control">
            </div>
             <div class="mb-3">
                <label for="lastName" class='form-label float-start'>Last Name:</label> 
                <input type="text" v-model="lastName" name="lastName" class="form-control">
            </div>
             <div class="mb-3">
                <label for="email" class='form-label float-start'>Email:</label>
                <input type="email" v-model="email" name="email" class="form-control">
            </div>
             <div class="mb-3">
                <label for="password" class='form-label float-start'>Password:</label>
                <input type="password" v-model="password" name="password" class="form-control">
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class='form-label float-start'>Confirm Password:</label>
                <input type="password" v-model="confirmPassword" name="confirmPassword" class="form-control">
                <!-- <div v-if="notFoundErrors.ConfirmPassword" v-for="error,index in notFoundErrors.ConfirmPassword" :key="index" style="red">
                 <span>error</span>
                 <div> -->
            </div>
            <div class="mb-3">
                <button type='submit' name='button' class="btn btn-success">Register</button>
            </div>
            
       </form>
    </div>
    <div class="col"></div>
  </div>
</div>
</template>
<script>
    export default{
        data(){
            return {
                firstName:"",
                lastName:"",
                email :"",
                password :"",
                confirmPassword :"",
                notFoundErrors:null,
                unprocessErrors:null
            }
        },
        methods:{
            register(){
                this.$store.dispatch('register',{
                    firstName:this.firstName,
                    lastName:this.lastName,
                    email:this.email,
                    password:this.password,
                    confirmPassword:this.confirmPassword
                })
                .then(()=>{
                    this.$router.push({name:'Books'})
                })
                .catch(err=>{
                    console.log(err.response)
                    if(err.response.status == 400){
                        this.notFoundErrors = err.response.data.errors
                    }else if(err.response.status == 422){
                        this.unprocessErrors = err.response.data
                    }
                })
            }
        }
    }
</script>
