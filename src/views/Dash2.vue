<template>
  <v-container fluid>

    <!-- FIRST ROW -->
    <v-row>
      <v-col cols='10'>
      </v-col>
      <v-col cols='2'>
        <!-- <v-switch
          v-model="locked"
        >
        </v-switch> -->
        <v-btn text>
          <v-icon medium class='px-4' :color="lockIconColor"> {{ lockIcon }} </v-icon>
          <!-- <span class='px-4'>{{lockedText}}</span> -->
          <v-switch class='px-4' v-model="unlocked"></v-switch>
        </v-btn>
      </v-col>
    </v-row>

    <!-- SECOND ROW -->
    <v-row>

      <!-- LEFT COLUMN: SELECT STRATS TO RUN -->
      <v-col cols='3'>
      <v-card
        :disabled="!unlocked"
        :dark="darkMode"
        flat
        style='background-color: transparent'
      >
        <!-- <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="none"
        > -->
        <v-select
          v-model="stratName"
          :items="availableStrats"
          outlined
          :background-color="darkMode?'grey darken-4':'white'"
          :rules="[v => !!v || 'Item is required']"
          label="Strategy"
          required
        ></v-select>
        <v-select
          v-model="stratExchange"
          :items="availableExchanges"
          outlined
          :background-color="darkMode?'grey darken-4':'white'"
          :rules="[v => !!v || 'Item is required']"
          label="Exchange"
          required
        ></v-select>
        <v-select
          v-model="stratSymbol"
          :items="availableSymbols[String(stratExchange)]"
          outlined
          :background-color="darkMode?'grey darken-4':'white'"
          :rules="[v => !!v || 'Item is required']"
          label="Symbol"
          required
        ></v-select>
        <v-select
          v-model="stratTF"
          :items="availableTimeframes"
          outlined
          :background-color="darkMode?'grey darken-4':'white'"
          :rules="[v => !!v || 'Item is required']"
          label="Timeframe"
          required
        ></v-select>
        <v-select
          v-model="stratExec"
          :items="availableExecutionModels"
          outlined
          :background-color="darkMode?'grey darken-4':'white'"
          :rules="[v => !!v || 'Item is required']"
          label="Execution Model"
          required
        ></v-select>
        <v-btn
          :disabled="!unlocked"
          @click="validate"
          width=100%
        >
          <v-icon class='px-4'>mdi-rocket-launch</v-icon>
          <span class='px-4'>Run Strategy</span>
        </v-btn>

        <!-- </v-form> -->
      </v-card>
      </v-col>

      <!-- MIDDLE COLUMN : DISPLAY WHICH STRATS ARE ACTIVE -->
      <v-col cols='6'>
      <v-card :disabled="!unlocked" flat style="background-color: transparent">
        <v-data-table
        :headers="stratTableHeaders"
        :items="stratTableData"
        class="elevation-1"
        :dark="darkMode"
        >
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox v-model="item.active"></v-simple-checkbox>
          </template>
        </v-data-table>
        <div>Running Strat with parameters</div>
        <div>{{ stratName }}</div>
        <div>{{ stratExchange }}</div>
        <div>{{ stratSymbol }}</div>
        <div>{{ stratTF }}</div>
        <div>{{ stratExec }}</div>
        <br>
        <div>Feed Strat</div>
        <div>{{ feedExchanges }}</div>
        <div>{{ feedPublic }}</div>
      </v-card>
      </v-col>

      <!-- RIGHT COLUMN : SELECT FEEDS TO SUB TO -->
      <v-col cols='3'>
      <v-card
        :disabled="!unlocked"
        flat
        style="background-color: transparent"
        :dark="darkMode"
      >

        <v-select
              v-model="feedExchanges"
              :items="availableExchanges"
              attach
              chips
              label="Exchanges"
              multiple
              outlined
              :background-color="darkMode?'grey darken-4':'white'"
              :dark="darkMode"
            >
        </v-select>
        <v-select
              v-model="feedPublic"
              :items="availablePublicFeeds"
              attach
              chips
              label="Public Feeds"
              multiple
              outlined
              :background-color="darkMode?'grey darken-4':'white'"
              :dark="darkMode"
            >
        </v-select>
        <v-select
              v-model="feedPrivate"
              :items="availablePrivateFeeds"
              attach
              chips
              label="Private Feeds"
              multiple
              outlined
              :background-color="darkMode?'grey darken-4':'white'"
              :dark="darkMode"
            >
        </v-select>
        <v-select
              v-model="feedSymbols"
              :items="availableSymbols[String(feedExchanges[feedExchanges.length-1])]"
              attach
              chips
              label="Symbols"
              multiple
              outlined
              :background-color="darkMode?'grey darken-4':'white'"
              :dark="darkMode"
            >
        </v-select>
        <v-btn
          :disabled="!unlocked"
          @click="addFeeds"
          width=100%
        >
          <v-icon class='px-4'>mdi-refresh</v-icon>
          <span class='px-4'>Update</span>
        </v-btn>

      </v-card>
      </v-col>
    </v-row>

    <!-- SECOND ROW  -->
    <v-row>

      <!-- LEFT COLUMN: SUBSCRIBED FEEDS -->
      <v-col cols='4' class="yellow">
        <div>Subscribed Feeds</div>
        <div v-for="[key, value] in Object.entries(subscribedFeeds)" :key="key">>
          {{ value }}
        </div>
      </v-col>

      <!-- MIDDLE COLUMN: ADD FEEDS -->
      <v-col cols='4' class="orange">
        <v-card
          class="py-2 px-4"
          outlined
          :dark="darkMode"
        >
          <v-form>
            <v-select
              v-model="feedE"
              :items="availableExchanges"
              :rules="[v => !!v || 'Item is required']"
              label="Exchange"
              required
            ></v-select>
            <v-select
              v-model="feedS"
              :items="availableSymbols[String(stratExchange)]"
              :rules="[v => !!v || 'Item is required']"
              label="Symbol"
              required
            ></v-select>
            <v-select
              v-model="feedN"
              :items="availableFeeds"
              :rules="[v => !!v || 'Item is required']"
              label="Feed"
              required
            ></v-select>
            <v-card-actions>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Add Feed
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Remove Feed
            </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>

      <!-- RIGHT COLUMN: REMOVE FEEDS -->
      <v-col cols='4' class="brown">row 2 col 3</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
