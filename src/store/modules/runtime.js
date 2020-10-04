const state = {
  runtimeWebSocketStatus: ''
}

const getters = {
  runtimeWebSocketStatus: (state) => state.runtimeWebSocketStatus
}

const actions = {
  updateWebSocketStatus ({ commit, value }) {
    commit('setWebSocketStatus', value)
  }
}

const mutations = {
  setWebSocketStatus (state, value) {
    state.runtimeWebSocketStatus = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
