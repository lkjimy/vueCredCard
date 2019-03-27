import Vue from 'vue'
import App from './App.vue'
import VueCredCard from '../../src/index.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/main.css'

Vue.config.productionTip = false

Vue.use(VueCredCard)

new Vue({
  render: h => h(App)
}).$mount('#app')
