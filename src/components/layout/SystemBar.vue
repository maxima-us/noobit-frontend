<template>
  <div>
    <!-- SYSTEM BAR -->
    <v-system-bar
        app
        :id="sysbarID"
        :dark="darkMode"
        :color="systemBgColor"
        height="40"
        fixed
        >

        <v-icon>mdi-map-marker-outline</v-icon>
        <span class="caption font-weight-thin">{{ timezone }}</span>
          <v-divider vertical class="mx-5"></v-divider>
        <v-icon>mdi-clock-outline</v-icon>
        <span class="caption font-weight-thin"> TZ : {{ timestamp }}</span>
          <v-divider vertical class="mx-5"></v-divider>
        <v-icon>mdi-clock-outline</v-icon>
        <span class="caption font-weight-thin"> UTC : {{ utctime }}</span>

        <v-spacer></v-spacer>

        <v-icon>mdi-currency-usd</v-icon>
        <span class="caption font-weight-thin">50034</span>
          <v-divider vertical class="mx-5"></v-divider>
        <v-icon>mdi-currency-usd</v-icon>
        <span class="caption font-weight-thin">23050</span>
          <v-divider vertical class="mx-5"></v-divider>
        <v-icon>mdi-currency-usd</v-icon>
        <span class="caption font-weight-thin">34034</span>

        <v-spacer></v-spacer>

        <!-- NOTIFICATIONS -->
          <v-btn text @click="snackbar = !snackbar">
        <v-badge
          :content="notifications.length"
          :value="notifications.length"
          color="green"
          dot
          bordered
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
        </v-btn>
        <v-snackbar
          v-model="snackbar"
          top
          right
          timeout=0
          width=400
        >
          <v-alert v-if="notifications.length===0">
            No new notifications
          </v-alert>
          <v-alert v-for="(notif, index) in notifications" :key="index" :type="notif.type" outlined max-width dense>
          <span>
            <v-btn text @click="notifications.splice(index, 1)" class="text-caption">
            {{JSON.parse(notif).msg}}
            </v-btn>
          </span>
          </v-alert>
        </v-snackbar>

        <v-divider vertical class="mx-5"></v-divider>

        <v-btn text @click.stop="updateDarkMode">
          <v-icon :color="bulbIconColor"> {{ bulbIcon }} </v-icon>
        </v-btn>

    </v-system-bar>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SystemBar',
  data () {
    return {
      alerts: [
        { msg: 'Subd to Feed: Kraken - OrderBook - XBT-USD', type: 'success' },
        { msg: 'Subd to Feed: Kraken - OrderBook - ETH-USD', type: 'success' },
        { msg: 'Subd to Feed: Kraken - OrderBook - LINK-USD', type: 'error' },
        { msg: 'Subd to Feed: Kraken - OrderBook - TRX-USD', type: 'warning' }
      ],
      snackbar: false,
      utctime: '',
      timestamp: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  // end DATA
  created () {
    setInterval(() => {
      this.getNow()
    }, 1000)
    setInterval(() => {
      this.getUTCNow()
    }, 1000)
  },
  // end CREATED
  computed: {
    ...mapGetters(['mainColor', 'drawerState', 'darkMode', 'isMobile', 'notifications']),
    setDarkMode: {
      get () {
        return this.$store.state.darkmode
      },
      set (value) {
        this.$store.commit('setDarkMode', value)
      }
    },
    bulbIconColor () { return (this.darkMode ? 'yellow' : 'grey') },
    bulbIcon () { return (this.darkMode ? 'mdi-lightbulb-on' : 'mdi-lightbulb') },
    navbarBgColor () { return (this.darkMode ? 'black' : 'white') },
    navbarTextColor () { return (this.darkMode ? 'light' : 'dark') },
    systemBgColor () { return (this.darkMode ? 'rbg(0,0,0)' : 'rgb(248, 248, 255)') },
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
    navbarID () {
      var width = this.dw_getWindowDims.width
      var idValue = (width < 960 ? 'mobNavBar' : 'deskNavBar')
      return idValue
    },
    sysbarID () {
      var width = this.dw_getWindowDims.width
      var idValue = (width < 960 ? 'mobSysBar' : 'deskSysBar')
      return idValue
    }
  },
  // end COMPUTED
  methods: {
    ...mapActions(['updateDrawer', 'updateDarkMode']),
    getNow () {
      const today = new Date()
      const Hours = today.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      const Minutes = today.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      this.timestamp = Hours + ':' + Minutes
    },
    getUTCNow () {
      const today = new Date()
      const Hours = today.getUTCHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      const Minutes = today.getUTCMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      this.utctime = Hours + ':' + Minutes
    }
  }
}
// end EXPORT
</script>

<style lang="scss" scoped>
#mobNavBar {
  border-radius: 5px;
  margin: auto;
  width: 100%
}
#deskNavBar {
  border-radius: 80px;
  margin: auto;
  width:85%
}
#mobSysBar {
  margin: auto;
  text-align: center;
  left: 0%;
  right: 0%;
  width: 100%;
}
#deskSysBar {
  margin: auto;
  text-align: center;
  right: 0px;
  width: 80%;
}
</style>
