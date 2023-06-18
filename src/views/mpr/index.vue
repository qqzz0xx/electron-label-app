<template>
  <div class="MprView">
    <div class="flex-row flex-1">
      <div class="viewContainer">
        <div id="viewer-1" class="viewer"></div>
        <div ref="overlayEl" id="overlay-1" class="overlay">11</div>
      </div>
      <div class="viewContainer">
        <div id="viewer-2" class="viewer"></div>
        <div class="overlay">11</div>
      </div>
      <div class="viewContainer">
        <div id="viewer-3" class="viewer"></div>
        <div class="overlay"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as diglettk from 'diglettk'
import { useMainImageData } from '../../stores/useMainImageData'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import vtkSliceView from '@/vtk/vtkSliceView'
import vtkView3D from '@/vtk/vtkView3D'
import Konva from 'konva'
import { useCameraStore } from '@/stores/useCameraStore'

const { mainImageData } = storeToRefs(useMainImageData())
const { loadMainImage } = useMainImageData()
const overlayEl = ref<HTMLDivElement>()
const { scale } = storeToRefs(useCameraStore())

let mpr: diglettk.MPRManager | null = null

onMounted(async () => {
  const targetElements = {
    top: {
      element: document.getElementById('viewer-1'),
      key: 'top'
    },
    left: {
      element: document.getElementById('viewer-2'),
      key: 'left'
    },
    front: {
      element: document.getElementById('viewer-3'),
      key: 'front'
    }
  }
  // mpr = new diglettk.MPRManager(targetElements)

  await fetch('/test/t1.nii.gz')
    .then((res) => res.blob())
    .then(async (blob) => {
      await loadMainImage(new File([blob], '0.nii.gz'))
    })

  // const state = mpr.getInitialState()
  // mpr.setImage(state, mainImageData.value!)

  const view = new vtkSliceView(document.getElementById('viewer-1')!)
  view.initView(mainImageData.value!)

  const view3D = new vtkView3D(document.getElementById('viewer-2')!)
  view3D.initView(mainImageData.value!)

  const stage = new Konva.Stage({
    container: 'overlay-1',
    width: overlayEl.value?.offsetWidth!,
    height: overlayEl.value?.offsetHeight!
  })

  const layer = new Konva.Layer()
  stage.add(layer)

  const rect = new Konva.Rect({
    width: 100,
    height: 100,
    fill: 'red',
    draggable: true
  })
  layer.add(rect)
  stage.draw()

  watch(scale, () => {
    layer.scale({ x: scale.value, y: scale.value })
  })

  window.addEventListener('resize', () => {
    stage.width(overlayEl.value?.offsetWidth!)
    stage.height(overlayEl.value?.offsetHeight!)
    stage.draw()

    console.log(overlayEl.value?.offsetWidth!, overlayEl.value?.offsetHeight!)
  })
})

watch(mainImageData, () => {
  if (mainImageData.value) {
    console.log('set main image ')

    // const state = mpr.getInitialState()
    // mpr.setImage(state, mainImageData.value)
  }
})

// set image
</script>
<style lang="less" scoped>
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-1 {
  flex: 1;
}

.MprView {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.grid {
  display: flex;
}

.grid > div {
  flex: 1;
  padding: 10px;
}

/* 四个div同等宽高 */
.grid > div:nth-child(1),
.grid > div:nth-child(2),
.grid > div:nth-child(3),
.grid > div:nth-child(4) {
  flex: 1 1 25%;
}

#viewer-1 {
  background-color: bisque;
}

#viewer-2 {
  background-color: rgb(77, 68, 58);
}

#viewer-3 {
  background-color: rgb(141, 115, 83);
}

#viewer-4 {
  background-color: rgb(214, 198, 178);
}

.viewContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.viewer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  // background-color: rgba(255, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
}
</style>
