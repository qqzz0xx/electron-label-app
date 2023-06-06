import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useInputFileStore = defineStore('useInputFileStore', () => {
  const files = ref<File[]>([])
  const currentIndex = ref<number>(-1)

  const setFiles = (d: File[]) => {
    files.value = d
    currentIndex.value = 0
  }

  const setCurrentFileIndex = (index: number) => {
    currentIndex.value = index
  }

  const currentFile = computed(() => {
    if (currentIndex.value >= 0 && currentIndex.value < files.value.length) {
      return files.value[currentIndex.value]
    }
    return null
  })

  return {
    files,
    currentFile,
    setFiles,
    setCurrentFileIndex
  }
})
