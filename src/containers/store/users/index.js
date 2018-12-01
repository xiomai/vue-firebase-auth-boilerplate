import * as contants from "./contants"

const state = {
  users: contants.INITIAL_STATE.users
}

const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },
  clearUsers(state) {
    state.users = null
  },
}

const actions = {
  setUsers({
    commit
  }, users) {
    commit('setUsers', users)
  },
}

const getters = {
  users: state => state.users,
}

export {
  state,
  actions,
  mutations,
  getters
}
