import Konva from 'konva'
import ToolBase from './ToolBase'
import RectangleTool from './RectangleTool'
import ZoomTool from './ZoomTool'
import { clamp } from '../utils/math'

class KonvaEditor {
  stage: Konva.Stage
  layer: Konva.Layer
  mainLayer: Konva.Layer

  mainImage?: Konva.Image

  tools: ToolBase[] = []

  constructor(root: HTMLDivElement) {
    this.stage = new Konva.Stage({
      container: root,
      width: root.offsetWidth,
      height: root.offsetHeight
    })
    // this.stage.container().style.backgroundColor = 'red';

    this.mainLayer = new Konva.Layer()
    this.stage.add(this.mainLayer)
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)

    window.addEventListener('resize', () => {
      this.stage.width(root.offsetWidth)
      this.stage.height(root.offsetHeight)
      this.stage.draw()

      console.log('view', root.offsetWidth, root.offsetHeight)
    })

    const tool = new RectangleTool(this)
    tool.setEnable(true)

    const zoomTool = new ZoomTool(this)
    zoomTool.setEnable(true)

    this.tools = [tool, zoomTool]
  }

  addImage(image: HTMLImageElement) {
    const kImage = new Konva.Image({
      image,
      width: image.width,
      height: image.height
    })

    this.layer.add(kImage)
    return kImage
  }

  addMainImage(image: HTMLImageElement) {
    if (this.mainImage) {
      this.mainImage.remove()
    }
    const kImage = new Konva.Image({
      image,
      width: image.width,
      height: image.height
    })

    this.mainLayer.add(kImage)
    this.mainImage = kImage
  }

  fitZoom() {
    if (!this.mainImage) return

    const { width: w, height: h } = this.mainImage.getSize()
    const { width: sw, height: sh } = this.stage.getSize()

    console.log('view', sw, sh)

    const a = sw / w
    const b = sh / h
    const scale = Math.min(a, b)

    this.stage.scale({
      x: scale,
      y: scale
    })

    this.offsetToCenter()
  }

  setZoom(zoom: number) {
    zoom = clamp(0.1, 40, zoom)

    this.stage.scale({
      x: zoom,
      y: zoom
    })

    this.offsetToCenter()
    this.stage.draw()
  }

  private offsetToCenter() {
    if (!this.mainImage) return
    const scale = this.stage.scaleX()

    const { width: w, height: h } = this.mainImage.getSize()
    const { width: sw, height: sh } = this.stage.getSize()

    const x = (sw - w * scale) * 0.5
    const y = (sh - h * scale) * 0.5

    console.log(scale, x, y)

    this.stage.setPosition({
      x,
      y
    })
  }
}

export default KonvaEditor
