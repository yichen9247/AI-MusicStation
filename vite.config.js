
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),AutoImport({resolvers: [VantResolver(),ElementPlusResolver()]}),Components({resolvers: [VantResolver(),ElementPlusResolver()]})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {host: '0.0.0.0',hot: {reload: true,rerender: true},routes: {beforeEnter(req, res, next) {if (/\.js$/.test(req.path)) res.redirect('/');else next();if (/\.md$/.test(req.path)) res.redirect('/');else next();}}},
});
