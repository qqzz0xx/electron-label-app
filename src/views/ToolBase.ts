/* eslint-disable @typescript-eslint/no-unused-vars */
import Konva from 'konva'
import KonvaEditor from './KonvaEditor'
import hotkeys from 'hotkeys-js'

export interface Position {
  realX: number
  realY: number
}

export type EditEventType = Konva.KonvaEventObject<MouseEvent> & Position

class ToolBase {
  editor: KonvaEditor
  enable: boolean
  name: string

  mousedownHandler: (e: Konva.KonvaEventObject<MouseEvent>) => void
  mouseupHandler: (e: Konva.KonvaEventObject<MouseEvent>) => void
  mousemoveHandler: (e: Konva.KonvaEventObject<MouseEvent>) => void

  constructor(editor: KonvaEditor) {
    this.editor = editor
    this.enable = false
    this.name = 'ToolBase'

    this.mousedownHandler = (e) => {
      console.log(e)
      this._onMouseCallback(e, this.onMouseDown.bind(this))
    }

    this.mouseupHandler = (e) => {
      this._onMouseCallback(e, this.onMouseUp.bind(this))
    }

    this.mousemoveHandler = (e) => {
      this._onMouseCallback(e, this.onMouseMove.bind(this))
    }
  }

  setEnable(enable: boolean) {
    if (enable === this.enable) return
    this.enable = enable
    const stage = this.editor.stage
    if (enable) {
      stage.on('mousedown', this.mousedownHandler)
      stage.on('mouseup', this.mouseupHandler)
      stage.on('mousemove', this.mousemoveHandler)
      stage.on('mousemove', this.mousemoveHandler)
    } else {
      stage.off('mousedown', this.mousedownHandler)
      stage.off('mouseup', this.mouseupHandler)
      stage.off('mousemove', this.mousemoveHandler)
    }
  }

  _transformPos(e: Konva.KonvaEventObject<MouseEvent>) {
    const stage = this.editor.stage
    const { x, y } = stage.getPosition()
    const scale = stage.scaleX()
    const realX = (e.evt.offsetX - x) / scale
    const realY = (e.evt.offsetY - y) / scale

    return { realX, realY }
  }

  _onMouseCallback(
    e: Konva.KonvaEventObject<MouseEvent>,
    fn: (e: Konva.KonvaEventObject<MouseEvent> & Position) => void
  ) {
    const { realX, realY } = this._transformPos(e)
    // console.log(e.evt);

    // const d = e.evt as MouseEventInit

    fn({ ...e, realX, realY })
  }

  onMouseDown(e: EditEventType) {}
  onMouseUp(e: EditEventType) {}
  onMouseMove(e: EditEventType) {}
}

export default ToolBase
