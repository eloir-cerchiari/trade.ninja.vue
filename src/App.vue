<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Trade Ninja</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-select
        :items="items"
        item-text="symbol"
        v-model="selected"
        label="Selecione"
        class="pt-8"
        return-object
      ></v-select>
      <v-spacer></v-spacer>

      <form-symbol></form-symbol>
    </v-app-bar>

    <v-main>
      <HelloWorld v-bind:symbol="selected"></HelloWorld>
    </v-main>
  </v-app>
</template>

<script>
import FormSymbol from './components/FormSymbol.vue';
import HelloWorld from "./components/HelloWorld";
import { loadAllSymbols } from "./services/symbols";
export default {
  name: "App",

  components: {
    HelloWorld,
    FormSymbol,
  },

  data: () => ({
    items: [],
    selected: {},
  
  }),

  mounted() {
    this.loadSymbols();
    this.reset();
  },
  methods: {
    reset() {
      this.form = {
        screener: null,
        exchange: null,
        symbol: null,
      };
    },

    async loadSymbols() {
      this.items = await loadAllSymbols();
    },
  },
};
</script>
