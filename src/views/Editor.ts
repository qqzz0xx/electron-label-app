import { fabric } from 'fabric'

class Editor {
  canvas: fabric.Canvas
  root: HTMLDivElement
  fitSizeBinder: EventListener

  constructor(root: HTMLDivElement) {
    this.root = root

    const el = document.createElement('canvas')
    this.root.appendChild(el)

    this.canvas = new fabric.Canvas(el, {
      width: root.offsetWidth,
      height: root.offsetHeight,
      // backgroundColor: 'rgb(51, 26, 26)',
      selection: false
    })

    this.fitSizeBinder = this.fitSize.bind(this)
    this.bindListener()
    root.addEventListener('DOMNodeRemoved', this.unBindListener.bind(this))

    fabric.util.requestAnimFrame(() => {
      this.canvas.renderAll()
    })
  }

  private bindListener() {
    window.addEventListener('resize', this.fitSizeBinder)
  }

  private unBindListener() {
    window.removeEventListener('resize', this.fitSizeBinder)
    console.log('unBindListener')
  }

  fitSize() {
    this.canvas.setWidth(this.root.offsetWidth)
    this.canvas.setHeight(this.root.offsetHeight)
    console.log(this.canvas.width, this.canvas.height)
  }

  setMainImage(imageEl: HTMLImageElement) {
    const image = new fabric.Image(imageEl, {
      width: 200,
      height: 200
    })
    this.canvas.add(image)
    // this.canvas.renderAll()

    console.log(this.canvas.getObjects())
  }
}

export default Editor
