<template>
  <v-container fluid>

    <v-row>
      <v-col>
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
          <v-col v-show="orderBookChartOpen">
            <v-card class='px-5 py-2' :dark="darkMode">
              <v-row align="center">
                <OrderBookChart></OrderBookChart>
              </v-row>
            </v-card>
          </v-col>
          <v-col v-show="tradesChartOpen">
            <v-card class='px-5 py-2' :dark="darkMode">
              <v-row align="center">
                <OrderBookChart></OrderBookChart>
              </v-row>
            </v-card>
          </v-col>
          <v-col :style="showThird">
            <v-card class='px-5 py-2' :dark="darkMode">
              <v-row align="center">
                <span>Third</span>
                <v-spacer></v-spacer>
              </v-row>
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
          :items="availableSymbols"
          :menu-props="{ maxHeight: '400' }"
          label="Symbol"
          outlined
          :dark="darkMode"
        ></v-select>
        <v-select
          v-model="selectedExecModel"
          :items="availableExecModels"
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
import { mapGetters } from 'vuex'

export default {
  name: 'Trade',
  components: {
    OrderBookChart
  },
  computed: {
    ...mapGetters(['darkMode']),
    orderBookChartIcon () { return this.orderBookChartOpen ? 'mdi-close' : 'mdi-plus' },
    tradesChartIcon () { return this.tradesChartOpen ? 'mdi-close' : 'mdi-plus' }
  },
  data () {
    return {
      orderBookChartOpen: true,
      tradesChartOpen: true
    }
  },
  methods: {
    closeOrderBookChart () {
      this.orderBookChartOpen = !this.orderBookChartOpen
    },
    closeTradesChart () {
      this.tradesChartOpen = !this.tradesChartOpen
    }
  }
}
</script>
