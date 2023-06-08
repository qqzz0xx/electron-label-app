<template>
  <div class="EditView">
    <div class="bar">
      <button @click="handleAdd">+</button>
      <button @click="handleSub">-</button>
      <button @click="handleFit">fit</button>
    </div>
    <div class="root" ref="rootEl"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useInputFileStore } from '../stores/useInputFileStore'
import { storeToRefs } from 'pinia'
import KonvaEditor from './KonvaEditor'
import { useMainImageData } from '../stores/useMainImageData'

const { currentFile } = storeToRefs(useInputFileStore())
const { loadMainImage } = useMainImageData()

const rootEl = ref<HTMLDivElement>()
const editor = ref<KonvaEditor>()

const zoom = ref(1)

const handleAdd = () => {
  zoom.value = zoom.value + 0.1
}

const handleSub = () => {
  zoom.value = zoom.value - 0.1
}
const handleFit = () => {
  editor.value?.fitZoom()
}

watch(zoom, () => {
  editor.value?.setZoom(zoom.value)
})

onMounted(() => {
  if (rootEl.value) {
    editor.value = new KonvaEditor(rootEl.value)
  }
})

watch(currentFile, () => {
  if (currentFile.value) {
    const mineType = currentFile.value.type.toLowerCase()
    if (mineType.startsWith('image')) {
      const image = new Image()
      const url = URL.createObjectURL(currentFile.value)
      image.src = url
      image.onload = () => {
        editor.value?.addMainImage(image)
        URL.revokeObjectURL(url)
      }
    } else {
      loadMainImage(currentFile.value)
    }
  }
})
</script>

<style lang="less" scoped>
.EditView {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .bar {
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding: 8px;
    gap: 20px;
  }

  .root {
    width: 100%;
    height: 100%;
  }
}
</style>
