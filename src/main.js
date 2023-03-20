import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global.css'
import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
  dateToString(time) {
    const date = new Date(time)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  },
}

app.use(store).use(router).mount('#app')
