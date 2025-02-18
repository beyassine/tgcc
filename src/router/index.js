import { createRouter, createWebHistory } from 'vue-router'

//APP
import Home from '../views/Home.vue'

const routes = [
    //HOME
    {
      path: '/',
      name: 'home',
      component: Home,
    },
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router