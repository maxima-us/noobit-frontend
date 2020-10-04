<template>
  <v-container fluid>

    <!-- FIRST ROW: GLOBAL PERFORMANCE -->
    <v-row>
      <v-col cols='12'>
        <span>Overall Performance</span>
        <div class="red--text">Add graph plotting balance of each strat over time</div>
        <AccountBalance></AccountBalance>
      </v-col>
    </v-row>

    <!-- SECOND ROW: PERFORMANCE PER EXCHANGE -->
    <v-row>
      <v-col cols='4'>
        <span>Kraken Balance</span>
        <AccountBalance></AccountBalance>
      </v-col>
      <v-col cols='4'>
        <span>Bitmex Balance</span>
        <AccountBalance></AccountBalance>
      </v-col>
      <v-col cols='4'>
        <span>Bitfinex Balance</span>
        <AccountBalance></AccountBalance>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import AccountBalance from '@/components/content/AccountBalanceChart.vue'

export default {
  name: 'About',
  components: {
    AccountBalance
  }
}
</script>
