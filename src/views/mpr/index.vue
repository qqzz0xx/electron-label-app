<template>
  <div class="MprView">
    <div class="flex-row flex-1">
      <div id="viewer-1" class="flex-1"></div>
      <div id="viewer-2" class="flex-1"></div>
    </div>
    <div class="flex-row flex-1">
      <div id="viewer-3" class="flex-1"></div>
      <div id="viewer-4" class="flex-1"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
