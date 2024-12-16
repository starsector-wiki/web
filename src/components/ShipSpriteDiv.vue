<script setup lang="ts">
import { Ship } from 'src/classes/model/ship';
import { appData } from 'src/AppData';
import { onMounted, useTemplateRef } from 'vue';

defineOptions({
  name: 'ShipSpriteDiv',
});

interface Props {
  ship: Ship;
}
const { ship } = defineProps<Props>();

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
onMounted(async () => {
  if (canvas.value) {
    let ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      const offscreenCanvas = await appData.getShipCanvas(ship);
      canvas.value.width = offscreenCanvas.canvas.width;
      canvas.value.height = offscreenCanvas.canvas.height;
      ctx.drawImage(offscreenCanvas.canvas, 0, 0);
    }
  }
})
</script>

<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>
