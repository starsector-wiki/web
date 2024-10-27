<script setup lang="ts">
import { Weapon } from 'src/classes/model/weapon';
import { computed } from 'vue';

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
const underSprite = computed(() => isHardPoint ? weapon.hardPointUnderSprite : weapon.turretUnderSprite);
const gunSprite = computed(() => isHardPoint ? weapon.hardPointGunSprite : weapon.turretGunSprite);
const weaponSprite = computed(() => isHardPoint ? weapon.hardPointSprite : weapon.turretSprite);
</script>

<template>
  <div style="margin: auto; position: relative">
    <img v-if="underSprite" decoding="async" :src="underSprite" :style="{ position: 'absolute', zIndex: -2 }" />

    <img v-if="gunSprite" decoding="async" :src="gunSprite" :style="{ position: 'absolute', zIndex: -1 }" />

    <template v-if="offsetPairs">
      <img v-for="(offsetPair, index) in offsetPairs" :key="index" decoding="async" :src="weapon.projSpriteName" :style="{
        position: 'absolute',
        zIndex: 2 + index,
        top: '50%',
        left: '50%',
        transform:
          `translate(-50%,-${isHardPoint ? 25 : 50}%) ` +
          `translate(${offsetPair[1] * -1}px,${offsetPair[0] * -1}px)`,
      }" />
    </template>

    <img v-if="weaponSprite" decoding="async" :src="weaponSprite" />
  </div>
</template>
