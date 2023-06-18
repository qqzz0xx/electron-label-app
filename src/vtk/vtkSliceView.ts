import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume'
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper'
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow'
import vtkInteractorStyleMPRSlice from './vtkInteractorStyleMPRSlice'
import vtkCamera from '@kitware/vtk.js/Rendering/Core/Camera'
import { useCameraStore } from '@/stores/useCameraStore'
import { mat3, mat4, vec3 } from 'gl-matrix'
import vtkMath from '@kitware/vtk.js/Common/Core/Math'
import { projection2Display } from './utils'
import vtkCoordinate from '@kitware/vtk.js/Rendering/Core/Coordinate'

class vtkSliceView {
  root: HTMLElement
  genericRenderWindow: vtkGenericRenderWindow
  volume?: vtkVolume

  constructor(root: HTMLElement) {
    this.root = root

    this.genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0.1, 0.1, 0.2],
      listenWindowResize: true
    })

    this.genericRenderWindow.setContainer(root)
    this.genericRenderWindow.getOpenGLRenderWindow().setSize(root.offsetWidth, root.offsetHeight)

    const oglrw = this.genericRenderWindow.getOpenGLRenderWindow()
    oglrw.buildPass(true)

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()
    renderWindow.render()

    const camera = renderer.getActiveCamera()

    camera.setParallelProjection(true)
    camera.onModified((obj) => {
      const cam = obj as vtkCamera
      // console.log(cam.toJSON())
      useCameraStore().setScale(cam.getDistance() / cam.getParallelScale())

      const m = this.getImageToDisplayMatrix()
      const pos = vec3.create()
      pos[1] = 221
      vec3.transformMat4(pos, pos, m)

      // const pos1 = projection2Display(renderer, pos)
      // console.log('pos', pos1)
    })
  }

  initView(contentData: vtkImageData) {
    const volumeActor = vtkVolume.newInstance()
    this.volume = volumeActor

    const volumeMapper = vtkVolumeMapper.newInstance()
    volumeMapper.setSampleDistance(1)
    volumeActor.setMapper(volumeMapper)

    volumeMapper.setInputData(contentData)

    // set a default wwwl
    const dataRange = contentData.getPointData().getScalars().getRange()

    // FIXME: custom range mapping
    const rgbTransferFunction = volumeActor.getProperty().getRGBTransferFunction(0)
    rgbTransferFunction.setMappingRange(dataRange[0], dataRange[1])
    // rgbTransferFunction.applyColorMap(vtkColorMaps.getPresetByName(vtkColorMaps.rgbPresetNames[0]))

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()
    renderer.addActor(volumeActor)
    renderer.resetCamera()

    const mprStyle = vtkInteractorStyleMPRSlice.newInstance()
    mprStyle.setInteractor(renderWindow.getInteractor())
    renderWindow.getInteractor().setInteractorStyle(mprStyle)

    mprStyle.setVolumeMapper(volumeMapper)
    mprStyle.setSliceNormal([0, 0, 1])
    mprStyle.setOnLeftButtonPress(this.onLeftButtonPress.bind(this))

    console.log('slice range', mprStyle.getSliceRange())
    console.log('normal', mprStyle.getSliceNormal())

    renderWindow.render()
  }

  getImageToDisplayMatrix() {
    const output = mat4.create()

    if (!this.volume) return output
    const mapper = this.volume.getMapper()
    if (!mapper) return output

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()
    const camera = renderer.getActiveCamera()

    const view = renderWindow.getViews()[0]
    const viewSize = view.getViewportSize(renderer)
    const aspect = viewSize[0] / viewSize[1]

    const VP = camera.getCompositeProjectionMatrix(aspect, -1.0, 1.0)
    const image = mapper.getInputData() as vtkImageData

    const vox2World = mat4.clone(image.getIndexToWorld())
    mat4.transpose(vox2World, vox2World)
    mat4.mul(output, VP, vox2World)
    // mat4.transpose(VP, VP)

    return output
  }

  onLeftButtonPress(ev: unknown) {
    console.log(111)

    if (!this.volume) return
    const mapper = this.volume.getMapper()
    if (!mapper) return
    const evPos = ev.position

    const image = mapper.getInputData() as vtkImageData
    const dirs = image.getDirection()
    const spacing = image.getSpacing()
    const origin = image.getOrigin()
    const bds = image.getBounds()

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()
    const camera = renderer.getActiveCamera()

    const view = renderWindow.getViews()[0]
    const viewSize = view.getViewportSize(renderer)
    console.log('viewportSize', viewSize)

    const aspect = viewSize[0] / viewSize[1]
    const VP = camera.getCompositeProjectionMatrix(aspect, -1, 1)

    const coord = vtkCoordinate.newInstance()
    coord.setRenderer(renderer)
    coord.setCoordinateSystemToDisplay()
    coord.setValue([evPos.x, evPos.y, evPos.z])
    const worldPos = coord.getComputedWorldValue(renderer)

    const vox2World = mat4.clone(image.getIndexToWorld())
    const world2Vox = mat4.clone(image.getWorldToIndex())

    mat4.transpose(vox2World, vox2World)
    mat4.mul(VP, VP, vox2World)
    mat4.transpose(VP, VP)

    const zero = vec3.create()
    vec3.transformMat4(zero, zero, VP)
    console.log(zero)

    coord.setCoordinateSystemToViewport()
    coord.setValue(...zero)
    const zero1 = coord.getComputedDoubleDisplayValue(renderer)
    console.log(zero1)

    // console.log(world2Vox)
    console.log(worldPos)

    const pos = vec3.fromValues(...worldPos)

    vec3.transformMat4(pos, pos, world2Vox)

    // image.worldToIndex(worldPos, pos)

    // console.log(worldPos, volumePos)
    console.log(pos)

    // console.log(Vox2World)
  }
}

function toMat4(out: mat4, mat: mat3) {
  out[0] = mat[0]
  out[1] = mat[1]
  out[2] = mat[2]
  out[3] = 0
  out[4] = mat[3]
  out[5] = mat[4]
  out[6] = mat[5]
  out[7] = 0
  out[8] = mat[6]
  out[9] = mat[7]
  out[10] = mat[8]
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1.0
}

export default vtkSliceView
