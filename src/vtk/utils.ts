import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray'
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'

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
