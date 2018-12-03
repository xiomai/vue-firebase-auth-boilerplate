import store from "@/containers/store"

export default {
  authenticated(to, from, next) {
    if (!store.getters.authUser) {
      next({
        name: 'login',
      })
      return
    }

    next()
  },

  superadmin(to, from, next) {
    if (!store.getters.authUser || !store.getters.authIsSuperAdmin) {
      next({
        name: 'home',
      })
      return
    }

    next()
  },

  guest(to, from, next) {
    if (store.getters.authUser) {
      next({
        name: 'home',
      });

      return
    }

    next();
  }
}
