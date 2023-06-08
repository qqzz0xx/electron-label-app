import type vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkITKImageReader from '@kitware/vtk.js/IO/Misc/ITKImageReader'
import { readImageArrayBuffer } from 'itk-wasm'

vtkITKImageReader.setReadImageArrayBufferFromITK(readImageArrayBuffer)

export async function itkReadFile(file: File) {
  const reader = vtkITKImageReader.newInstance()
  reader.setFileName(file.name)
  try {
    const buffer = await readFileAsArrayBuffer(file)
    await reader.parseAsArrayBuffer(buffer)
  } catch (e) {
    // itkreader doesn't give us a meaningful error
    throw new Error('Failed to parse file')
  }

  return reader.getOutputData() as vtkImageData
}

export async function readFileAsArrayBuffer(file: File) {
  return readFileAs<ArrayBuffer>(file, 'ArrayBuffer')
}

export async function readFileAsUTF8Text(file: File) {
  return readFileAs<string>(file, 'Text')
}

export type ReadAsType = 'ArrayBuffer' | 'Text'

async function readFileAs<T extends ArrayBuffer | string>(
  file: File,
  type: ReadAsType
): Promise<T> {
  return new Promise((resolve) => {
    const fio = new globalThis.FileReader()
    fio.onload = () => resolve(fio.result as T)
    if (type === 'ArrayBuffer') {
      fio.readAsArrayBuffer(file)
    } else if (type === 'Text') {
      fio.readAsText(file)
    } else {
      throw new TypeError(`readAs${type} is not a function`)
    }
  })
}
