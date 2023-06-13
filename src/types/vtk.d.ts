declare module '@kitware/vtk.js/Interaction/Style/InteractorStyleMPRSlice' {
  import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper'
  import InteractorStyleManipulator from '@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator'

  export interface vtkInteractorStyleMPRSlice extends InteractorStyleManipulator {
    setVolumeMapper(mapper: vtkVolumeMapper)
    setSlice(slice: number)
    getSliceNormal(): [number, number, number]
    setSliceNormal(normal: [number, number, number])
  }

  export function newInstance(initialValues?: any): vtkInteractorStyleMPRSlice

  export function extend(publicAPI: object, model: object, initialValues?: any): void

  export const vtkInteractorStyleMPRSlice: {
    newInstance: typeof newInstance
    extend: typeof extend
  }

  export default vtkInteractorStyleMPRSlice
}
