// action中可以发送异步ajax请求。
import {
  SET_TOKEN,
  GET_ROLES
} from "./mutations-type"

export default {
  async setToken ({ commit }, token) {
    commit(SET_TOKEN, { token })
  },

  async GET_ROLES ({ commit }, roles) {
    commit(GET_ROLES, { roles })
  }
}