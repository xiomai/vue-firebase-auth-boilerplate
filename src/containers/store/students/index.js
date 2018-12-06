import * as contants from "./contants"
import { orderBy, map } from "lodash"

const state = {
  students: contants.INITIAL_STATE.students
}

const mutations = {
  setStudents(state, payload) {
    state.students = payload
  },
  clearStudents(state) {
    state.students = null
  },
}

const actions = {
  setStudents({
    commit
  }, students) {
    commit('setStudents', students)
  },
}

const getters = {
  students: state => state.students,
  recentStudents: state => {
    const { students } = state
    const studentsWithKey = map(students, (book, key) =>({...book,key}))
    const orderedByAddedAt = orderBy(studentsWithKey, ['added_at'], ['desc'])

    return orderedByAddedAt.slice(0, 10)
  }
}

export {
  state,
  actions,
  mutations,
  getters
}
