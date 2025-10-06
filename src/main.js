import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import './style.css'

// 設定 FontAwesome
library.add(fas, far, fab)

// 建立 Pinia 實例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 建立應用實例
const app = createApp(App)

// 註冊插件
app.use(pinia)
app.use(router)

// 註冊 FontAwesome 元件
app.component('FontAwesomeIcon', FontAwesomeIcon)

// 掛載應用
app.mount('#app')
