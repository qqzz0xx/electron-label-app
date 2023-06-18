import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCameraStore = defineStore('useCameraStore', () => {
  const scale = ref(1)
  const offset = ref([0, 0])

  const setScale = (v: number) => {
    scale.value = v
  }

  const setOffset = (v: [number, number]) => {
    offset.value = v
  }

  return {
    scale,
    offset,
    setScale,
    setOffset
  }
})
