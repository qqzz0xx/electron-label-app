import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
// Without these, nothing will appear into the scene
import '@kitware/vtk.js/Rendering/Profiles/Volume'
import '@kitware/vtk.js/Rendering/Profiles/Geometry'
import '@kitware/vtk.js/Rendering/Profiles/Glyph'

// import './samples/node-api'
import './style.css'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
