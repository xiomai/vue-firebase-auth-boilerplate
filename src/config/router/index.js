import Vue from 'vue'
import Router from 'vue-router'
import Home from "../../components/views/Home"
import Books from "../../components/views/Books"
import Students from "../../components/views/Students"
import SignIn from "../../components/views/Login"
import Logout from "../../components/views/Logout"
import store from "../../containers/store"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/manage/books',
      name: 'manage.books',
      component: Books,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/manage/students',
      name: 'manage.students',
      component: Students,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    /* {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        authRequired: true
      }
    } */
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.authUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