// import qs from 'qs'

export default {
  name: 'Dash',
  data () {
    return {

      checkbox: false,
      // availableStrats: ['mock_strat'],
      // availableSymbols: ['XBT-USD', 'ETH-USD', 'LINK-USD'],
      // availableExecModels: ['limit chase', 'market'],
      // availableTimeframes: [1, 5, 15, 60, 240],
      availablePublicFeeds: ['trade', 'orderbook', 'instrument'],
      availablePrivateFeeds: ['trade', 'order'],
      // feed selects top (multiple bubbles)
      feedExchanges: [],
      feedSymbols: [],
      feedPublic: [],
      feedPrivate: [],
      // feed selects bottom (form)
      feedE: '',
      feedS: '',
      feedN: '',
      // strategy selects (form)
      stratName: '',
      stratExchange: '',
      stratSymbol: '',
      stratTF: '',
      stratExec: '',
      // strategy table (display running strats)
      stratTableHeaders: [
        { text: 'Strategy', value: 'strategy' },
        { text: 'Exchange', value: 'exchange' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Timeframe', value: 'timeframe' },
        { text: 'Execution Model', value: 'execModel' },
        { text: 'Active', value: 'active' }
      ],
      stratTableData: [
        {
          strategy: 'mock_strat',
          exchange: 'kraken',
          symbol: 'XBT-USD',
          timeframe: 60,
          execModel: 'limit chase',
          active: true
        },
        {
          strategy: 'mock_strat',
          exchange: 'kraken',
          symbol: 'ETH-USD',
          timeframe: 15,
          execModel: 'limit chase',
          active: true
        }
      ],
      // just for testing item:created and deleted
      items: [],
      model: [],
      // switches
      unlocked: false

    }
  },
  computed: {
    ...mapGetters([
      'darkMode',
      'availableStrats',
      'availableExchanges',
      'availableSymbols',
      'availableExecutionModels',
      'availableTimeframes',
      'subscribedFeeds'
    ]),
    lockedText () { return this.unlocked ? 'Lock' : 'Unlock' },
    lockIcon () { return this.unlocked ? 'mdi-lock-open-variant' : 'mdi-lock' },
    lockIconColor () { return this.unlocked ? 'green' : 'red' }
  },
  watch: {
  },
  methods: {
    validate () {
      console.log('Run strat')
    },
    testlog (event) {
      console.log(event)
    },
    updateLock () {
      this.locked = !this.locked
    },
    addFeeds () {
      var self = this
      var url = 'http://localhost:8000/feeds/state'
      axios.post(url, {
        exchanges: self.feedExchanges,
        symbols: self.feedSymbols,
        // feeds need to be lists otherwise we will get a 422 error
        public_feeds: self.feedPublic,
        private_feeds: self.feedPrivate
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
</script>
