<template>
    <!-- CONTENT (v-model should be in v-select)-->
    <v-content>
        <!-- Provides the application the proper gutter -->

      <v-container fluid>

              <router-view></router-view>

      </v-container>

    </v-content>
    <!-- END CONTENT -->

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainContent',
  data () {
    return {
    }
  },
  // end DATA
  computed: {
    ...mapGetters(['drawerState', 'darkMode'])
  }
  // end COMPUTED
}
// end EXPORT
</script>
