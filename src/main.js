import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import SocketIO from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import highContrast from 'highcharts/themes/high-contrast-dark'
// import VueLodash from 'vue-lodash'
// import lodash from 'lodash'

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'ws://localhost:8000/ws',
//   options: { useConnectionNamespace: true },
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// })
// )
highContrast(Highcharts)
Vue.use(HighchartsVue)
Vue.config.productionTip = false

// Vue.use(VueLodash, { lodash: lodash })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
