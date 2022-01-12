<template>
<div class="container">
 <h1>Login:</h1>
  <div class="row">
    <div class="col"></div>
    <div class="col">
      <form @submit.prevent="login">
             <div class="mb-3">
                <label for="email" class='form-label float-start'>Email:</label>
                <input type="email" v-model="email" name="email" class="form-control">
            </div>
             <div class="mb-3">
                <label for="password" class='form-label float-start'>Password:</label>
                <input type="password" v-model="password" name="password" class="form-control">
            </div>
            <div class="alert-danger mb-3">
            {{error}}
            </div>
            <div class="mb-3">
                <button type='submit' name='button' class="btn btn-success">Login</button>
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
                email :"",
                password :"",
                error:""
            }
        },
        methods:{
            login(){
                this.$store.dispatch('login',{
                    email:this.email,
                    password:this.password
                })
                .then(()=>{
                    this.$router.push({name:'Books'})
                })
                .catch(err=>{
                    console.log(err.response)
                    this.error = 'Invalid email or password'
                })
            }
        }
    }
</script>
