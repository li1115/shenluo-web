import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import '@fontsource/noto-sans-sc';
import '@fontsource/noto-sans-sc/400.css';   // 常规
import '@fontsource/noto-sans-sc/700.css';   // 粗体

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
