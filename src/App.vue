<template>
  <EditView></EditView>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import HelloWorld from './components/HelloWorld.vue'
import EditView from './views/EditView.vue'

console.log('[App.vue]', `Hello world from Electron ${process.versions.electron}!`)

window.addEventListener('dragover', (e) => {
  e.preventDefault()
})

window.addEventListener('drop', (e) => {
  if (e.dataTransfer) {
    // 向主进程发送消息并传递文件路径
    for (const file of e.dataTransfer.files) {
      // 向主进程发送消息并传递文件路径
      // ipcRenderer.send("open-file", file.path);

      console.log(file)
    }
  }
})
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
