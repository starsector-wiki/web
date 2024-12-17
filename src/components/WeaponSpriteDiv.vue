<script setup lang="ts">
import { appData } from 'src/AppData';
import { Weapon } from 'src/classes/model/weapon';
import { onMounted, useTemplateRef } from 'vue';

defineOptions({
  name: 'WeaponSpriteDiv',
});

interface Props {
  weapon: Weapon;
  isHardPoint?: boolean;
}
const { weapon, isHardPoint = false } = defineProps<Props>();

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
onMounted(async () => {
  if (canvas.value) {
    let ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      const offscreenCanvas = (await appData.getWeaponCanvas(weapon, isHardPoint))!;
      canvas.value.width = offscreenCanvas.canvas.width;
      canvas.value.height = offscreenCanvas.canvas.height;
      try {
        ctx.drawImage(offscreenCanvas.canvas, 0, 0);
      } catch (error) {
        console.log('draw weapon fail.', weapon.name, weapon.id);
        throw error;
      }
    }
  }
})
</script>

<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>
