<script setup lang="ts">
import { HullSize, HullSizeDisplay } from 'src/classes/conts';
import { Ship } from 'src/classes/model/ship';
import ShipSpriteDiv from './ShipSpriteDiv.vue';
import { computed, ref } from 'vue';

defineOptions({
  name: 'ShipsDiv',
});

interface Props {
  ships: Ship[];
}
const { ships } = defineProps<Props>();

const showHullSize = [
  HullSize.FIGHTER,
  HullSize.FRIGATE,
  HullSize.DESTROYER,
  HullSize.CRUISER,
  HullSize.CAPITAL_SHIP,
];
const ALL = '全部';
const selectSize = ref(ALL);
const sizeOptions = computed(() => {
  const set = new Set(ships.map((it) => it.size));
  return ([[ALL, ALL], ...[...set].map((it) => [HullSizeDisplay.get(it) ?? it, it])])
    .map((it) => {
      return {
        label: it[0] + '(' + filterSize(ships, it[1]).length + ')',
        value: it[1],
      };
    });
});
function getShipsBySize(hullSize: HullSize): Ship[] {
  return finalShips.value
    .filter((it) => it.size == hullSize)
    .filter((it) => !it.isModule)
    .sort((a, b) => a.id.localeCompare(b.id));
}
function haveSize(hullSize: HullSize): boolean {
  return finalShips.value.filter((it) => it.size == hullSize).length > 0;
}
function filterSize(ships: Ship[], size: string): Ship[] {
  return ships.filter((ship) => {
    if (size === ALL) {
      return true;
    } else {
      return ship.size === size;
    }
  });
}
const finalShips = computed(() => filterSize(ships, selectSize.value));
</script>

<template>
  <div class="q-pa-sm window-width">
    大小:
    <q-option-group name="accepted_uiTags" v-model="selectSize" :options="sizeOptions" type="radio" color="primary"
      inline />
  </div>
  <template v-for="hullSize in showHullSize" :key="hullSize">
    <template v-if="haveSize(hullSize)">
      <h4>{{ HullSizeDisplay.get(hullSize) ?? hullSize }}</h4>
      <div class="card-item-list-page">
        <q-btn no-caps flat class="card-item" style="align-self: stretch;" v-for="ship in getShipsBySize(hullSize)"
          :key="ship.id" :to="{ name: 'ship', params: { id: ship.id } }">
          <div class="card-item-content">
            <ShipSpriteDiv :ship="ship" />
            <span> {{ ship.getDisplayName() }} </span>
          </div>
        </q-btn>
      </div>
    </template>
  </template>
</template>
