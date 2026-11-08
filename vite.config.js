import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// O repositório "abraaosantosdeveloper.github.io" é servido na raiz, então base = '/'.
export default defineConfig({
  plugins: [vue()],
  base: '/',
})
