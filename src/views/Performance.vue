<template>
  <v-container fluid>
    <div>
      <span>Launch New Strategy</span>
      <v-btn icon>
        <v-icon small>mdi-lock</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col cols="2">
      <v-select label="Strategy"></v-select>
      </v-col>
      <v-col cols="2">
      <v-select label="Exchange"></v-select>
      </v-col>
      <v-col cols="2">
      <v-select label="Symbol"></v-select>
      </v-col>
      <v-col cols="2">
      <v-select label="Timeframe"></v-select>
      </v-col>
      <v-col cols="2">
      <v-select label="Execution Model"></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn
          :disabled="!unlocked"
          @click="validate"
          width=100%
        >
          <v-icon class='px-2'>mdi-rocket-launch</v-icon>
          <span class='px-2'>Run Strategy</span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Strat Global Performance -->
    <v-row>
      <v-col cols='12'>
        <h3 class="py-5">Strategy Global Performance</h3>
        <div class="red--text">Maybe we should have a card for each graph</div>
        <div class="red--text">We will also need to display graph of evolution of each strat balance</div>
        <v-data-table
        :headers="stratTableHeaders"
        :items="stratTableData"
        class="elevation-1"
        :dark="darkMode"
        dense
        calculate-widths
        >
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox disabled :value="item.active"></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Recent Trades -->
    <v-row>
      <v-col cols='12'>
        <h3 class="py-5">Recent Trades (maybe for each row there should be an option to expand to view more detail)</h3>
        <v-data-table
        :headers="tradesTableHeaders"
        :items="tradesTableData"
        class="elevation-1"
        :dark="darkMode"
        dense
        calculate-widths
        item-key="strategy"
        show-expand
        single-expand
        :expanded-sync="expanded"
        >
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox v-model="item.active"></v-simple-checkbox>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">More info about {{ item.strategy }}</td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <h3 class="py-5">Recent Orders (following our backend py model)</h3>
        <v-data-table
        :headers="orderTableHeaders"
        :items="orderTableData"
        class="elevation-1"
        :dark="darkMode"
        dense
        calculate-widths
        >
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox v-model="item.active"></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <h3 class="py-5">Recent Trades (following our backend py model)</h3>
        <v-data-table
        :headers="pyTradesTableHeaders"
        :items="pyTradesTableData"
        class="elevation-1"
        :dark="darkMode"
        dense
        calculate-widths
        >
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox v-model="item.active"></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Performance',
  data () {
    return {
      expanded: [],
      //! STRAT TABLE
      stratTableHeaders: [
        { text: 'Strategy', value: 'strategy' },
        { text: 'Exchange', value: 'exchange' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Timeframe', value: 'timeframe' },
        { text: 'Execution Model', value: 'execModel' },
        { text: 'Trades #', value: 'tradesAmt' },
        { text: 'Win Percentage (%)', value: 'winPerc' },
        { text: 'Total PnL (%)', value: 'totalPnL' },
        { text: 'Session Start', value: 'sessionStart' },
        { text: 'Session End', value: 'sessionEnd' },
        { text: 'Average Trade PnL (%)', value: 'averagePnL' },
        { text: 'Active', value: 'active' }
      ],
      stratTableData: [
        {
          strategy: 'mock_strat',
          exchange: 'kraken',
          symbol: 'XBT-USD',
          timeframe: 60,
          execModel: 'limit chase',
          tradesAmt: 300,
          winPerc: 50,
          totalPnL: 258,
          sessionStart: '20/05/2019 - 06:23',
          averagePnL: 17,
          active: true
        },
        {
          strategy: 'other_strat',
          exchange: 'kraken',
          symbol: 'ETH-USD',
          timeframe: 15,
          execModel: 'limit chase',
          tradesAmt: 230,
          winPerc: 70,
          totalPnL: 89,
          sessionStart: '20/12/2019 - 06:23',
          sessionEnd: '22/12/2019 - 10:33',
          averagePnL: 24,
          active: false
        }
      ],
      //! TRADE TABLE
      tradesTableHeaders: [
        {
          value: 'strategy'
        },
        { text: 'StrategyID', value: 'strategy' },
        { text: 'Datetime', value: 'entryDate' },
        { text: 'Exchange', value: 'exchange' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Side', value: 'side' },
        { text: 'Type', value: 'type' },
        { text: 'Order Price', value: 'orderEntryPrice' },
        { text: 'Fill Price', value: 'fillEntryPrice' },
        { text: 'Order Size', value: 'orderEntrySize' },
        { text: 'Fill Size', value: 'fillEntrySize' },
        { text: 'Datetime', value: 'exitDate' },
        { text: 'Order Price', value: 'orderExitPrice' },
        { text: 'Fill Price', value: 'fillExitPrice' },
        { text: 'PnL (%)', value: 'PnL' }
      ],
      tradesTableData: [
        {
          strategy: 'mock_strat',
          entryDate: '20/05/2019 - 06:34',
          exchange: 'kraken',
          symbol: 'XBT-USD',
          side: 'buy',
          type: 'limit',
          orderEntryPrice: 8600,
          orderEntrySize: 4.6,
          fillEntryPrice: 8600,
          fillEntrySize: 4.6,
          orderExitPrice: 9000,
          exitDate: '25/07/2019 - 09:34',
          PnL: 10
        },
        {
          strategy: 'other_strat',
          exchange: 'kraken',
          entryPrice: 8600,
          entryDate: '20/05/2019 - 06:34',
          exitPrice: 9000,
          exitDate: '25/07/2019 - 09:34',
          volume: 4.5,
          PnL: 10
        }
      ],
      //! ORDER TABLE
      orderTableHeaders: [
        { text: 'orderID', value: 'orderID' },
        { text: 'targetStrategy', value: 'targetStrategy' },
        { text: 'exchange', value: 'exchange' },
        { text: 'symbol', value: 'symbol' },
        { text: 'side', value: 'side' },
        { text: 'ordType', value: 'ordType' },
        { text: 'execInst', value: 'execInst' },
        { text: 'clOrdID', value: 'clOrdID' },
        { text: 'account', value: 'account' },
        { text: 'cashMargin', value: 'cashMargin' },
        { text: 'ordStatus', value: 'ordStatus' },
        { text: 'workingIndicator', value: 'workingIndicator' },
        { text: 'ordRejReason', value: 'ordRejReason' },
        { text: 'timeInForce', value: 'timeInForce' },
        { text: 'transactTime', value: 'transactTime' },
        { text: 'effectiveTime', value: 'effectiveTime' },
        { text: 'validUntilTime', value: 'validUntilTime' },
        { text: 'expireTime', value: 'expireTime' },
        { text: 'grossTradeAmt', value: 'grossTradeAmt' },
        { text: 'orderQty', value: 'orderQty' },
        { text: 'cumQty', value: 'cumQty' },
        { text: 'commission', value: 'commission' },
        { text: 'price', value: 'price' },
        { text: 'stopPx', value: 'stopPx' },
        { text: 'avgPx', value: 'avgPx' },
        { text: 'marginRatio', value: 'marginRatio' },
        { text: 'realisedPnL', value: 'realisedPnL' },
        { text: 'unrealisedPnL', value: 'unrealisedPnL' },
        { text: 'fills', value: 'fills' }
      ],
      //! ORDER TABLE
      pyTradesTableHeaders: [
        { text: 'exchange', value: 'exchange' },
        { text: 'trdMatchID', value: 'trdMatchID' },
        { text: 'orderID', value: 'orderID' },
        { text: 'clOrdID', value: 'clOrdID' },
        { text: 'symbol', value: 'symbol' },
        { text: 'side', value: 'side' },
        { text: 'ordType', value: 'ordType' },
        { text: 'avgPx', value: 'avgPx' },
        { text: 'cumQty', value: 'cumQty' },
        { text: 'grossTradeAmt', value: 'grossTradeAmt' },
        { text: 'commission', value: 'commission' },
        { text: 'transactTime', value: 'transactTime' }
      ]
    }
  },
  computed: {
    ...mapGetters(['darkMode'])
  }
}
</script>
