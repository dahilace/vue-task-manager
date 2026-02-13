import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/styles/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
router.afterEach((to) => {
  const title = to.meta.title

  document.title = (typeof title === 'function') ? title(to) : 'Vue Project | ' + to.meta.title || 'Vue Project'
})

app.mount('#app')
