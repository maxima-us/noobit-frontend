<template>
  <v-app
    :class="apptest"
    :style="appBgColor"
    >

    <!-- NAVIGATION DRAWER -->
    <NavDrawer />

    <!-- APP BAR -->
    <SystemBar />

    <!-- CONTENT (v-model should be in v-select)-->
    <MainContent />

  </v-app>
</template>

<script>
import NavDrawer from '@/components/layout/NavDrawer.vue'
import SystemBar from '@/components/layout/SystemBar.vue'
import MainContent from '@/components/layout/MainContent.vue'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',

  data () {
    return {
      availableExchanges: ''
    }
  },

  computed: {
    ...mapGetters(['darkMode', 'isMobile']),
    appBgColor () { return (this.darkMode ? 'background-color: black' : 'background-color: ghostwhite') },
    dw_getWindowDims () {
      var doc = document
      var w = window
      var docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')
        ? doc.documentElement : doc.body
      var width = docEl.clientWidth
      var height = docEl.clientHeight
      // mobile zoomed in?
      if (w.innerWidth && width > w.innerWidth) {
        width = w.innerWidth
        height = w.innerHeight
      }
      return { width: width, height: height }
    },
    apptest () {
      var width = this.dw_getWindowDims.width
      var idValue = (width < 960 ? 'mobNavBar' : 'deskNavBar')
      return idValue
    },
    appDeviceID () {
      var width = this.dw_getWindowDims.width
      var idValue = (width < 960 ? 'mobSysBar' : 'deskSysBar')
      return idValue
    }
  },
  methods: {
    ...mapActions([
      'updateMobile',
      'updateNumber',
      'fetchAvailableExchanges',
      'fetchAvailableSymbols',
      'fetchAvailableExecutionModels',
      'fetchAvailableTimeframes',
      'fetchHistoricAccountBalance',
      'fetchSnapshotOrderBook',
      'fetchAccountHoldings'
    ])
  },
  components: {
    NavDrawer,
    SystemBar,
    MainContent
  },
  created () {
    var self = this

    // fetch datas at init and save to store
    this.fetchAvailableExchanges()
      .then(function (response) {
        console.log('Response is ', response)
        self.availableExchanges = JSON.parse(response.data)
      })
    this.fetchAvailableSymbols()
    this.fetchAvailableExecutionModels()
    this.fetchAvailableTimeframes()
    this.fetchHistoricAccountBalance()
    try {
      console.log('Available Exchanges', self.availableExchanges)
      for (const exchange of self.availableExchanges) {
        console.log('exchange holding for : ', exchange)
        self.fetchAccountHoldings(exchange)
      }
    } catch (error) {
      console.log(error)
    }

    // stream runtime.config from noobit-backend
    this.stream_config = new WebSocket('ws://localhost:8000/ws/runtime/config')
    this.stream_config.onopen = function (event) {
    }
    this.stream_config.onmessage = function (event) {
      var load = JSON.parse(event.data)
      // available_strats key contains a list of str
      self.$store.commit('setAvailableStrats', load.available_strategies)
      self.$store.commit('setSubscribedFeedsPublic', load.subscribed_feeds_public)
      self.$store.commit('setWebSocketStatus', load.websocket_status)
      // self.$store.commit(['setAvailableExchanges'], load.available_exchanges)
    }

    // stream account balance
    this.stream_account_balance = new WebSocket('ws://localhost:8000/ws/update/account_balance')
    this.stream_account_balance.onmessage = function (event) {
      var load = JSON.parse(event.data)
      self.$store.commit('setUpdateAccountBalance', load)
    }

    // stream notifications
    this.stream_notifications = new WebSocket('ws://localhost:8000/ws/notifications')
    this.stream_notifications.onmessage = function (event) {
      var load = JSON.parse(event.data)
      self.$store.commit('pushNotifications', load)
    }

    // stream market data
    this.market_data = new WebSocket('ws://localhost:8000/ws/market_data/snapshots')
    this.market_data.onmessage = function (event) {
      var load = JSON.parse(event.data)
      if (load.channel === 'orderbook') {
        self.$store.commit('setMarketDataSnapshotOrderbookAsks', load.asks)
        self.$store.commit('setMarketDataSnapshotOrderbookBids', load.bids)
        // console.log('orderbook stream', load)
      } else if (load.channel === 'trade') {
        self.$store.commit('setMarketDataSnapshotTrade', load.data)
        // console.log('trade stream', load)
      } else if (load.channel === 'ohlc') {
        // console.log('ohlc stream', load)
        self.$store.commit('setMarketDataSnapshotOhlc', load.data)
      }
      // add instrument and spread later
    }

    // stream account data
    this.account_data = new WebSocket('ws://localhost:8000/ws/account')
    this.account_data.onmessage = function (event) {
      var load = JSON.parse(event.data)
      if (load.channel === 'holdings') {
        // console.log('Account Balance', load.data)
        self.$store.commit('setAccountBalances', load.data)
      }
    }
  },
  beforeMount () {
    var self = this
    // connect to private feeds
    // console.log('Available Exchanges', self.availableExchanges)
    for (var exchange of self.availableExchanges) {
      var url = 'http://localhost:8000/feeds/subscribe/private'
      axios.post(url, {
        exchange: exchange
      })
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
// end EXPORT
</script>

<style lang="scss" scoped>
.desktopApp {
  margin: auto;
  width: 80%
}
.mobileApp {
  margin: auto;
  width: 100%
}
#systembar {
  margin: auto;
  text-align: center;
  left: 0%;
  right: 0%;
  width: 100%;
}
</style>
