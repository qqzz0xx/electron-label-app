<template>
  <div class="MprView">
    <div class="flex-row flex-1">
      <div id="viewer-1"></div>
      <div id="viewer-2"></div>
      <div id="viewer-3"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as diglettk from 'diglettk'
import { useMainImageData } from '../../stores/useMainImageData'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import vtkSliceView from '@/vtk/vtkSliceView'

const { mainImageData } = storeToRefs(useMainImageData())
const { loadMainImage } = useMainImageData()

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

  await fetch('/test/0.nii')
    .then((res) => res.blob())
    .then(async (blob) => {
      await loadMainImage(new File([blob], '0.nii'))
    })

  // const state = mpr.getInitialState()
  // mpr.setImage(state, mainImageData.value!)

  const view = new vtkSliceView(document.getElementById('viewer-1')!)
  view.initView(mainImageData.value!)
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
</style>
