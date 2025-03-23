import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Like the brain of your app — stores your state (cart, user, etc.)
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // Persist store in localStorage/sessionStorage: keep data after refresh(Like memory 💾 — remembers your data even after refresh)
import App from './App.vue'
import router from './router'
// Global UI Components Plugin
import GlobalComponents from './plugins/global-components'


const app = createApp(App)
const pinia = createPinia()       
app.use(pinia) 
app.use(router)
app.use(GlobalComponents)
pinia.use(piniaPluginPersistedstate) // keep data after refreshing
app.mount('#app')
