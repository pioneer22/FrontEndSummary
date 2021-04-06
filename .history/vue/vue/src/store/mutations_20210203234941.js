import {
  SET_TOKEN
} from "./mutations-type"

export default {
  [SET_TOKEN] (state, { roles }) {
    state.roles = roles
  }
}