import { createApp } from 'vue'
import naive from './naive'
import App from './App.vue'
import router from './router'
import store from './store'
import "tailwindcss/tailwind.css"
import "./common/index.less"


import { setupI18n } from '@/locales/setupI18n'

const app = createApp(App)
setupI18n(app)
app
  .use(naive)
  .use(router)
  .use(store)
  .mount('#app')
