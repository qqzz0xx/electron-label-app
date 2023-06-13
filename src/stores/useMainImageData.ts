import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { itkReadFile } from '../utils/io'

export const useMainImageData = defineStore('useMainImageData', () => {
  const mainImageData = ref<vtkImageData>()

  const setMainImageData = (d: vtkImageData) => {
    mainImageData.value = d
  }

  const loadMainImage = async (file: File) => {
    mainImageData.value = await itkReadFile(file)
    console.log('main image', mainImageData.value.toJSON())
  }

  return {
    mainImageData,
    loadMainImage,
    setMainImageData
  }
})
