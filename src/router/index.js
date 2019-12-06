import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store';

Vue.use(VueRouter)

function verifyLogin(to, from, next) {
  if (Store.getters['user_auth/loggedIn']) {
    if (to.name === 'Dashboard') return next('/dashboard/home')
    else next()
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
      if (Store.getters['user_auth/loggedIn']) {
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
      },
      {
        path: 'departments',
        component: () => import('@/components/dashboard/departments/Departments.vue'),
        children: [
          {
            path: '',
            name: 'Find Department',
            component: () => import('@/components/dashboard/departments/FindDepartment.vue')
          },
          {
            path: 'new',
            name: 'New Department',
            component: () => import('@/components/dashboard/departments/NewDepartment.vue')
          }
        ]
      },
      {
        path: 'salaries',
        component: () => import('@/components/dashboard/salaries/Salaries.vue'),
        children: [
          {
            path: '',
            name: 'Payroll',
            component: () => import('@/components/dashboard/salaries/FindSalary.vue')
          }
        ]
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
