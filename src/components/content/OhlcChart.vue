<template>
        <v-card>
          <highcharts
            :constructor-type="'stockChart'"
            :options="chartOptions"
          ></highcharts>
        </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OhlcChart',
  computed: {
    ...mapGetters(['darkMode', 'marketDataSnapshotOhlc'])
  },
  methods: {
    load () {
      this.chartOptions.series[0].data = this.marketDataSnapshotOhlc
    }
  },
  data () {
    return {
      chartOptions: {
        // yAxis: [{
        //   labels: {
        //     align: 'left'
        //   },
        //   height: '50%',
        //   resize: {
        //     enabled: true
        //   }
        // }, {
        //   labels: {
        //     align: 'left'
        //   },
        //   top: '80%',
        //   height: '10%',
        //   offset: 0
        // }],
        // tooltip: {
        //   shape: 'square',
        //   headerShape: 'callout',
        //   borderWidth: 0,
        //   shadow: false
        // },

        plotOptions: {
          candlestick: {
            color: 'red',
            upColor: 'green',
            opacity: 0.6
          }
        },

        series: [{
          type: 'candlestick',
          id: 'ohlc-data',
          name: 'Ohlc',
          data: []
        }]
      }
    }
  },
  created () {
    setInterval(() => {
      this.load()
    }, 1000)
  }
}
</script>
