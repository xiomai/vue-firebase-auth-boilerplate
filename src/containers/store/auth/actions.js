import {
  onceGetRole
} from "@/config/firebase/models/roles"

export default {
  login({
    commit
  }, authUser) {
    commit('setAuthUser', authUser)
  },
  logout({
    commit
  }) {
    commit('logout')
  },
  async fetchRole({
    commit
  }, authUserId) {

    try {
      const snapshot = await onceGetRole(authUserId)
      commit('setUserRole', snapshot.val())
    } catch (error) {
      /* eslint-disable-next-line */
      console.log(error.code, error.message)
    }
  }
}
