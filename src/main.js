import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

// Import Base CSS
import '@/assets/css/base.css'

// Import Icon-font
import '@/assets/css/iconfont.css'
import '@/assets/css/iconfont-coloru.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.mount('#app')
