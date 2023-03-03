import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'logIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/contact',
    name: 'contactUs',
    component: () => import('../views/contactPage.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
