import konva from 'konva'
import ToolBase from './ToolBase'
import RectangleTool from './RectangleTool'
import ZoomTool from './ZoomTool'

class KonvaEditor {
  stage: konva.Stage
  layer: konva.Layer

  mainImage?: konva.Image

  tools: ToolBase[] = []

  constructor(root: HTMLDivElement) {
    this.stage = new konva.Stage({
      container: root,
      width: root.offsetWidth,
      height: root.offsetHeight
    })
    // this.stage.container().style.backgroundColor = 'red';

    this.layer = new konva.Layer()
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
    const kImage = new konva.Image({
      image,
      width: image.width,
      height: image.height
    })

    this.layer.add(kImage)
    return kImage
  }

  addMainImage(image: HTMLImageElement) {
    this.mainImage = this.addImage(image)
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
    zoom = Math.max(0.1, zoom)

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
