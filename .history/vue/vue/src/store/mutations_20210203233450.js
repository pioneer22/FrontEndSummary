import {
  Login
} from "./mutations-type"

export default {
  [Login] (state, { roles }) {
    state.roles = roles
  }
}