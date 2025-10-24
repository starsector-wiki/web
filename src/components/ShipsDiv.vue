<script setup lang="ts">
import { HullSizeDisplay } from 'src/classes/conts';
import { Ship } from 'src/classes/model/ship';
import ShipSpriteDiv from './ShipSpriteDiv.vue';
import { computed, ref } from 'vue';
import { appData } from 'src/AppData';
import { compareShip, convertOptions } from 'src/classes/utils';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'ShipsDiv',
});

interface Props {
  ships: (Ship | string)[];
  hiddenOptions?: boolean;
}
const { ships, hiddenOptions = false } = defineProps<Props>();
const $q = useQuasar();

const selectSize = ref<string[]>([]);
const selectManufacturer = ref<(string | null)[]>([]);
const selectType = ref<string[]>(['normal']);
const rowTypeOptions = [{
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
  const baseShips = filterType(filterManufacturer(allShips.value, selectManufacturer.value), selectType.value);
  const values = Array.from(new Set(allShips.value.map((it) => it.size)));
  return values.map((value) => {
    const label = HullSizeDisplay.get(value) ?? value;
    return {
      label: `${label}(${filterSize(baseShips, [value]).length})`,
      value,
    };
  });
});
const manufacturerOptions = computed(() => {
  const baseShips = filterType(filterSize(allShips.value, selectSize.value), selectType.value);
  const values = Array.from(new Set(allShips.value.map((it) => it.manufacturer ?? null))).sort((a, b) => {
    const left = a ?? '';
    const right = b ?? '';
    return left.localeCompare(right);
  });
  return values.map((value) => {
    const label = value && value.length > 0 ? value : '未知';
    return {
      label: `${label}(${filterManufacturer(baseShips, [value]).length})`,
      value,
    };
  });
});
const typeOptions = computed(() => {
  const baseShips = filterManufacturer(filterSize(allShips.value, selectSize.value), selectManufacturer.value);
  return convertOptions(rowTypeOptions, (v) => filterType(baseShips, [v]).length);
});

const allShips = computed(() => ships.map(it => typeof it === 'string' ? appData.getShipById(it) : it).filter(it => it !== undefined).sort(compareShip));
const finalShips = computed(() => filterType(filterManufacturer(filterSize(allShips.value, selectSize.value), selectManufacturer.value), selectType.value));

function filterSize(ships: Ship[], sizes: readonly string[] | null | undefined): Ship[] {
  if (!sizes || sizes.length === 0) {
    return ships;
  }
  return ships.filter((ship) => sizes.includes(ship.size));
}
function filterManufacturer(
  ships: Ship[],
  values: readonly (string | null)[] | null | undefined
): Ship[] {
  if (!values || values.length === 0) {
    return ships;
  }
  return ships.filter((ship) => {
    const manufacturer = ship.manufacturer ?? null;
    return values.includes(manufacturer);
  });
}
function filterType(
  ships: Ship[],
  types: readonly string[] | null | undefined
): Ship[] {
  if (!types || types.length === 0) {
    return ships;
  }
  return ships.filter((ship) => {
    const matchesStation = ship.station && types.includes('station');
    const matchesModule = ship.isModule && types.includes('module');
    const matchesNormal = !ship.station && !ship.isModule && types.includes('normal');
    return matchesStation || matchesModule || matchesNormal;
  });
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div v-if="typeOptions.length" class="filter-block">
      <span>类型:</span>
      <q-select v-model="selectType" :options="typeOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
    <div v-if="sizeOptions.length" class="filter-block">
      <span>大小:</span>
      <q-select v-model="selectSize" :options="sizeOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
    <div v-if="manufacturerOptions.length" class="filter-block">
      <span>设计类型:</span>
      <q-select v-model="selectManufacturer" :options="manufacturerOptions" multiple emit-value map-options use-chips
        dense options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close"
        :clear-value="[]" placeholder="全部" />
    </div>
  </div>

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
