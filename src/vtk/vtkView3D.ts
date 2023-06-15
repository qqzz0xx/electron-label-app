import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkColorMaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps'
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume'
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper'
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow'

class vtkView3D {
  root: HTMLElement
  genericRenderWindow: vtkGenericRenderWindow

  constructor(root: HTMLElement) {
    this.root = root

    this.genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0.1, 0.2, 0.3],
      listenWindowResize: true
    })

    this.genericRenderWindow.setContainer(root)
    this.genericRenderWindow.getOpenGLRenderWindow().setSize(root.offsetWidth, root.offsetHeight)

    const oglrw = this.genericRenderWindow.getOpenGLRenderWindow()
    oglrw.buildPass(true)

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()

    renderer.getActiveCamera().setParallelProjection(false)
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
    // rgbTransferFunction.applyColorMap(vtkColorMaps.getPresetByName(vtkColorMaps.rgbPresetNames[1]))

    const aTransferFunction = volumeActor.getProperty().getGrayTransferFunction(0)
    // aTransferFunction.setRange(dataRange[0], dataRange[1])
    aTransferFunction.addPoint(dataRange[1], 0)
    aTransferFunction.addPoint(dataRange[1], 0)

    const renderer = this.genericRenderWindow.getRenderer()
    const renderWindow = this.genericRenderWindow.getRenderWindow()
    renderer.addActor(volumeActor)
    renderer.resetCamera()

    // const mprStyle = vtkInteractorStyleMPRSlice.newInstance()
    // mprStyle.setInteractor(renderWindow.getInteractor())
    // renderWindow.getInteractor().setInteractorStyle(mprStyle)

    // mprStyle.setVolumeMapper(volumeMapper)
    // mprStyle.setSliceNormal([0, 0, 1])

    renderWindow.render()
  }
}

export default vtkView3D
