const state = {
  marketDataSnapshotOrderbookAsks: '',
  marketDataSnapshotOrderbookBids: '',
  marketDataSnapshotTrade: '',
  marketDataSnapshotInstrument: '',
  marketDataSnapshotSpread: '',
  marketDataSnapshotOhlc: ''
}

const getters = {
  marketDataSnapshotOrderbookAsks: (state) => state.marketDataSnapshotOrderbookAsks,
  marketDataSnapshotOrderbookBids: (state) => state.marketDataSnapshotOrderbookBids,
  marketDataSnapshotTrade: (state) => state.marketDataSnapshotTrade,
  marketDataSnapshotInstrument: (state) => state.marketDataSnapshotInstrument,
  marketDataSnapshotSpread: (state) => state.marketDataSnapshotSpread,
  marketDataSnapshotOhlc: (state) => state.marketDataSnapshotOhlc
}

const actions = {
  updateMarketDataSnapshotOrderbookAsks ({ commit, value }) {
    commit('setMarketDataSnapshotOrderbookAsks', value)
  },
  updateMarketDataSnapshotOrderbookBids ({ commit, value }) {
    commit('setMarketDataSnapshotOrderbookBids', value)
  },
  updateMarketDataSnapshotTrade ({ commit, value }) {
    commit('setMarketDataSnapshotTrade', value)
  },
  updateMarketDataSnapshotInstrument ({ commit, value }) {
    commit('setMarketDataSnapshotInstrument', value)
  },
  updateMarketDataSnapshotSpread ({ commit, value }) {
    commit('setMarketDataSnapshotSpread', value)
  },
  updateMarketDataSnapshotOhlc ({ commit, value }) {
    commit('setMarketDataSnapshotOhlc', value)
  }
}

const mutations = {
  setMarketDataSnapshotOrderbookAsks (state, value) {
    state.marketDataSnapshotOrderbookAsks = value
  },
  setMarketDataSnapshotOrderbookBids (state, value) {
    state.marketDataSnapshotOrderbookBids = value
  },
  setMarketDataSnapshotTrade (state, value) {
    state.marketDataSnapshotTrade = value
  },
  setMarketDataSnapshotInstrument (state, value) {
    state.marketDataSnapshotInstrument = value
  },
  setMarketDataSnapshotSpread (state, value) {
    state.marketDataSnapshotSpread = value
  },
  setMarketDataSnapshotOhlc (state, value) {
    state.marketDataSnapshotOhlc = value
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
