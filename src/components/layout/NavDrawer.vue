<template>

  <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer
      app
      :dark="darkMode"
      left
      permanent
      expand-on-hover
      mini-variant-width=56
    >
      <v-list
        nav
        class="py-1"
      >

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  <!-- END NAVIGATION DRAWER -->

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavDrawer',
  computed: {
    ...mapGetters(['drawerState', 'darkMode'])
    // moveDrawer: {
    //   get () {
    //     return this.$store.state.drawer
    //   },
    //   set (value) {
    //     this.$store.commit('setDrawer', value)
    //   }
    // }
  },
  // end COMPUTED
  methods: {
    ...mapActions(['updateDrawer'])
  },
  // end METHODS
  data () {
    return {
      // UI elements
      // List items
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'About', icon: 'mdi-account', route: '/about' },
        { title: 'Performance', icon: 'mdi-finance', route: '/performance' },
        // { title: 'Charts', icon: 'mdi-finance', route: '/charts' },
        { title: 'Markets', icon: 'mdi-finance', route: '/markets' },
        { title: 'Connections', icon: 'mdi-cable-data', route: '/dash' },
        // { title: 'Trade', icon: 'mdi-view-dashboard', route: '/trade' },
        // { title: 'Trade2', icon: 'mdi-view-dashboard', route: '/trade2' },
        { title: 'Config', icon: 'mdi-cog', route: '/config' },
        { title: 'Debug', icon: 'mdi-bug', route: '/debug' }
      ]
    }
  }
}
</script>
