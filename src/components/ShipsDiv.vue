<script setup lang="ts">
import { HullSize, HullSizeDisplay } from 'src/classes/conts';
import { Ship } from 'src/classes/model/ship';
import ShipSpriteDiv from './ShipSpriteDiv.vue';

defineOptions({
  name: 'ShipsDiv',
});

interface Props {
  ships: Ship[];
}
const { ships } = defineProps<Props>();

const showHullSize = [
  HullSize.FRIGATE,
  HullSize.DESTROYER,
  HullSize.CRUISER,
  HullSize.CAPITAL_SHIP,
];

function getShipsBySize(hullSize: HullSize): Ship[] {
  return ships
    .filter((it) => it.size == hullSize)
    .filter((it) => !it.isModule)
    .sort((a, b) => a.id.localeCompare(b.id));
}
function haveSize(hullSize: HullSize): boolean {
  return ships.filter((it) => it.size == hullSize).length > 0;
}
</script>

<template>
  <template v-for="hullSize in showHullSize" :key="hullSize">
    <template v-if="haveSize(hullSize)">
      <h4>{{ HullSizeDisplay.get(hullSize) ?? hullSize }}</h4>
      <div class="items">
        <q-btn no-caps flat class="item" v-for="ship in getShipsBySize(hullSize)" :key="ship.id"
          :to="{ name: 'ship', params: { id: ship.id } }">
          <div>
            <div class="item_img_section">
              <!-- <img :src="ship.sprite" /> -->
              <ShipSpriteDiv :ship="ship" />
            </div>
            <span> {{ ship.getDisplayName() }} </span>
          </div>
        </q-btn>
      </div>
    </template>
  </template>
</template>

<style lang="scss">
.items {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px 10px;
}

.item {
  flex: 0.2 0 auto;
}

.item_img_section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
}
</style>
