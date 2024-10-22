<script setup lang="ts">
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { useDataStore } from 'src/stores/dataStore';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

defineOptions({
  name: 'WeaponPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const weapon = computed(() => {
  return useDataStore().getWeaponById(id.value);
});
const ships = computed(() => {
  return useDataStore().getShipsByIds(weapon.value?.shipIds ?? []);
});
const variantShips = computed(() => {
  return useDataStore().getShipsByIds(weapon.value?.variantIds ?? []);
});
const offsetPairs = computed(() => {
  if (weapon.value) {
    const showMissile =
      weapon.value.renderHints.includes('RENDER_LOADED_MISSILES') ||
      weapon.value.renderHints.includes('RENDER_LOADED_MISSILES_UNLESS_HIDDEN');
    if (
      showMissile &&
      weapon.value.turretOffsets.length > 0 &&
      weapon.value.projSpriteName
    ) {
      const result = [];
      for (let i = 0; i < weapon.value.turretOffsets.length; i += 2) {
        result.push([
          weapon.value.turretOffsets[i],
          weapon.value.turretOffsets[i + 1],
        ]);
      }
      return result;
    }
  }
  return undefined;
});
</script>

<template>
  <q-page>
    <template v-if="weapon === undefined">
      <h2>ShipSystem id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ weapon.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 10px">
        <span
          style="text-align: left; vertical-align: top; white-space: pre-wrap"
          >{{ weapon.description }}</span
        >
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
          <img
            style="position: absolute; z-index: 2"
            decoding="async"
            :src="weapon.turretGlowSprite"
          />
          <template v-if="offsetPairs">
            <img
              v-for="(offsetPair, index) in offsetPairs"
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
      </div>

      <br /><br />

      <template v-if="ships.length > 0">
        <h4>被用于舰船船体</h4>
        <ShipsDiv :ships="ships" />
      </template>

      <template v-if="variantShips.length > 0">
        <h4>被用于舰船装配</h4>
        <ShipsDiv :ships="variantShips" />
      </template>

      <br /><br />

      <pre><code>{{ JSON.stringify(weapon,null,2) }}</code></pre>
    </template>
  </q-page>
</template>
