<template>
  <v-container>
    <v-row class="">
      <v-col cols="12">
        <h4>{{ symbol.symbol }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <line-chart :data="symbolAnalysis" ></line-chart>
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
    OneDay: 86400,
    now: Date.now()/1000,
    filterTime:['30m',"1h","2h","4h","1d"],
  }),

  watch: {
    symbol: function (newVal, oldVal) {
      if (newVal == oldVal) return;
      this.getSymbol();
    },
  },
  methods: {
    async getSymbol() {
      console.log((this.now - (this.OneDay * 20)));
      this.symbolData = {};
      this.symbolAnalysis = [];
      this.symbolData = await getSymbolsAnalysis(this.symbol.symbol);
      // console.log( this.symbolData[0].analysis);
      for (const interval of this.symbolData[0].analysis) {

        if(!this.filterTime.includes(interval.interval))
          continue;
        
        const item = { name: null, data: {} };
        item.name = interval.interval;

        for (const dt of interval.data) {
            if(dt.time < (this.now - (this.OneDay * 20)))
              continue;
            var m = new Date(dt.time * 1000);
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
