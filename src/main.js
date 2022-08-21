import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3TouchEvents from 'vue3-touch-events'

import App from './App.vue'
import router from './router'

import './assets/index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(Vue3TouchEvents)

app.mount('#app')
