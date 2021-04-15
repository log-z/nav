import Vue from 'vue'
import App from './App.vue'
import Lodash from 'lodash'
import '@/assets/css/base.css'

Vue.config.productionTip = false
Vue.prototype.$_ = Lodash

window.vueApp = new Vue({
  render: h => h(App),
}).$mount('#app')
