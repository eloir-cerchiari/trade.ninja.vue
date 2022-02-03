<template>
  <v-container>
    <v-row class="">
      <v-col cols="12">
        <h4>{{ symbol.symbol }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <line-chart :data="symbolAnalysis"></line-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getSymbolsAnalysis } from "../services/symbols";
export default {
  name: "HelloWorld",

  props: {
    symbol: {},
  },

  data: () => ({
    symbolData: {},
    symbolAnalysis: [],
  }),

  watch: {
    symbol: function (newVal, oldVal) {
      if (newVal == oldVal) return;
      this.getSymbol();
    },
  },
  methods: {
    async getSymbol() {
      this.symbolData = {};
      this.symbolAnalysis = [];
      this.symbolData = await getSymbolsAnalysis(this.symbol.symbol);
      // console.log( this.symbolData[0].analysis);
      for (const interval of this.symbolData[0].analysis) {
        const item = { name: null, data: {} };
        item.name = interval.interval;

        for (const dt of interval.data) {
          var m = new Date(dt.time);
          var dateString =
            m.getUTCFullYear() +
            "/" +
            (m.getUTCMonth() + 1) +
            "/" +
            m.getUTCDate() +
            " " +
            m.getUTCHours() +
            ":" +
            m.getUTCMinutes();
          item.data[dateString] = 0 + dt.BUY - dt.SELL;
        }
        this.symbolAnalysis.push(item);
      }
      
    },
  },
};
</script>
