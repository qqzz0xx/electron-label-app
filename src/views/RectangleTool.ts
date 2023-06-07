import ToolBase, { EditEventType } from './ToolBase'
import KonvaEditor from './KonvaEditor'
import { vec2 } from 'gl-matrix'
import { throttle } from '../utils'
import Konva from 'konva'
import hotkeys from 'hotkeys-js'

enum State {
  Begin,
  Draw,
  End
}
class RectangleTool extends ToolBase {
  state: State
  prevPos?: vec2

  _func: (pos: vec2) => void

  current?: Konva.Rect

  constructor(editor: KonvaEditor) {
    super(editor)
    this.name = 'RectangleTool'
    this.state = State.End

    this._func = throttle((pos: vec2) => {
      if (!this.prevPos || !this.current) return
      const d = vec2.create()
      vec2.sub(d, pos, this.prevPos)

      this.current.size({
        width: d[0],
        height: d[1]
      })
      this.current.draw()

      console.log('rect', this.current)

      //   this.editor.stage.draw()
      // const scale = d[1] / 2000
      // const zoom = this.editor.stage.scaleX()
      // this.editor.setZoom(zoom * (1 + scale))
      // this.prevPos = pos
    }, 100)

    hotkeys('a', () => {
      this.startDraw()
    })
  }

  startDraw() {
    this.state = State.Begin
    this.current = undefined
  }

  onMouseDown(e: EditEventType): void {
    console.log('rect', e)

    if (e.evt.buttons === 1) {
      if (this.state === State.Begin) {
        this.prevPos = vec2.fromValues(e.realX, e.realY)

        this.current = new Konva.Rect({
          x: e.realX,
          y: e.realY,
          width: 0,
          height: 0,
          fill: 'red'
        })

        this.editor.layer.add(this.current)
      }
    }
  }

  onMouseMove(e: EditEventType): void {
    if (e.evt.buttons === 1) {
      if (this.state === State.Begin || this.state === State.Draw) {
        const pos = vec2.fromValues(e.realX, e.realY)
        this._func(pos)
        this.state = State.Draw
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMouseUp(e: EditEventType): void {
    this.state = State.End
    this.current = undefined
  }
}

export default RectangleTool
