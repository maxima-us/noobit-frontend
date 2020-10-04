import Vue from 'vue'
import Vuex from 'vuex'
import navbars from './modules/nav'
import websockets from './modules/websocket'
import tradePage from './modules/tradePage'
import marketData from './modules/marketData'
import account from './modules/account'
import runtime from './modules/runtime'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    navbars,
    websockets,
    tradePage,
    marketData,
    account,
    runtime
  }
})
