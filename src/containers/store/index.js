import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './auth'
import * as users from './users'

Vue.use(Vuex)

const state = {
  ...auth.state,
  ...users.state,
}

const mutations = {
  ...auth.mutations,
  ...users.mutations,
}

const actions = {
  ...auth.actions,
  ...users.actions,
}

const getters = {
  ...auth.getters,
  ...users.getters,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
