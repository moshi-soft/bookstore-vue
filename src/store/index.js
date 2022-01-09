import {createStore } from 'vuex'
import axios from 'axios'
export default createStore({
    state: {
        user:null
    },
    mutations: {
        SET_USER_DATA(state,userData){
            state.user = userData;
            localStorage.setItem('user',JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
        },
        // CLEAR_USER_DATA(state){
        //    state.user = null
        //    localStorage.removeItem('user')
        //    axios.defaults.headers.common['Authorization'] = null
        // },
        // alternate clearing data
        CLEAR_USER_DATA(){
            localStorage.removeItem('user')
           location.reload()
        }
    },
    actions: {
        register({commit},credentials){
            return axios.post('https://localhost:44344/api/Account/signup',credentials).then(
                ({data})=>{
                    commit('SET_USER_DATA',data)
                    console.log("user data is:",data)
                }
            )
        },
        login({commit},credentials){
            return axios.post('https://localhost:44344/api/Account/login',credentials).then(
                ({data})=>{
                    commit('SET_USER_DATA',data)
                    console.log("user data is:",data)
                }
            )
        },
        logout({commit}){
            commit('CLEAR_USER_DATA')
        }
    },
    getters:{
        loggedIn(state){
            return !!state.user
        }
    },
    modules: {
    }
  })