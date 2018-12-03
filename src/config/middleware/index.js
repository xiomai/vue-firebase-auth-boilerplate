import store from "@/containers/store"

export default {
  authenticated(to, from, next) {
    if (!store.getters.authenticated) {
      next({
        name: 'login',
      })
      return
    }

    next()
  },

  siteAdmin(to, from, next) {
    if (!store.getters.authenticated || !store.getters.authIsAdmin) {
      next({
        name: 'home',
      })
      return
    }

    next()
  },

  superadmin(to, from, next) {
    if (!store.getters.authenticated || !store.getters.authIsSuperAdmin) {
      next({
        name: 'home',
      })
      return
    }

    next()
  },

  guest(to, from, next) {
    if (store.getters.authenticated) {
      next({
        name: 'home',
      });

      return
    }

    next();
  }
}
