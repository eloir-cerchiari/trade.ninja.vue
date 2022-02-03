import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false
// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

 new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')