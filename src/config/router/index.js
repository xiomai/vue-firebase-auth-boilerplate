import Vue from 'vue'
import Router from 'vue-router'
import Middleware from "@/config/middleware"

const PageNotFound = () => import(/* webpackChunkName: "public-routes" */ '@/components/views/PageNotFound.vue')
const Logout = () => import(/* webpackChunkName: "public-routes" */ '@/components/views/Logout')
const Login = () => import(/* webpackChunkName: "public-routes" */ '@/components/views/Login')
const Home = () => import(/* webpackChunkName: "authenticated-routes" */ '@/components/views/Home')
const Books = () => import(/* webpackChunkName: "authenticated-routes" */ '@/components/views/Books')
const Students = () => import(/* webpackChunkName: "authenticated-routes" */ '@/components/views/Students')
const Account = () => import(/* webpackChunkName: "authenticated-routes" */ '@/components/views/Account')
const ManageUsers = () => import(/* webpackChunkName: "superadmin-routes" */ '@/components/views/ManageUsers')

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
      component: Login,
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
