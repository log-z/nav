import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'

Vue.config.productionTip = false

window.vueApp = new Vue({
  render: h => h(App),
}).$mount('#app')
