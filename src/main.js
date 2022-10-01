import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import Vue3TouchEvents from 'vue3-touch-events'

import App from './App.vue'
import router from './router'

import './assets/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Vue3TouchEvents)
app.use(autoAnimatePlugin)
app.mount('#app')
