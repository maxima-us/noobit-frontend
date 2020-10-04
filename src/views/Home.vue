<template>
  <v-container fluid>
    <v-row no-gutters class="pb-1">
      <v-col>
        <v-card :dark="darkMode" flat style="background-color: transparent">
          <v-card-title>
            Balances
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              :dark="darkMode"
            >
            </v-text-field>
          </v-card-title>
          <v-data-table
            dense
            :dark="darkMode"
            :headers="accountBalancesTableHeaders"
            :items="accountBalances"
            :search="search"
          >
          </v-data-table>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  computed: {
    ...mapGetters(['darkMode', 'accountBalances'])
  },
  data () {
    return {
      search: '',
      accountBalancesTableHeaders: [
        { text: 'Exchange', value: 'exchange' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Size', value: 'size' }
      ]
    }
  }
}
</script>
