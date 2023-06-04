<template>
  <div class="EditView" ref="rootEl"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import Editor from './Editor'
const rootEl = ref<HTMLDivElement>()

const editor = ref<Editor>()

onMounted(() => {
  if (rootEl.value) {
    editor.value = new Editor(rootEl.value)
  }
})
</script>

<style lang="less" scoped>
.EditView {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
