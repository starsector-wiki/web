<script setup lang="ts">
import { Planet } from 'src/classes/model/Planet';

defineOptions({
  name: 'PlanetIconDiv',
});

interface Props {
  planet: Planet;
}
const { planet } = defineProps<Props>();
</script>

<template>
  <div
    :style="{
      width: planet.radius / 16 + 'px',
      height: planet.radius / 16 + 'px',
      backgroundColor: '#' + planet.type.color,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      maskImage: `url(${planet.type.iconTexture})`,
      maskSize: 'cover',
    }"
  ></div>
</template>
