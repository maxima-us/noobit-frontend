import axios from 'axios'

const state = {
  requestedExchangeTrade: '',
  requestedSymbolTrade: '',
  requestedTimeframeTrade: '',
  requestedDepthTrade: '',
  currentExchangeTrade: '',
  currentSymbolTrade: ''
}

const getters = {
  requestedExchangeTrade: (state) => state.requestedExchangeTrade,
  requestedSymbolTrade: (state) => state.requestedSymbolTrade,
  // we will start by defaulting to 1h candles because timeframe and depth
  // need to be set at subscription of ws
  requestedTimeframeTrade: (state) => state.requestedTimeframeTrade,
  requestedDepthTrade: (state) => state.requestedDepthTrade
}

const actions = {
  updateRequestedExchangeTrade ({ commit, value }) {
    commit('setRequestedExchangeTrade', value)
  },
  updateRequestedSymbolTrade ({ commit, value }) {
    commit('setRequestedSymbolTrade', value)
  },
  postRequestedParamsTrade ({ commit, getters }) {
    console.log('Requested exchange', getters.requestedExchangeTrade)
    const url = 'http://localhost:8000/config/update/requested/markets'
    axios.post(url, {
      exchange: getters.requestedExchangeTrade,
      symbol: getters.requestedSymbolTrade
    })
      .then(function (response) {
        if (response.status === 200) {
          commit('setCurrentExchangeTrade', getters.requestedExchangeTrade)
          commit('setCurrentSymbolTrade', getters.requestedSymbolTrade)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // async updateRequestedParams ({ commit, exchange, symbol }) {
  //   var url = 'http://localhost:8000/config/update/requested/tradechart'
  //   const response = await axios.post(url, {
  //     exchange: exchange,
  //     symbol: symbol
  //   })
  //     .then(function (response) {
  //       // if its an error we need to add push to notifications
  //       // if response.data.success === false { push to notifs }
  //       if (status.code === 200) {
  //         commit('setRequestedExchangeTrade', exchange)
  //         commit('setRequestedSymbolTrade', symbol)
  //       }
  //       console.log(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
}

const mutations = {
  setRequestedExchangeTrade (state, value) {
    state.requestedExchangeTrade = value
  },
  setRequestedSymbolTrade (state, value) {
    state.requestedSymbolTrade = value
  },
  setCurrentExchangeTrade (state, value) {
    state.currentExchangeTrade = value
  },
  setCurrentSymbolTrade (state, value) {
    state.currentSymbolTrade = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
