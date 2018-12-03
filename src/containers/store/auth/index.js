import { isEmpty } from "lodash";
import * as contants from "./contants"
import actions from "./actions"
import mutations from "./mutations"


const state = {
  auth: {
    ...contants.AUTH_INITIAL_STATE
  },
}

const getters = {
  authenticated: state => !isEmpty(state.auth.user),
  authUser: state => state.auth.user,
  authRole: state => state.auth.role,
  authIsSuperAdmin: state => state.auth.role && state.auth.role === "superadmin",
  authIsAdmin: state => state.auth.role && (state.auth.role === "admin" || state.auth.role === "superadmin"),
}

export {
  state,
  actions,
  mutations,
  getters
}
