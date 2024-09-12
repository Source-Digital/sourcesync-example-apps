import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

// for vue-json-pretty
import 'vue-json-pretty/lib/styles.css';

createApp(App)
  .use(router)
  .mount('#app')
