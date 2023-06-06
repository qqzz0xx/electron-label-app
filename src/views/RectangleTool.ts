import Konva from 'konva'
import ToolBase, { EditEventType } from './ToolBase'
import KonvaEditor from './KonvaEditor'

class RectangleTool extends ToolBase {
  constructor(editor: KonvaEditor) {
    super(editor)
    this.name = 'RectangleTool'
  }

  onMouseDown(e: EditEventType): void {
    // console.log(e.evt.offsetX, e.evt.offsetY)
  }
}

export default RectangleTool
