import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper'
import InteractorStyleManipulator from '@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator'

type F = (callData: unknown) => void
export interface vtkInteractorStyleMPRSlice extends InteractorStyleManipulator {
  setVolumeMapper(mapper: vtkVolumeMapper)
  setSlice(slice: number)
  getSliceNormal(): [number, number, number]
  setSliceNormal(normal: [number, number, number])
  getSliceRange(): [number, number, number]
  setOnLeftButtonPress(fn: F)
}

export function newInstance(initialValues?: any): vtkInteractorStyleMPRSlice

export function extend(publicAPI: object, model: object, initialValues?: any): void

export const vtkInteractorStyleMPRSlice: {
  newInstance: typeof newInstance
  extend: typeof extend
}

export default vtkInteractorStyleMPRSlice
