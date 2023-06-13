<template>
  <div class="HomeView">
    <MprView></MprView>
  </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue'
import MprView from './mpr/index.vue'
import { useInputFileStore } from '../stores/useInputFileStore'
import { useMainImageData } from '../stores/useMainImageData'
import { storeToRefs } from 'pinia'

const { currentFile } = storeToRefs(useInputFileStore())
const { loadMainImage } = useMainImageData()

watchEffect(() => {
  if (currentFile.value) {
    loadMainImage(currentFile.value)
  }
})
</script>
<style lang="less" scoped>
.HomeView {
  display: flex;
  flex: 1;
}
</style>
