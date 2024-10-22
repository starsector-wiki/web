<script setup lang="ts">
import { useDataStore } from 'src/stores/dataStore';
import { computed } from 'vue';

defineOptions({
  name: 'WeaponsPage',
});

const dataStore = useDataStore();
const offsetPairsMap = computed(() => {
  const result = new Map();
  for (const weapon of dataStore.sortdWeapon) {
    const showMissile =
      weapon.renderHints.includes('RENDER_LOADED_MISSILES') ||
      weapon.renderHints.includes('RENDER_LOADED_MISSILES_UNLESS_HIDDEN');
    if (
      showMissile &&
      weapon.turretOffsets.length > 0 &&
      weapon.projSpriteName
    ) {
      const offsetPairs = [];
      for (let i = 0; i < weapon.turretOffsets.length; i += 2) {
        offsetPairs.push([
          weapon.turretOffsets[i],
          weapon.turretOffsets[i + 1],
        ]);
      }
      result.set(weapon.id, offsetPairs);
    }
  }
  return result;
});
</script>

<template>
  <q-page
    padding
    style="
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: 10px 10px;
    "
  >
    <q-btn
      style="flex: 0.2 0 auto"
      v-for="weapon in dataStore.sortdWeapon"
      :key="weapon.id"
      :to="{ name: 'weapon', params: { id: weapon.id } }"
    >
      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: flex-end;
        "
      >
        <div style="flex: 0 0 auto; margin: auto; position: relative">
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
          <img
            style="position: absolute; z-index: 2"
            decoding="async"
            :src="weapon.turretGlowSprite"
          />
          <template v-if="offsetPairsMap.get(weapon.id)">
            <img
              v-for="(offsetPair, index) in offsetPairsMap.get(weapon.id)"
              :style="{
                position: 'absolute',
                zIndex: 1000 + index,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${
                  offsetPair[1] * -1
                }px, ${offsetPair[0] * -1}px)`,
              }"
              :key="index"
              decoding="async"
              :src="weapon.projSpriteName"
            />
          </template>
          <img decoding="async" :src="weapon.turretSprite" />
        </div>
        <span>
          {{ weapon.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
