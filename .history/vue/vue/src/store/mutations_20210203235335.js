import {
  SET_TOKEN,
  GET_ROLES
} from "./mutations-type"

export default {
  [SET_TOKEN] (state, { token }) {
    state.token = token
  },

  [GET_ROLES] (state, { roles }) {
    state.roles = roles
  }
}