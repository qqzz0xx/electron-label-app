import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray'
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMaskImageData = defineStore('useMaskImageData', () => {
  const maskData = ref<vtkImageData>()

  const createMaskFromImage = (imageData: vtkImageData) => {
    const size = imageData.getNumberOfPoints()
    const points = new Uint8Array(size)
    points.fill(0)

    const labelmap = vtkImageData.newInstance(imageData.get('spacing', 'origin', 'extent'))
    labelmap.getPointData().setScalars(
      vtkDataArray.newInstance({
        numberOfComponents: 1,
        values: points
      })
    )

    labelmap.setDirection(imageData.getDirection())
    labelmap.setDimensions(imageData.getDimensions())
    labelmap.computeTransforms()

    maskData.value = labelmap

    console.log('createMaskFromImage', size, labelmap.toJSON())
  }

  const fillMask = (value: number) => {
    if (!maskData.value) return

    const points = new Uint8Array(maskData.value.getNumberOfPoints())
    points.fill(value)

    maskData.value.getPointData().setScalars(
      vtkDataArray.newInstance({
        numberOfComponents: 1,
        values: points
      })
    )
  }

  return {
    maskData,
    createMaskFromImage,
    fillMask
  }
})
