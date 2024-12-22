<script setup lang="ts">
import { CanvasResult } from 'src/classes/model/CanvasSprite';
import { Weapon } from 'src/classes/model/weapon';
import { computeWeaponSize } from 'src/classes/utils';
import { computed, ref } from 'vue';

defineOptions({
  name: 'WeaponSpriteDiv',
});

interface Props {
  weapon: Weapon;
  isHardPoint?: boolean;
}
const { weapon, isHardPoint = false } = defineProps<Props>();
const offsetPairs = computed(() => {
  if (weapon) {
    const showMissile =
      weapon.renderHints.includes('RENDER_LOADED_MISSILES') ||
      weapon.renderHints.includes('RENDER_LOADED_MISSILES_UNLESS_HIDDEN');
    const offsets = isHardPoint ? weapon.hardPointOffsets : weapon.turretOffsets;
    if (
      showMissile &&
      offsets.length > 0 &&
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
const underSprite = computed(() => isHardPoint ? weapon.hardPointUnderSprite : weapon.turretUnderSprite);
const gunSprite = computed(() => isHardPoint ? weapon.hardPointGunSprite : weapon.turretGunSprite);
const weaponSprite = computed(() => isHardPoint ? weapon.hardPointSprite : weapon.turretSprite);

const canvasResult = ref(undefined as CanvasResult | undefined);
(async () => {
  canvasResult.value = await computeWeaponSize(weapon, isHardPoint);
})()
</script>

<template>
  <div v-if="canvasResult" :style="{
    position: 'relative',
    width: canvasResult.left + canvasResult.right + 'px',
    height: canvasResult.top + canvasResult.bottom + 'px'
  }">
    <img v-if="underSprite" decoding="async" :src="underSprite" :style="{
      position: 'absolute', zIndex: -2,
      top: canvasResult.top + 'px',
      left: canvasResult.left + 'px',
      transform: 'translate(-50%, -50%)'
    }" />

    <img v-if="gunSprite" decoding="async" :src="gunSprite" :style="{
      position: 'absolute', zIndex: -1,
      top: canvasResult.top + 'px',
      left: canvasResult.left + 'px',
      transform: 'translate(-50%, -50%)'
    }" />

    <template v-if="offsetPairs">
      <img v-for="(offsetPair, index) in offsetPairs" :key="index" decoding="async" :src="weapon.projSpriteName" :style="{
        position: 'absolute',
        zIndex: 2 + index,
        top: canvasResult.top + 'px',
        left: canvasResult.left + 'px',
        transform:
          `translate(-50%, -${isHardPoint ? 25 : 50}%) ` +
          `translate(${offsetPair[1]}px, ${-offsetPair[0]}px)`,
      }" />
    </template>

    <img v-if="weaponSprite" decoding="async" :src="weaponSprite" :style="{
      position: 'absolute',
      top: canvasResult.top + 'px',
      left: canvasResult.left + 'px',
      transform: 'translate(-50%, -50%)'
    }" />
  </div>

  <h1 v-else>Loading...</h1>
</template>
