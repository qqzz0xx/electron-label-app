import Konva from 'konva'
import ToolBase, { EditEventType } from './ToolBase'
import { vec2 } from 'gl-matrix'
import { throttle } from '../utils'
import KonvaEditor from './KonvaEditor'

class ZoomTool extends ToolBase {
  state: boolean
  prevPos?: vec2

  _func: (pos: vec2) => void

  constructor(editor: KonvaEditor) {
    super(editor)
    this.state = false
    this._func = throttle((pos: vec2) => {
      if (!this.prevPos) return
      const d = vec2.create()

      console.log(pos, this.prevPos)

      vec2.sub(d, pos, this.prevPos)

      const zoom = this.editor.stage.scaleX()
      this.editor.setZoom(zoom + d[1] / 200)
      this.prevPos = pos
    }, 50)
  }

  onMouseDown(e: EditEventType): void {
    if (e.evt.buttons === 2) {
      this.state = true
      this.prevPos = vec2.fromValues(e.realX, e.realY)

      console.log(this.prevPos)
    }
  }

  onMouseMove(e: EditEventType): void {
    if (e.evt.buttons === 2 && this.state === true) {
      const pos = vec2.fromValues(e.realX, e.realY)
      this._func(pos)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMouseUp(e: EditEventType): void {
    this.state = false
  }
}

export default ZoomTool
