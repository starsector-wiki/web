<script setup lang="ts">
import { HullSizeDisplay } from 'src/classes/conts';
import { Ship } from 'src/classes/model/ship';
import ShipSpriteDiv from './ShipSpriteDiv.vue';
import { computed, ref } from 'vue';
import { appData } from 'src/AppData';
import { compareShip, convertOptions } from 'src/classes/utils';

defineOptions({
  name: 'ShipsDiv',
});

interface Props {
  ships: (Ship | string)[];
  hiddenOptions?: boolean;
}
const { ships, hiddenOptions = false } = defineProps<Props>();

const ALL = '全部';
const selectSize = ref(ALL);
const selectManufacturer = ref(ALL);
const selectType = ref('normal');
const rowTypeOptions = [{
  label: ALL,
  value: ALL
}, {
  label: '普通',
  value: 'normal'
}, {
  label: '空间站',
  value: 'station'
}, {
  label: '模块',
  value: 'module'
}];

const sizeOptions = computed(() => {
  const set = new Set(allShips.value.map((it) => it.size));
  return ([[ALL, ALL], ...[...set].map((it) => [HullSizeDisplay.get(it) ?? it, it])])
    .map((it) => {
      return {
        label: it[0] + '(' + filterSize(allShips.value, it[1]).length + ')',
        value: it[1],
      };
    });
});
const manufacturerOptions = computed(() => {
  const set = new Set(allShips.value.map((it) => it.manufacturer).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterManufacturer(allShips.value, it).length + ')',
      value: it,
    };
  });
});
const typeOptions = computed(() => convertOptions(rowTypeOptions, (v) => filterType(allShips.value, v).length));

const allShips = computed(() => ships.map(it => typeof it === 'string' ? appData.getShipById(it) : it).filter(it => it !== undefined).sort(compareShip));
const finalShips = computed(() => filterType(filterManufacturer(filterSize(allShips.value, selectSize.value), selectManufacturer.value), selectType.value));

function filterSize(ships: Ship[], size: string): Ship[] {
  return ships.filter((ship) => {
    if (size === ALL) {
      return true;
    } else {
      return ship.size === size;
    }
  });
}
function filterManufacturer(
  ships: Ship[],
  value: string
): Ship[] {
  return ships.filter((shipMod) => {
    if (value === ALL) {
      return true;
    } else {
      return shipMod.manufacturer === value;
    }
  });
}
function filterType(
  ships: Ship[],
  type: string
): Ship[] {
  return ships.filter((ship) => {
    if (type === ALL) {
      return true;
    } else if (type === 'station') {
      return ship.station;
    } else if (type === 'module') {
      return ship.isModule;
    } else {
      return !ship.station && !ship.isModule;
    }
  });
}
</script>

<template>
  <template v-if="!hiddenOptions">
    <template v-if="sizeOptions.length > 2">
      <span>大小:</span>
      <q-option-group name="accepted_uiTags" v-model="selectSize" :options="sizeOptions" type="radio" color="primary"
        inline />
    </template>
    <template v-if="typeOptions.length > 2">
      <span>类型:</span>
      <q-option-group v-model="selectType" :options="typeOptions" type="radio" color="primary" inline />
    </template>
    <template v-if="manufacturerOptions.length > 2">
      <span>设计类型:</span>
      <q-option-group v-model="selectManufacturer" :options="manufacturerOptions" type="radio" color="primary" inline />
    </template>
  </template>

  <div class="card-item-list-page">
    <q-btn no-caps flat class="card-item" style="align-self: stretch;" v-for="ship in finalShips" :key="ship.id"
      :to="{ name: 'ship', params: { id: ship.id } }">
      <div class="card-item-content">
        <ShipSpriteDiv :ship="ship" />
        <span> {{ ship.getDisplayName() }} </span>
      </div>
    </q-btn>
  </div>
</template>
