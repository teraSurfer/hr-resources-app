import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store';

Vue.use(VueRouter)

function verifyLogin(to, from, next) {
  if(Store.getters['user_auth/loggedIn']) {
    console.log(to);
    if(to.name  === 'Dashboard') return next('/dashboard/home')
    next()
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: (to, from, next) => {
      if(Store.getters['user_auth/loggedIn']) {
        next('/dashboard/home')
      } else {
        next()
      }
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: (to, from, next) => verifyLogin(to, from, next),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/components/dashboard/home/Home.vue')
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: (to, from, next) => verifyLogin(to, from, next),
    component: () => import('@/views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
