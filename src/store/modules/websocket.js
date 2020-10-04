import axios from 'axios'

const state = {
  number: 0,
  availableStrats: '',
  subscribedFeedsPublic: '',
  availableExchanges: '',
  availableSymbols: '',
  availableExecutionModels: '',
  availableTimeframes: '',
  historicAccountBalance: '',
  snapshotOrderBook: '',
  notifications: []
}

const getters = {
  currentNumber: (state) => state.number,
  availableStrats: (state) => state.availableStrats,
  subscribedFeedsPublic: (state) => state.subscribedFeedsPublic,
  availableExchanges: (state) => state.availableExchanges,
  availableSymbols: (state) => state.availableSymbols,
  availableExecutionModels: (state) => state.availableExecutionModels,
  availableTimeframes: (state) => state.availableTimeframes,
  historicAccountBalance: (state) => state.historicAccountBalance,
  snapshotOrderBook: (state) => state.snapshotOrderBook,
  notifications: (state) => state.notifications
}

// TODO we need all functions to be sync so they execute in the order we want at App init
const actions = {
  updateNumber ({ commit, value }) {
    commit('setNumber', value)
  },
  updateAvailableStrats ({ commit, value }) {
    commit('setAvailableStrats', value)
  },
  updateSubscribedFeedsPublic ({ commit, value }) {
    commit('setSubscribedFeedsPublic', value)
  },
  async fetchAvailableExchanges ({ commit }) {
    var result = ''
    await axios.get(
      'http://localhost:8000/cache/config/available_exchanges',
      { crossdomain: true }
    )
      .then(function (response) {
        if (response.status === 200) {
          const parsed = JSON.parse(response.data)
          commit('setAvailableExchanges', parsed)
          result = parsed
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    console.log('Result is ', result)
    return result
    // const parsed = JSON.parse(response.data)
    // await commit('setAvailableExchanges', parsed)
    // return parsed
  },
  async fetchAvailableSymbols ({ commit }) {
    const response = await axios.get('http://localhost:8000/cache/config/available_pairs', { crossdomain: true })
    const parsed = JSON.parse(response.data)
    await commit('setAvailableSymbols', parsed)
  },
  async fetchAvailableExecutionModels ({ commit }) {
    const response = await axios.get('http://localhost:8000/cache/config/available_execution_models', { crossdomain: true })
    const parsed = JSON.parse(response.data)
    await commit('setAvailableExecutionModels', parsed)
  },
  async fetchAvailableTimeframes ({ commit }) {
    const response = await axios.get('http://localhost:8000/cache/config/available_timeframes', { crossdomain: true })
    const parsed = JSON.parse(response.data)
    await commit('setAvailableTimeframes', parsed)
  },
  updateAccountBalance ({ commit, value }) {
    commit('setUpdateAccountBalance', value)
  },
  async fetchHistoricAccountBalance ({ commit }) {
    const response = await axios.get('http://localhost:8000/historic/account_value', { crossdomain: true })
    const parsed = JSON.parse(response.data)
    await commit('setHistoricAccountBalance', parsed)
  },
  async fetchSnapshotOrderBook ({ commit, exchange, symbol }) {
    const response = await axios.get('http://localhost:8000/json/public/orderbook/' + exchange + '?symbol=' + symbol, { crossdomain: true })
    const parsed = JSON.parse(response.data)
    await commit('setSnapshotOrderBook', parsed)
  },
  //! does not work v
  async subPrivateFeeds ({ commit }) {
    for (const exchange in this.$store.availableExchanges) {
      await axios.post('http://localhost:8000/feeds/subscribe/private', { exchange: exchange, crossdomain: true })
    }
  }
}

const mutations = {
  setNumber (state, value) {
    state.number = value
  },
  setAvailableStrats (state, value) {
    state.availableStrats = value
  },
  setSubscribedFeedsPublic (state, value) {
    state.subscribedFeedsPublic = value
  },
  setAvailableExchanges (state, value) {
    state.availableExchanges = value
  },
  setAvailableSymbols (state, value) {
    state.availableSymbols = value
  },
  setAvailableExecutionModels (state, value) {
    state.availableExecutionModels = value
  },
  setAvailableTimeframes (state, value) {
    state.availableTimeframes = value
  },
  setHistoricAccountBalance (state, value) {
    state.historicAccountBalance = value
  },
  setUpdateAccountBalance (state, value) {
    state.historicAccountBalance.push(value)
  },
  setSnapshotOrderBook (state, value) {
    state.snapshotOrderBook = value
  },
  pushNotifications (state, value) {
    state.notifications.push(value)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
