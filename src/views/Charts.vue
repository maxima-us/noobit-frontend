<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="selectedExchange"
          :items="availableExchanges"
          :menu-props="{ maxHeight: '400' }"
          label="Exchange"
          outlined
          :dark="darkMode"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="selectedSymbol"
          :items="availableSymbols"
          :menu-props="{ maxHeight: '400' }"
          label="Symbol"
          outlined
          :dark="darkMode"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <highcharts
            :constructor-type="'stockChart'"
            :options="chartOptions"
            :dark="darkMode"
          ></highcharts>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Chart',
  computed: {
    ...mapGetters(['darkMode'])
  },
  data () {
    return {
      selectedExchange: '',
      availableExchanges: ['kraken', 'bitmex'],
      selectedSymbol: '',
      availableSymbols: ['XBT-USD', 'ETH-USD', 'LINK-USD'],
      chartOptions: {

        parsed_ohlc: null,
        parsed_volume: null,

        yAxis: [{
          labels: {
            align: 'left'
          },
          height: '80%',
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'left'
          },
          top: '80%',
          height: '20%',
          offset: 0
        }],

        tooltip: {
          shape: 'square',
          headerShape: 'callout',
          borderWidth: 0,
          shadow: false,

          positioner: function (width, height, point) {
            var chart = this.chart
            var position

            if (point.isHeader) {
              position = {
                x: Math.max(
                  // Left side limit
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    // Right side limit
                    chart.chartWidth - width - chart.marginRight
                  )
                ),
                y: point.plotY
              }
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop
              }
            }

            return position
          }
        },

        series: [{
          type: 'candlestick',
          id: 'kraken-ohlc',
          name: this.selectedExchange + '-OHLC',
          data: [
            [10000, 8000, 9000, 7000, 8500],
            [10001, 8050, 9000, 7000, 8500],
            [10002, 8100, 9000, 7000, 8500],
            [10003, 8000, 9000, 7000, 8500],
            [10004, 8050, 9000, 700, 8500],
            [10005, 8030, 9000, 7900, 8500],
            [10006, 8000, 9000, 7000, 8500],
            [10007, 8800, 9300, 7000, 8500],
            [10008, 8000, 9000, 7000, 8500],
            [10009, 8000, 9000, 7000, 8500],
            [10010, 8000, 9000, 7000, 8500],
            [10011, 8000, 9000, 7000, 8500]
          ]
        },
        {
          type: 'column',
          id: 'kraken-volume',
          name: 'Kraken Volume',
          data: [
            [10000, 10],
            [10001, 60],
            [10002, 6],
            [10003, 30],
            [10004, 50],
            [10005, 10],
            [10006, 10],
            [10007, 10],
            [10008, 60],
            [10009, 90],
            [10010, 60],
            [10011, 20]
          ],
          yAxis: 1
        }]
      }
    }
  }
}
</script>
