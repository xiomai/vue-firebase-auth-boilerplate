import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './auth'
import * as users from './users'
import * as books from './books'

Vue.use(Vuex)

const state = {
  ...auth.state,
  ...users.state,
  ...books.state,
}

const mutations = {
  ...auth.mutations,
  ...users.mutations,
  ...books.mutations,
}

const actions = {
  ...auth.actions,
  ...users.actions,
  ...books.actions,
}

const getters = {
  ...auth.getters,
  ...users.getters,
  ...books.getters,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
