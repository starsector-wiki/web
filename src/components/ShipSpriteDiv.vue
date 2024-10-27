<script setup lang="ts">
import { Ship, WeaponSlot } from 'src/classes/model/ship';
import { Weapon } from 'src/classes/model/weapon';
import { useDataStore } from 'src/stores/dataStore';
import { computed } from 'vue';
import WeaponSpriteDiv from 'src/components/WeaponSpriteDiv.vue';

defineOptions({
  name: 'ShipSpriteDiv',
});

interface Props {
  ship: Ship;
}
const { ship } = defineProps<Props>();
const dataStore = useDataStore();

const weapons = computed(() => {
  if (ship) {
    const result = [];
    for (const [slotId, weaponId] of ship.weaponIdMap.entries()) {
      if (weaponId) {
        const weapon = dataStore.getWeaponById(weaponId);
        const slotData = ship.allWeaponSlots.find((it) => it.id === slotId);
        if (weapon && slotData) {
          result.push([weapon, slotData] as [Weapon, WeaponSlot]);
        }
      }
    }
    return result.sort((a, b) => {
      //越靠近中间的武器越后渲染，使其显示在顶层
      const aLocation = a[1].location;
      const bLocation = b[1].location;
      if (aLocation.x !== bLocation.x) {
        return Math.abs(aLocation.x) - Math.abs(bLocation.x);
      }
      return Math.abs(aLocation.y) - Math.abs(bLocation.y);
    });
  } else {
    return undefined;
  }
});
</script>

<template>
  <div style="margin: auto; position: relative">
    <div v-for="([weapon, slotData], index) in weapons" :key="slotData.id" :style="{
      position: 'absolute',
      bottom: ship.center.y + 'px',
      left: ship.center.x + 'px',
      transformOrigin: `50% ${slotData.hardPoint ? 75 : 50}%`,
      transform: `translate(-50%, ${slotData.hardPoint ? 25 : 50}%)`
        + ` translate(${slotData.location.y * -1}px, ${slotData.location.x * -1}px)`
        + ` rotate(${360 - slotData.angle}deg)`,
    }">
      <WeaponSpriteDiv :weapon="weapon" :base-z-index="1 + (index + 1) * 10" :is-hard-point="slotData.hardPoint" />
    </div>
    <img decoding="async" :src="ship.sprite" />
  </div>
</template>
