import { createApp } from 'vue'
import App from './app.vue'
import { C7Button, C7Input } from 'c7oud-ui'

const app = createApp(App)
app.use(C7Button).use(C7Input)
app.mount('#app')