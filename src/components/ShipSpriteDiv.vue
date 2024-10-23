<script setup lang="ts">
import { Ship, WeaponSlot } from 'src/classes/model/ship';
import { Weapon } from 'src/classes/model/weapon';
import { useDataStore } from 'src/stores/dataStore';
import { computed } from 'vue';
import WeaponSpriteDiv from 'src/components/WeaponSpriteDiv.vue';

defineOptions({
  name: 'WeaponSpriteDiv',
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
    return result;
  } else {
    return undefined;
  }
});
</script>

<template>
  <div style="margin: auto; position: relative">
    <div
      v-for="[weapon, slotData] in weapons"
      :key="slotData.id"
      :style="{
        position: 'absolute',
        bottom: ship.center.y + 'px',
        left: ship.center.x + 'px',
        transform: `translate(-50%, 50%) translate(${
          slotData.location.y * -1
        }px, ${slotData.location.x * -1}px) rotate(${360 - slotData.angle}deg)`,
      }"
    >
      <WeaponSpriteDiv :weapon="weapon" />
    </div>
    <img decoding="async" :src="ship.sprite" />
  </div>
</template>
