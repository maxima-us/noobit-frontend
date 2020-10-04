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
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import darkUnica from 'highcharts/themes/gray'
darkUnica(Highcharts)
stockInit(Highcharts)

export default {
  name: 'AccountBalanceChart',
  computed: {
    ...mapGetters(['darkMode', 'historicAccountBalance'])
  },
  methods: {
    load () {
      this.chartOptions.series.data = this.historicAccountBalance
    }
  },
  data () {
    return {
      chartOptions: {
        series: {
          type: 'column',
          id: 'kraken-ohlc',
          name: 'test',
          data: [
          ]
        }
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
