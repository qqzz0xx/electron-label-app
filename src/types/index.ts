import { extensionToImageIO } from 'itk-wasm'

export const ITK_IMAGE_EXTENSIONS = Array.from(
  new Set(Array.from(extensionToImageIO.keys()).map((ext) => ext.toLowerCase()))
)

export const FILE_TYPES = Array.from(new Set(['dcm', 'zip', 'json', ...ITK_IMAGE_EXTENSIONS]))
