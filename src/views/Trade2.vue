<template>
  <v-container fluid>

    <input v-focus @keyup.space="pressKey">

    <v-row>
      <v-col cols='8'>
        <!-- TOP BAR TO OPEN OR CLOSE CHARTS  -->
        <v-row>
          <v-col>
            <v-row align="center">
              <h4>SELECT CHARTS</h4>
              <v-divider class="mx-4" vertical></v-divider>
              <span>OrderBook</span>
              <v-btn icon @click="closeOrderBookChart">
                <v-icon small>{{ orderBookChartIcon }}</v-icon>
              </v-btn>
              <v-divider class="mx-4" vertical></v-divider>
              <span>Trades</span>
              <v-btn icon @click="closeTradesChart">
                <v-icon small>{{ tradesChartIcon }}</v-icon>
              </v-btn>
              <v-divider class="mx-4" vertical></v-divider>
              <span>Third</span>
              <v-btn icon @click="closeOrderBookChart">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <!-- CHART CARDS -->
        <v-row>
          <v-col>
            <v-card v-show="orderBookChartOpen" class="my-2" align="center" :dark="darkMode">
                <OrderBookChart
                  :databids="parsedbids"
                  :dataasks="parsedasks"
                  quote='BTC'
                  base='USD'
                  lastPrice=9200></OrderBookChart>
            </v-card>
            <v-card v-show="tradesChartOpen" class='my-2' :dark="darkMode">
                <OrderBookChart></OrderBookChart>
            </v-card>
            <v-card v-show="thirdChartOpen" class='my-2' :dark="darkMode">
                <OrderBookChart></OrderBookChart>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols='4'>
        <v-select
          v-model="selectedExchange"
          :items="availableExchanges"
          :menu-props="{ maxHeight: '400' }"
          label="Exchange"
          outlined
          :dark="darkMode"
        ></v-select>
        <v-select
          v-model="selectedSymbol"
          :items="availableSymbols[String(selectedExchange)]"
          :menu-props="{ maxHeight: '400' }"
          label="Symbol"
          outlined
          :dark="darkMode"
        ></v-select>
        <v-select
          v-model="selectedExecutionModel"
          :items="availableExecutionModels"
          :menu-props="{ maxHeight: '400' }"
          label="Execution Model"
          outlined
          :dark="darkMode"
        ></v-select>
        <v-text-field label="Volume" hide-details="auto"></v-text-field>
        <v-row>
          <v-col>
          <v-card>
            <v-btn width='50%' class='green'>
              Buy
            </v-btn>
            <v-btn width='50%' class='red'>
              Sell
            </v-btn>
          </v-card>
          </v-col>
        </v-row>
      </v-col>

    </v-row>

    <v-row>
      <v-col>
      <v-card class='px-5 py-2'>
        Pending Orders
      </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
      <v-card class='px-5 py-2'>
        Recent Trades
      </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import OrderBookChart from '@/components/content/OrderBookChart.vue'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Trade2',
  components: {
    OrderBookChart
  },
  data () {
    return {
      openWebsockets: [],
      // whether charts are open or closed
      orderBookChartOpen: true,
      tradesChartOpen: true,
      thirdChartOpen: true,
      // selects
      selectedExchange: 'kraken',
      selectedSymbol: 'XBT-USD',
      selectedExecutionModel: [],
      // available symbols for selected exchange
      exchangeSymbols: [],
      // bids and asks
      bids: [],
      asks: []
    }
  },
  computed: {
    ...mapGetters([
      'darkMode',
      'availableExchanges',
      'availableSymbols',
      'availableExecutionModels'
    ]),
    orderBookChartIcon () { return this.orderBookChartOpen ? 'mdi-close' : 'mdi-plus' },
    tradesChartIcon () { return this.tradesChartOpen ? 'mdi-close' : 'mdi-plus' },
    parsedasks () { return this.asks },
    parsedbids () { return this.bids }
  },
  watch: {
    getSymbolsForExchange () { this.exchangeSymbols = this.availableSymbols[String(this.selectedExchange)] }
  },
  methods: {
    ...mapActions([
      'fetchSnapshotOrderBook'
    ]),
    closeOrderBookChart () {
      this.orderBookChartOpen = !this.orderBookChartOpen
    },
    closeTradesChart () {
      this.tradesChartOpen = !this.tradesChartOpen
    },
    getSnapshotOrderBook () {
      var self = this
      console.log(self.selectedSymbol)
      axios.get('http://localhost:8000/json/public/orderbook/' + this.selectedExchange + '?symbol=' + this.selectedSymbol, { crossdomain: true })
        .then(function (response) {
          console.log(response.data)
          const parsed = response.data
          self.bids = Object.entries(parsed.bids)
          self.asks = Object.entries(parsed.asks)
          console.log(self.bids)
          self.bids.forEach(self.parsePrice)
          self.asks.forEach(self.parsePrice)
          console.log(self.bids)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    testlog () {
      console.log(this.selectedSymbol, this.selectedExchange)
    },
    pressKey (ev) {
      if (ev.code === 'Space') {
        console.log('Pressed the space key')
      } else if (ev.code === 'KeyB') {
        console.log('Press B => Buy Order')
      } else if (ev.code === 'KeyS') {
        console.log('Press S => Sell Order')
      } else {
        console.log('Pressed a key that is not space', ev.code)
      }
    },
    parsePrice (item) {
      item[0] = parseFloat(item)
    },
    // parsedBids () { return Object.entries(this.snapshotOrderBook['bids) },
    // parsedAsks () { return Object.entries(this.snapshotOrderBook.asks) }
    consumeWS () {
      var self = this
      // stream full orderbook snapshot
      var wsUri = 'ws://localhost:8000/ws/orderbook/snapshot'
      var stream = this.stream_ob_snapshot = new WebSocket(wsUri)
      this.openWebsockets.push(stream)
      this.stream_ob_snapshot.onopen = function (event) {
        console.log(event.data)
        console.log('Connected')
        console.log('Open WS: ', self.openWebsockets)
      }
      this.stream_ob_snapshot.onmessage = function (event) {
        try {
          var parsed = JSON.parse(JSON.parse(event.data))
          // parse dict into array of arrays
          var wsbids = Object.entries(parsed.bids)
          var wsasks = Object.entries(parsed.asks)
          // parse keys to floats
          wsbids.forEach(self.parsePrice)
          wsasks.forEach(self.parsePrice)
          // sort array of arrays in ascending key order
          self.bids = wsbids.sort(function (a, b) { return a[0] - b[0] })
          self.asks = wsasks.sort(function (a, b) { return a[0] - b[0] })
        } catch (error) {
          console.log('event.data : ', JSON.parse(event.data))
          console.log('event.data.bids : ', JSON.parse(JSON.parse(event.data)))

          // console.log(error)
        }
      }
    }
  },
  mounted () {
    const self = this
    window.addEventListener('keyup', function (ev) { self.pressKey(ev) })
  },
  created () {
    this.consumeWS()
  },
  beforeDestroy () {
    console.log('Exiting Page: Trade 2')
    console.log(this.openWebsockets)
    this.stream_ob_snapshot.close()
    // this.openWebsockets.forEach(function (socket) {
    //   // Soft close
    //   socket.close()
    //   console.log('Closing WS')

    //   process.nextTick(() => {
    //     if ([socket.OPEN, socket.CLOSING].includes(socket.readyState)) {
    //       // Socket still hangs, hard close
    //       socket.terminate()
    //     }
    //   })
    // })
  }
}
</script>
