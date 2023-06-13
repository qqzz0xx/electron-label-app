<template>
  <div class="container max-w-none">
    <RouterView> </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useInputFileStore } from './stores/useInputFileStore'

const { setFiles } = useInputFileStore()

// console.log('[App.vue]', `Hello world from Electron ${process.versions.electron}!`)

window.addEventListener('dragover', (e) => {
  e.preventDefault()
})

window.addEventListener('drop', (e) => {
  if (e.dataTransfer) {
    setFiles(Array.from(e.dataTransfer.files))
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex: 1;
}
</style>
