import itkConfig from '../itkConfig'
import type vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData'
import vtkITKHelper from '@kitware/vtk.js/Common/DataModel/ITKHelper'
import { readDICOMTags, readImageDICOMFileSeries } from 'itk-wasm'

export function isDICOMFile(file: File) {
  // 读取文件的前 132 个字节
  const blob = file.slice(0, 132)
  return isDICOMFileByBlob(blob)
}

export function isDICOMFileByUrl(url: string) {
  return new Promise<boolean>((resolve, reject) => {
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        // 读取文件的前 132 个字节
        res = res.slice(0, 132)
        return isDICOMFileByBlob(res)
      })
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

export function isDICOMFileByBlob(blob: Blob) {
  return new Promise<boolean>((resolve, reject) => {
    // 创建一个 FileReader 对象
    const reader = new FileReader()

    // 当读取完成时
    reader.onload = () => {
      // 获取文件头部的内容
      const result = reader.result as ArrayBuffer

      const header = new Uint8Array(result.slice(0, 132))

      // 判断文件头部是否符合 DICOM 的格式
      if (
        String.fromCharCode.apply(null, Array.from(header.subarray(128, 132))) === 'DICM' ||
        String.fromCharCode.apply(null, Array.from(header.subarray(0, 4))) === 'Dcmi'
      ) {
        // 文件是 DICOM 文件
        console.log('The file is a DICOM file.')
        resolve(true)
      } else {
        // 文件不是 DICOM 文件
        console.log('The file is not a DICOM file.')
        resolve(false)
      }
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    // 开始读取文件
    reader.readAsArrayBuffer(blob)
  })
}

export function itkReadDICOMSeries(files: File[]) {
  return new Promise<vtkImageData>((resolve, reject) => {
    readImageDICOMFileSeries(files)
      .then((res) => {
        const imageData = vtkITKHelper.convertItkToVtkImage(res.image)
        resolve(imageData)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export async function itkReadDICOMTags(file: File) {
  const worker = new Worker(itkConfig.pipelineWorkerUrl)
  const res = await readDICOMTags(worker, file)

  return res.tags
}
