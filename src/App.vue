<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> | -->
    <router-link v-if="loggedIn" to="/">Books</router-link> |
    <router-link v-if="!loggedIn" to="/register">Sign Up</router-link> |
    <router-link v-if="!loggedIn" to="/login">Login</router-link> 
    <button v-else type="button" class="btn btn-info" @click="logout">
     Logout
    </button>
    
    <!-- <router-link to="/books/id">Book Detail</router-link> -->
    
  </div>
  <router-view/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</template>
<script>
import {authComputed} from '@/store/helper.js'
import axios from 'axios'
export default{
  computed:{
    ...authComputed
  }, 
  created(){
    // automatic login
    const userString = localStorage.getItem('user')
    if(userString){
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA',userData)
    }
    // for security purpose so that fake login does not work
    axios.interceptors.response.use(
      response=>response,
      error=>{
        if(error.response.status === 401){
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    }
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
