<script setup lang="ts">
import { Weapon } from 'src/classes/model/weapon';
import { computed } from 'vue';

defineOptions({
  name: 'WeaponSpriteDiv',
});

interface Props {
  weapon: Weapon;
}
const { weapon } = defineProps<Props>();
const offsetPairs = computed(() => {
  if (weapon) {
    const showMissile =
      weapon.renderHints.includes('RENDER_LOADED_MISSILES') ||
      weapon.renderHints.includes('RENDER_LOADED_MISSILES_UNLESS_HIDDEN');
    if (
      showMissile &&
      weapon.turretOffsets.length > 0 &&
      weapon.projSpriteName
    ) {
      const result: [number, number][] = [];
      for (let i = 0; i < weapon.turretOffsets.length; i += 2) {
        result.push([weapon.turretOffsets[i], weapon.turretOffsets[i + 1]]);
      }
      return result;
    }
  }
  return undefined;
});
</script>

<template>
  <div style="margin: auto; position: relative">
    <img
      style="position: absolute; z-index: -2"
      decoding="async"
      :src="weapon.turretUnderSprite"
    />
    <img
      style="position: absolute; z-index: -1"
      decoding="async"
      :src="weapon.turretGunSprite"
    />
    <template v-if="offsetPairs">
      <img
        v-for="(offsetPair, index) in offsetPairs"
        :style="{
          position: 'absolute',
          zIndex: 1000 + index,
          top: '50%',
          left: '50%',
          transform:
            'translate(-50%,-50%) ' +
            `translate(${offsetPair[1] * -1}px,${offsetPair[0] * -1}px)`,
        }"
        :key="index"
        decoding="async"
        :src="weapon.projSpriteName"
      />
    </template>
    <img decoding="async" :src="weapon.turretSprite" />
  </div>
</template>
