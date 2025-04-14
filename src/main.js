import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Like the brain of your app — stores your state (cart, user, etc.)
import App from './App.vue'
import router from './router'
// main.js or main.ts
import 'animate.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
