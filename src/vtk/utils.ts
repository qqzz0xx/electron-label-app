import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray'
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkCoordinate from '@kitware/vtk.js/Rendering/Core/Coordinate'
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer'
import { vec3 } from 'gl-matrix'

export function createMaskFromImage(imageData: vtkImageData) {
  const size = imageData.getNumberOfPoints()
  const points = new Uint8Array(size)
  // points.fill(0)

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

  console.log('createMaskFromImage', size, labelmap.toJSON())

  return labelmap
}

export function projection2Display(renderer: vtkRenderer, pos: vec3) {
  const coord = vtkCoordinate.newInstance()
  coord.setRenderer(renderer)
  coord.setCoordinateSystemToProjection()
  coord.setValue(Array.from(pos))
  const worldPos = coord.getComputedDisplayValue(renderer)
  return worldPos
}
