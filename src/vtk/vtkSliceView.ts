import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume'
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper'
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow'
import vtkInteractorStyleMPRSlice from './vtkInteractorStyleMPRSlice'

class vtkSliceView {
  root: HTMLElement
  genericRenderWindow: vtkGenericRenderWindow

  constructor(root: HTMLElement) {
    this.root = root

    this.genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0, 0, 0],
      listenWindowResize: true
    })

    this.genericRenderWindow.setContainer(root)
    this.genericRenderWindow.getOpenGLRenderWindow().setSize(root.offsetWidth, root.offsetHeight)

    const oglrw = this.genericRenderWindow.getOpenGLRenderWindow()
    oglrw.buildPass(true)

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()

    renderer.getActiveCamera().setParallelProjection(true)
    renderWindow.render()
  }

  initView(contentData: vtkImageData) {
    const volumeActor = vtkVolume.newInstance()
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
    mprStyle.setVolumeMapper(volumeMapper)

    renderWindow.getInteractor().setInteractorStyle(mprStyle)

    mprStyle.setSliceNormal([0, 0, 1])

    console.log('slice range', mprStyle.getSliceRange())
    console.log('normal', mprStyle.getSliceNormal())

    renderWindow.render()
  }
}

export default vtkSliceView
