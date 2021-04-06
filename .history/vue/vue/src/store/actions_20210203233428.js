// action中可以发送异步ajax请求。
import {
  Login
} from "./mutations-type"

export default {
  async reqLogin ({ commit }, roles) {
    commit(Login, { roles })
  }
}