const state = {
  drawer: true,
  darkmode: true,
  mobile: false
}

const getters = {
  drawerState: (state) => state.drawer,
  darkMode: (state) => state.darkmode,
  isMobile: (state) => state.mobile
}

const actions = {
  updateDrawer ({ commit, state }) {
    commit('setDrawer', !state.drawer)
  },
  updateDarkMode ({ commit, state }) {
    commit('setDarkMode', !state.darkmode)
  },
  updateMobile ({ commit, value }) {
    commit('setMobile', value)
  }
}

const mutations = {
  setDrawer (state, value) {
    state.drawer = value
  },
  setDarkMode (state, value) {
    state.darkmode = value
  },
  setMobile (state, value) {
    state.mobile = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
