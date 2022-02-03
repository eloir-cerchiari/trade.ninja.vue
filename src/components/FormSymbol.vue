<template>
  <v-dialog v-model="controls.dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 primary">
              Novo Ativo
          </v-card-title>

          <v-card-text>
            <h3 class="mt-3">Informe os dados do Ativo</h3>
            <v-text-field
              label="Screener"
              v-model="form.screener"
            ></v-text-field>

            <v-text-field
              label="Exchange"
              v-model="form.exchange"
            ></v-text-field>

            <v-text-field label="Nome do Ativo" v-model="form.symbol"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="onClickNewSymbol()">
                Adicionar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
 import { addNewSymbol } from "../services/symbols";
export default {
  name: "FormSymbol",

  props: {
    
  },

  data: () => ({
      form: {
      screener: null,
      exchange: null,
      symbol: null,
      active:true,
    },
    controls: {
      dialog: false,
    },
  }),

  watch: {
    
  },
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      this.form = {
        screener: null,
        exchange: null,
        symbol: null,
        active:true,
      };
    },
    async onClickNewSymbol(){
        const response = await addNewSymbol(this.form);
        if(response.status == 200  || response.status == 201){
            alert("Ativo adicionado!");
            this.controls.dialog = false;
        }else{
            alert('ocorreu uma falha ao adicionar o ativo');
        }
    }
  },
};
</script>
