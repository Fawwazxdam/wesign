import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import Toast from 'vue-toastification'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.mount('#app')
