import { createApp } from 'vue'
import App from './App.vue'
import reveal from './directives/reveal'
import './styles/tokens.css'
import './styles/base.css'

createApp(App).directive('reveal', reveal).mount('#app')
