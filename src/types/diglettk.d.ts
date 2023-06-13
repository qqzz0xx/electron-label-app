declare module 'diglettk' {
  import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'

  type MprDirType = 'top' | 'left' | 'front'
  type MprToolType = 'level' | 'crosshair' | 'zoom' | 'pan'

  interface ElementData {
    element: HTMLElement
    key: MprDirType
  }
  interface TargetElements {
    [key: MprDirType]: ElementData
  }

  declare class MPRManager {
    constructor(elements: TargetElements)
    setImage(state: any, image: vtkImageData)
    setTool(tool: MprToolType, state: any)
    getInitialState(): any
  }

  export { MPRManager, VRView, loadDemoSerieWithLarvitar, buildVtkVolume }
}
