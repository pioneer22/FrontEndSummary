import {
  Login
} from "./mutations-type"

export default {
  [Login] (state, { user }) {
    state.user = user
  }
}