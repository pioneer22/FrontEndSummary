// action中可以发送异步ajax请求。
import {
  Login
} from "./mutations-type"

export default {
  async reqLogin ({ commit }, user) {
    commit(Login, { user })
  }
}