import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  authUser: null,
  loginError: '',
}

const mutations = {
  setAuthUser(state, payload) {
    state.authUser = payload.user
  },
  loginError(state) {
    state.loginError = 'Login error'
  },
  clearLoginError(state) {
    state.loginError = ''
  },
  logout(state) {
    state.authUser = null
  }
}

const actions = {
  login ({commit}, authUser) {
    commit('clearLoginError')
    commit('setAuthUser', authUser)
  },
  loginError ({commit}) {
    commit('loginError')
    setTimeout(function() {commit('clearLoginError')}, 2000)
  },
  logout ({commit}) {
    commit('logout')
  }
}

const getters = {
  authUser: state => state.authUser
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
