import Vue from 'vue'
import Lodash from 'lodash'

import app from '@/App'
import store from '@/store'

import '@/assets/css/base.css'


Vue.config.productionTip = false;
Vue.prototype.$_ = Lodash;

window.vueApp = new Vue({
  render: h => h(app),
  store: store,
}).$mount('#app')
