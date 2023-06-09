import macro from '@kitware/vtk.js/macro'
import vtkMouseCameraTrackballPanManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballPanManipulator'
import vtkMouseCameraTrackballZoomManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomManipulator'
import vtkMouseRangeManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseRangeManipulator'
import Constants from '@kitware/vtk.js/Rendering/Core/InteractorStyle/Constants'

import vtkInteractorStyleMPRSlice from './vtkInteractorMPRSlice.js'

const { States } = Constants

// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// vtkInteractorStyleMPRPan methods
// ----------------------------------------------------------------------------

function vtkInteractorStyleMPRPanZoom(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkInteractorStyleMPRPanZoom')

  // set fixed manipulators
  model.panManipulatorShift = vtkMouseCameraTrackballPanManipulator.newInstance({
    button: 3,
    shift: true
  })

  model.panManipulatorCtrl = vtkMouseCameraTrackballPanManipulator.newInstance({
    button: 3,
    control: true
  })

  // TODO: The inherited zoom manipulator does not appear to be working?
  model.zoomManipulator = vtkMouseCameraTrackballZoomManipulator.newInstance({
    button: 3
  })
  model.scrollManipulator = vtkMouseRangeManipulator.newInstance({
    scrollEnabled: true,
    dragEnabled: false
  })

  function updateScrollManipulator() {
    const range = publicAPI.getSliceRange()
    model.scrollManipulator.removeScrollListener()
    model.scrollManipulator.setScrollListener(
      range[0],
      range[1],
      1,
      publicAPI.getSlice,
      publicAPI.setSlice
    )
  }

  function setManipulators() {
    publicAPI.removeAllMouseManipulators()
    publicAPI.addMouseManipulator(model.panManipulatorShift)
    publicAPI.addMouseManipulator(model.panManipulatorCtrl)
    publicAPI.addMouseManipulator(model.zoomManipulator)
    publicAPI.addMouseManipulator(model.scrollManipulator)
    publicAPI.addMouseManipulator(model.leftManipulator)
    updateScrollManipulator()
  }

  publicAPI.setLeftButton = (tool) => {
    if (tool == 'zoom') {
      model.leftManipulator = vtkMouseCameraTrackballZoomManipulator.newInstance({
        button: 1
      })
    } else if (tool == 'pan') {
      model.leftManipulator = vtkMouseCameraTrackballPanManipulator.newInstance({
        button: 1
      })
    } else {
      console.error('No tool found for', tool)
    }
    setManipulators()
  }

  // set default left button manipulator
  if (!model.leftButtonTool) {
    model.leftButtonTool = 'pan'
  }
  publicAPI.setLeftButton(model.leftButtonTool)

  setManipulators()

  // chain a callback to super interactor
  const superSetInteractor = publicAPI.setInteractor
  publicAPI.setInteractor = (interactor) => {
    superSetInteractor(interactor)

    if (interactor === null) {
      // NOTE: check null AFTER calling super setInteractor
      return
    }

    let interactionCb =
      model.leftButtonTool == 'pan' ? publicAPI.getOnPanChanged() : publicAPI.getOnZoomChanged()
    interactor.onAnimation(interactionCb)
  }
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  wlStartPos: [0, 0],
  levelScale: 1
}

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues)

  // Inheritance
  vtkInteractorStyleMPRSlice.extend(publicAPI, model, initialValues)

  macro.setGet(publicAPI, model, ['volumeMapper', 'onPanChanged', 'onZoomChanged', 'levelScale'])

  // Object specific methods
  vtkInteractorStyleMPRPanZoom(publicAPI, model)
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkInteractorStyleMPRPanZoom')

// ----------------------------------------------------------------------------

export default Object.assign({ newInstance, extend })
