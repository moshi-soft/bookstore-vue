import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Books from '../views/Books.vue'
import BookDetail from '../views/BookDetail.vue'
import BookAdd from '../views/BookAdd.vue'
import BookEdit from '../views/BookEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: Books

  },
  {
    path: '/books/:id/detail',
    name: 'BookDetail',
    component: BookDetail

  },
  {
    path: '/books/new',
    name: 'BookAdd',
    component: BookAdd

  },
  {
    path: '/books/:id/edit',
    name: 'BookEdit',
    component: BookEdit

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
