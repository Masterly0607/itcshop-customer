import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Toast
import Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core'

// Import specific icons from Font Awesome
import {
  faMobileAlt,
  faLaptop,
  faCamera,
  faClock,
  faTabletAlt,
  faHeadphones,
  faGamepad,
  faTv,
  faVolumeUp,
  faPlug,
  faHelicopter,
  faPrint,
} from '@fortawesome/free-solid-svg-icons'

// Font Awesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(
  faMobileAlt,
  faLaptop,
  faCamera,
  faClock,
  faTabletAlt,
  faHeadphones,
  faGamepad,
  faTv,
  faVolumeUp,
  faPlug,
  faHelicopter,
  faPrint,
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(Toastify, { autoClose: 3000, position: 'top-left' })
app.use(createPinia())
app.use(router)
app.mount('#app')
