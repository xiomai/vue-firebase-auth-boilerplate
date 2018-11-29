import Vue from 'vue'
import Router from 'vue-router'
import { 
  Home, 
  Books, 
  Students, 
  Account, 
  SignIn, 
  Logout, 
PageNotFound,
} from "../../components/views"
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
      path: 'books',
      name: 'manage.books',
      component: Books,
      meta: {
        authRequired: true
      }
    },
    {
      path: 'students',
      name: 'manage.students',
      component: Students,
      meta: {
        authRequired: true
      }
    },
    {
      path: 'account',
      name: 'manage.account',
      component: Account,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn,
      meta: {
        guestRequired: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    { path: "*", component: PageNotFound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.authUser) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.state.authUser) {
      next({
        name: 'home',
      });
    } else {
      next();
    }
  }  else {
    next()
  }
})

export default router
