import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '../views/public/Home.vue'
import Admin from '../views/admin/Admin.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Products_List from '../views/admin/products/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  },
  {
    path: '/admin',
    //name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Admin,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'categories',
        name: 'Categories_Manage',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/categories/Manage.vue'),
      },
      {
        path: 'categories/create',
        name: 'Categories_Create',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/categories/Create.vue'),
      },
      {
        path: 'categories/:id/edit',
        name: 'Categories_Edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/categories/Edit.vue'),
      },
      {
        path: 'products',
        name: 'Products_List',
        component: Products_List,
      },
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/List.vue'),
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next ({
          name: 'Login',
        })
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
