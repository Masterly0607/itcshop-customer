import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'animate.css'

import Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(Toastify, {
  autoClose: 3000,
  position: 'top-left',
})

app.use(pinia)
app.use(router)
app.mount('#app')
