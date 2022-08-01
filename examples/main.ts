import { createApp } from 'vue'
import App from './app.vue'
import { C7Button } from 'c7oud-ui'

const app = createApp(App)
app.use(C7Button)
app.mount('#app')