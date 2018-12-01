import Vue from 'vue'
import Router from 'vue-router'
import {
  Home,
  Books,
  Students,
  Account,
  SignIn,
  Logout,
  ManageUsers,
  PageNotFound,
} from "../../components/views"
import Middleware from "../middleware"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: Middleware.authenticated
    },
    {
      path: '/manage/books',
      name: 'manage.books',
      component: Books,
      beforeEnter: Middleware.authenticated
    },
    {
      path: '/manage/students',
      name: 'manage.students',
      component: Students,
      beforeEnter: Middleware.authenticated
    },
    {
      path: '/manage/users',
      name: 'manage.users',
      component: ManageUsers,
      beforeEnter: Middleware.superadmin
    },
    {
      path: 'account',
      name: 'manage.account',
      component: Account,
      beforeEnter: Middleware.authenticated
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn,
      beforeEnter: Middleware.guest
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
})

export default router
