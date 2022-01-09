import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Books from '../views/Books.vue'
import BookDetail from '../views/BookDetail.vue'
import BookAdd from '../views/BookAdd.vue'
import BookEdit from '../views/BookEdit.vue'
import RegisterUser from '../views/RegisterUser.vue'
import LoginUser from '../views/LoginUser.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Books',
    // meta property allowes us to add custom attributes to the route
    component: Books,
    meta:{
      requiresAuth:true
    },

  },
  {
    path: '/books/:id/detail',
    name: 'BookDetail',
    component: BookDetail,
    meta:{
      requiresAuth:true
    },


  },
  {
    path: '/books/new',
    name: 'BookAdd',
    component: BookAdd,
    meta:{
      requiresAuth:true
    },


  },
  {
    path: '/books/:id/edit',
    name: 'BookEdit',
    component: BookEdit,
    meta:{
      requiresAuth:true
    },


  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  const loggedIn = localStorage.getItem('user')
  if(to.matched.some(record=>record.meta.requiresAuth && !loggedIn)){
      next('/login')
  }else{
    next()
  }
})

export default router
