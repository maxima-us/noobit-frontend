import axios from 'axios'

const state = {
  accountBalances: '',
  accountExposure: '',
  accountHistoricBalance: ''
}

const getters = {
  accountBalances: (state) => state.accountBalances,
  accountExposure: (state) => state.accountExposure,
  accountHistoricNAV: (state) => state.accountHistoricNAV
}

const actions = {
  async fetchAccountHoldings ({ commit, exchange }) {
    try {
      const response = await axios.get('http://localhost:8000/json/private/balances/' + exchange)
      const parsed = JSON.parse(response.data)
      await commit('setAccountHoldings', exchange, parsed)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  setAccountBalances (state, value) {
    state.accountBalances = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
