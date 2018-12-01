export default {
  setAuthUser(state, payload) {
    state.auth.user = payload.user
  },
  setUserRole(state, payload) {
    state.auth.role = payload
  },
  logout(state) {
    state.auth = {
      user: null,
      role: null,
    }
  }
}
