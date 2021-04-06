// action中可以发送异步ajax请求。
import {
  SET_TOKEN
} from "./mutations-type"

export default {
  async setToken ({ commit }, roles) {
    commit(SET_TOKEN, { roles })
  }
}