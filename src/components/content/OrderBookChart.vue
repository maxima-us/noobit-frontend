<template>
  <div>
    <highcharts
      :constructor-type="'stockChart'"
      :options="chartOptions"
    ></highcharts>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import darkUnica from 'highcharts/themes/gray'
darkUnica(Highcharts)
stockInit(Highcharts)

export default {
  name: 'OrderBookChart',
  props: ['databids', 'dataasks', 'lastPrice', 'quote', 'base'],
  computed: {
    ...mapGetters(['darkMode'])
  },
  data () {
    return {
      chartOptions: {
        chart: {
          type: 'area',
          zoomType: 'xy',
          height: '200',
          backgroundColor: 'transparent'
        },
        legend: {
          enabled: false
        },
        rangeSelector: {
          inputEnabled: false,
          buttonTheme: {
            visibility: 'hidden'
          },
          labelStyle: {
            visibility: 'hidden'
          }
        },
        navigator: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        xAxis: {
          allowDecimals: true,
          labels: {
            formatter: function () {
              return this.value
            }
          },
          minPadding: 1,
          maxPadding: 0,
          plotLines: [{
            color: 'red',
            value: this.lastPrice,
            width: 1,
            label: {
              text: 'Last Price',
              rotation: 90
            }
          }],
          title: {
          }
        },
        yAxis: {
          minPadding: 1,
          maxPadding: 0,
          lineWidth: 1,
          gridLineWidth: 1,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: 'inside',
          labels: {
            align: 'left',
            x: 8
          }
        },
        plotOptions: {
          area: {
            fillOpacity: 0.7,
            lineWidth: 1,
            step: 'center'
          }
        },
        tooltip: {
          pointFormat: '{point.y} ' + this.quote + ' at {point.x} ' + this.base,
          headerFormat: '',
          valueDecimals: 2
        },

        series: [{
          name: 'Bids',
          data: []
        },
        {
          name: 'Asks',
          data: []
        }]
      }
    }
  },
  methods: {
    load () {
      this.chartOptions.series[0].data = this.databids
      this.chartOptions.series[1].data = this.dataasks
    }
  },
  created () {
    setInterval(() => {
      this.load()
    }, 1)
  }
}
</script>
