<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-data-table
        :headers="bugTableHeaders"
        :items="bugTableData"
        class='elevation-1'
        :dark="darkMode"
        >
          <template v-slot:item.active="{ item }">
            <v-simple-checkbox v-model="item.active"></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Debug',
  data () {
    return {
      // bug table
      bugTableHeaders: [
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Exception', value: 'exception' },
        { text: 'File', value: 'file' },
        { text: 'Traceback', value: 'traceback' },
        { text: 'Session', value: 'session' }
      ],
      bugTableData: [
        {
          date: '02/05/2019',
          time: '02:40',
          exception: 'AttributeError',
          file: 'noobit.server.main.py',
          traceback: 'something something',
          session: '00001'
        },
        {
          date: '03/05/2019',
          time: '12:50',
          exception: 'TypeError',
          file: 'noobit.server.main.py',
          traceback: 'something something',
          session: '00001'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['darkMode'])
  }
}
</script>
