<template>
  <v-container fluid>

    <v-row no-gutters class="pb-1">
      <v-col cols='7'>
        <v-card :dark="darkMode" flat style="border-radius: 0px">

        <!-- SELECT EXCHANGE -->
        <!-- <v-icon>mdi-chevron-double-right</v-icon> -->
        <span style="display: inline-block" class="px-2 mx-2">
          <v-autocomplete
            style="width: 110px"
            v-model="selectedExchange"
            :hint="!unlocked ? 'Locked' : 'Pick Exchange'"
            :items="availableExchanges"
            :readonly="!unlocked"
            persistent-hint
            dense
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                mode="out-in"
              >
              </v-slide-x-reverse-transition>
            </template>
          </v-autocomplete>
        </span>

        <!-- SELECT PAIR -->
        <v-icon>mdi-chevron-double-right</v-icon>
        <span style="display: inline-block" class="px-2 mx-2">
          <v-autocomplete
            style="width: 110px"
            v-model="selectedSymbol"
            :hint="!unlocked ? 'Locked' : 'Pick Pair'"
            :items="availableSymbols[String(selectedExchange)]"
            :readonly="!unlocked"
            persistent-hint
            dense
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                mode="out-in"
              >
              </v-slide-x-reverse-transition>
            </template>
          </v-autocomplete>
        </span>

        <!-- SELECT TIMEFRAME -->
        <v-icon>mdi-chevron-double-right</v-icon>
        <span style="display: inline-block" class="px-2 mx-2">
          <v-autocomplete
            style="width: 110px"
            v-model="selectedTimeframe"
            :hint="!unlocked ? 'Locked' : 'Pick Timeframe'"
            :items="availableTimeframes"
            :readonly="!unlocked"
            persistent-hint
            dense
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                mode="out-in"
              >
              </v-slide-x-reverse-transition>
            </template>
          </v-autocomplete>
        </span>

        <!-- UPDATE BUTTON -->
        <span style="display: inline-block" class="px-2 mx-2">
        <!-- BUTTON MUST ALSO CLEAR ALL PRESENT DATA -->
        <v-btn
          :disabled="!unlocked"
          @click="updatebackend"
          width=100%
        >
          <v-icon class='px-2'>mdi-update</v-icon>
          <span class='px-2'>Update</span>
        </v-btn>
        </span>

        </v-card>
      </v-col>

      <v-col cols='5'>
        <v-card :dark="darkMode" flat style="border-radius: 0px">

          <!-- SELECT STRATEGY -->
          <span style="display: inline-block" class="px-2 mx-2">
            <v-autocomplete
              style="width: 110px"
              v-model="selectedStrat"
              :hint="!unlocked ? 'Locked' : 'Pick Strategy'"
              :items="availableStrats"
              :readonly="!unlocked"
              persistent-hint
              dense
            >
              <template v-slot:append-outer>
                <v-slide-x-reverse-transition
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </template>
            </v-autocomplete>
          </span>

          <!-- SELECT EXECUTION MODEL -->
          <v-icon>mdi-chevron-double-right</v-icon>
          <span style="display: inline-block" class="px-2 mx-2">
            <v-autocomplete
              style="width: 110px"
              v-model="selectedExecutionModel"
              :hint="!unlocked ? 'Locked' : 'Pick Exec Model'"
              :items="availableExecutionModels"
              :readonly="!unlocked"
              persistent-hint
              dense
            >
              <template v-slot:append-outer>
                <v-slide-x-reverse-transition
                  mode="out-in"
                >
                </v-slide-x-reverse-transition>
              </template>
            </v-autocomplete>
          </span>

          <!-- RUN STRATEGY -->
          <span style="display: inline-block" class="px-2 mx-2">
          <v-btn
            :disabled="!unlocked"
            width=100%
          >
            <v-icon class='px-2'>mdi-rocket-launch</v-icon>
            <span class='px-2'>Run Strategy</span>
          </v-btn>
          </span>

        </v-card>
      </v-col>
    </v-row>

    <!-- SECOND ROW CONTAINING CHART AND BOOKS AND TRADES -->
    <v-row dense>

      <!-- LEFT COLUMN CONTAINING CHART AND BELOW TABS -->
      <v-col cols='7'>
        <AccountBalance style="border-radius: 0px"></AccountBalance>
        <v-tabs fixed-tabs :dark="darkMode" height=30 class="mt-2">
          <v-tab>Trades</v-tab>
            <v-tab-item>
              <v-data-table
                :dark="darkMode"
                class="tabsTableHeight"
                fixed-header
                >
              </v-data-table>
            </v-tab-item>
          <v-tab>Orders</v-tab>
            <v-tab-item>
              <v-data-table
                :dark="darkMode"
                class="tabsTableHeight"
                fixed-header
                >
              </v-data-table>
            </v-tab-item>
          <v-tab>Performance</v-tab>
            <v-tab-item>
              <v-data-table
                :dark="darkMode"
                class="tabsTableHeight"
                fixed-header
              >
              </v-data-table>
            </v-tab-item>
          <v-tab>Monitor</v-tab>
            <v-tab-item>
              <v-data-table
                :dark="darkMode"
                class="tabsTableHeight"
                fixed-header
              >
              </v-data-table>
            </v-tab-item>
        </v-tabs>
      </v-col>

      <!-- RIGHT COLUMN CONTAINING ORDERBOOK AND PUBLIC TRADES -->
      <v-col cols='5'>
        <v-row no-gutters>

          <!-- ORDERBOOK -->
          <v-col cols=7>
                <v-simple-table height=32 :dark=darkMode dense style="border-radius: 0px">

                <thead>
                  <tr>
                    <th class="text-center">Price</th>
                    <th class="text-center">User</th>
                    <th class="text-center">Size</th>
                    <th class="text-center">Total</th>
                  </tr>
                </thead>
                </v-simple-table>
            <v-simple-table
              dense
              :dark="darkMode"
              class="properHeight"
            >
              <template v-slot:default>
                <tbody>
                  <tr v-for="ask in asks" :key="ask.price">
                    <td class='red--text text-caption'>{{ ask.price }}</td>
                    <td class='text-caption text-left'>{{ ask.user }}</td>
                    <td class='text-caption text-right' :style="asksLevelGradientFill(ask)">{{ ask.size }}</td>
                    <!-- <td class='text-caption' style='background: linear-gradient(to left, rgba(213, 16, 16, 0.36) 70%, rgba(255, 255, 255, 0.1) 71%)'>{{ ask.total }}</td> -->
                    <td class='text-caption text-right' :style="asksTotalGradientFill(ask)">{{ ask.total }}</td>

                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-simple-table
              dense
              :dark="darkMode"
              class="properHeight"
            >
              <template v-slot:default>
                <tbody>
                  <tr v-for="bid in bids" :key="bid.price">
                    <td class='green--text text-caption text-left'>{{ bid.price }}</td>
                    <td class='text-caption text-left'>{{ bid.user }}</td>
                    <td class='text-caption text-right' :style="bidsLevelGradientFill(bid)">{{ bid.size }}</td>
                    <td class='text-caption text-right' :style="bidsTotalGradientFill(bid)">{{ bid.total }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>

          <!-- PUBLIC TRADES -->
          <v-col cols=5>
            <v-simple-table
              dense
              :dark="darkMode"
              height=80vh
              style="border-radius: 0px"
              fixed-header
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Price</th>
                    <th class="text-left">Size</th>
                    <th class="text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="trade in trades" :key="trade.price">
                    <td :class='tradeColorPrice(trade)'>{{ trade.price }}</td>
                    <td class='text-caption'>{{ trade.size }}</td>
                    <td class='text-caption'>{{ trade.time }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols='7' class='blue'>
        <v-row no-gutters>
          <v-tabs
            fixed-tabs
            :dark="darkMode"
          >
            <v-tab>
              User Trades
            </v-tab>
            <v-tab-item>
              Kek
            </v-tab-item>
            <v-tab>
              User Orders
            </v-tab>

          </v-tabs>

        </v-row>

        <v-row no-gutters>
          <v-col cols='8'>
            Strat Trades (including pnl for each)
            This should be basic and have more detail in control panel
          </v-col>
          <v-col cols='4'>
            Strat Order History (also show orders we closed)
            Will need max height
          </v-col>
        </v-row>
      </v-col>
      <v-col cols='5' class='green'>
        Running Strategies
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AccountBalance from '@/components/content/AccountBalanceChart.vue'
import axios from 'axios'

export default {
  name: 'Markets',
  components: {
    AccountBalance
  },
  data () {
    return {
      unlocked: true,
      exchange: 'Select',
      // selected = from dropdowns
      selectedExchange: null,
      selectedSymbol: null,
      selectedTimeframe: null,
      selectedStrat: null,
      selectedExecutionModel: null,
      // current = pair for chart / orderbook / trade
      currentExchange: null,
      currentSymbol: null,
      currentTimeframe: null,
      // need to be sorted in desc order according to timestamp
      trades: [],
      // need to be sorted in desc order according to price
      asks: [],
      // need to sorted in desc order according to price
      bids: []
    }
  },
  computed: {
    ...mapGetters([
      'darkMode',
      'availableExchanges',
      'availableSymbols',
      'availableTimeframes',
      'availableStrats',
      'availableExecutionModels',
      'requestedExchangeTrade',
      'requestedSymbolTrade'
    ])
  },
  methods: {
    ...mapActions([
      'updateRequestedExchangeTrade',
      'updateRequestedSymbolTrade',
      'postRequestedParamsTrade'
    ]),
    updatebackend () {
      this.$store.commit('setRequestedExchangeTrade', this.selectedExchange)
      this.$store.commit('setRequestedSymbolTrade', this.selectedSymbol)
      console.log('this.requestedExchangeTrade', this.requestedExchangeTrade)
      this.postRequestedParamsTrade()
    },
    updateCurrent () {
      this.currentExchange = this.selectedExchange
      this.currentSymbol = this.selectedSymbol
      this.currentTimeframe = this.selectedTimeframe
      var self = this
      var url = 'http://localhost:8000/config/update/requested/tradechart'
      axios.post(url, {
        exchange: self.currentExchange,
        symbol: self.currentSymbol
      })
        .then(function (response) {
          // if its an error we need to add push to notifications
          // if response.data.success === false { push to notifs }
          console.log('response code', response.status)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    tradeColorPrice (trade) {
      return (trade.side === 'buy' ? 'green--text text-caption' : 'red--text text-caption')
    },
    asksTotalGradientFill (ask, max = 500) {
      return `background: linear-gradient(to left, rgba(213, 16, 16, 0.3) ${ask.total * 100 / max}%, rgba(255, 255, 255, 0.01) ${(ask.total + 1) * 100 / max}%)`
    },
    bidsTotalGradientFill (bid, max = 500) {
      return `background: linear-gradient(to left, rgba(11, 226, 13, 0.3) ${bid.total * 100 / max}%, rgba(255, 255, 255, 0.01) ${(bid.total + 1) * 100 / max}%)`
    },
    asksLevelGradientFill (ask, max = 100) {
      return `background: linear-gradient(to left, rgba(213, 16, 16, 0.3) ${ask.size * 100 / max}%, rgba(255, 255, 255, 0.01) ${(ask.size + 1) * 100 / max}%)`
    },
    bidsLevelGradientFill (bid, max = 100) {
      return `background: linear-gradient(to left, rgba(11, 226, 13, 0.3) ${bid.size * 100 / max}%, rgba(255, 255, 255, 0.01) ${(bid.size + 1) * 100 / max}%)`
    },
    parsePrice (item) {
      item[0] = parseFloat(item)
    },
    streamOB () {
      var self = this
      // stream full orderbook snapshot
      var wsUri = 'ws://localhost:8000/ws/orderbook/snapshot'
      var stream = new WebSocket(wsUri)
      stream.onopen = function (event) {
        console.log(event.data)
        console.log('Connected')
        console.log('Open WS: ', self.openWebsockets)
      }
      stream.onmessage = function (event) {
        try {
          var parsed = JSON.parse(JSON.parse(event.data))
          console.log(parsed)
          if (parsed.exchange === self.currentExchange && parsed.symbol === self.currentSymbol) {

            //! parsing asks
            var newasks = []

            // convert dict to arrays of arrays so can sort by ascending price (order needed to calculate totals properly)
            var sortasks = Object.entries(parsed.asks).sort(function (a, b) { return a[0] - b[0] })

            // calculate totals
            for (let i = 0; i < sortasks.length; i++) {
              var totalAsks = parseInt(i) === 0 ? sortasks[i][1] : sortasks[i][1] + sortasks[i - 1][2]
              sortasks[i].push(totalAsks)
            }

            // sort again in descending order so we can display on graph
            var descendingAsks = sortasks.sort(function (a, b) { return b[0] - a[0] })

            // put everything in a list of dicts so we have columnn names for vuetify
            for (const ask of descendingAsks) {
              newasks.push(
                {
                  price: parseFloat(ask[0]).toFixed(2),
                  size: parseFloat(ask[1]).toFixed(2),
                  total: parseFloat(ask[2]).toFixed(2)
                }
              )
            }
            self.asks = newasks
            //! end parsing asks

            //! parsing bids
            var newbids = []

            // convert dict to arrays of arrays so can sort by descending price (order needed to calculate totals properly)
            var sortbids = Object.entries(parsed.bids).sort(function (a, b) { return b[0] - a[0] })

            // calculate totals
            for (let i = 0; i < sortbids.length; i++) {
              var totalBids = parseInt(i) === 0 ? sortbids[i][1] : sortbids[i][1] + sortbids[i - 1][2]
              sortbids[i].push(totalBids)
            }

            // sort again in descending order so we can display on graph
            var descendingBids = sortbids.sort(function (a, b) { return b[0] - a[0] })

            // put everything in a list of dicts so we have columnn names for vuetify
            for (const bid of descendingBids) {
              newbids.push(
                {
                  price: parseFloat(bid[0]).toFixed(2),
                  size: parseFloat(bid[1]).toFixed(2),
                  total: parseFloat(bid[2]).toFixed(2)
                }
              )
            }
            self.bids = newbids
            //! end parsing bids

            // parse dict into array of arrays
            // var wsbids = Object.entries(parsed.bids)
            // var wsasks = Object.entries(parsed.asks)
            // parse keys to floats
            // wsbids.forEach(self.parsePrice)
            // wsasks.forEach(self.parsePrice)
            // sort array of arrays in descending key order
            // self.bids = wsbids.sort(function (a, b) { return b[0] - a[0] })
            // self.asks = wsasks.sort(function (a, b) { return b[0] - a[0] })
            console.log(self.bids)
          }
        } catch (error) {
          console.log('event.data : ', JSON.parse(event.data))
          console.log('event.data.bids : ', JSON.parse(JSON.parse(event.data)))
          // console.log(error)
        }
      }
    },
    streamTrade () {
      var self = this
      // stream full orderbook snapshot
      var wsUri = 'ws://localhost:8000/ws/trade/snapshot'
      var stream = new WebSocket(wsUri)
      stream.onopen = function (event) {
        console.log(event.data)
        console.log('Connected')
        console.log('Open WS: ', self.openWebsockets)
      }
      stream.onmessage = function (event) {
        try {
          var parsed = JSON.parse(JSON.parse(event.data))
          var newTrades = []

          // sort trades in descending time order
          var descendingTime = Object.values(parsed).sort(function (a, b) {
            return b.transactTime - a.transactTime
          })

          // put everything in a list of dicts so we have columnn names for vuetify
          for (const trade of descendingTime) {
            if (trade.exchange === self.currentExchange && trade.symbol === self.currentSymbol) {
              newTrades.push(
                {
                  price: parseFloat(trade.avgPx).toFixed(2),
                  size: parseFloat(trade.cumQty).toFixed(2),
                  time: parseFloat(trade.transactTime).toFixed(2),
                  side: trade.side
                }
              )
            }
          }
          self.trades = newTrades
          console.log(newTrades)
        } catch (error) {
          console.log('event.data : ', JSON.parse(event.data))
          console.log(error)
        }
      }
    }
  },
  created () {
    this.streamOB()
    this.streamTrade()
  }
}
</script>

<style>

v-simple-table {
  border-radius: 0px !important;
}

tr, tbody {
  text-align: left;
}

td {
  height: 10px !important;
  border-bottom: 0px !important;
}

v-data-table {
  border-radius: 0px;
}

v-tab-item {
  border-radius: 0px !important;
}

v-tab {
  border-radius: 0px !important;
}

.tabsTableHeight {
  height: calc(30vh - 30px);
  border-radius: 0px;
}

.properHeight {
  height: calc(40vh - 16px);
  border-radius: 0px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
