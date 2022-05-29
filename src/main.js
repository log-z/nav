import { createApp } from 'vue'
import App from './App.vue'

import store from '@/store'

import '@/assets/css/base.css'


const app = createApp(App)
app.use(store)
app.mount('#app')
