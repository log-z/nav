import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

// Import Base CSS
import '@/assets/css/base.css'

// Import Icon-font
import '@/assets/css/iconfont.css'
import * as NavIconsVue from './icons-vue'


const app = createApp(App)
app.use(store)

// Global import Icon-font Component
for (const [key, component] of Object.entries(NavIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
