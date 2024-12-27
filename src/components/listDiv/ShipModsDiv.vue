<script setup lang="ts">
import { appData } from 'src/AppData';
import { compareShipMod, convertOptions } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { ShipMod } from 'src/classes/model/shipMod';


defineOptions({
  name: 'ShipModsDiv',
});

interface Props {
  shipModValues: (ShipMod | string)[];
  hiddenOptions?: boolean;
}
const { shipModValues, hiddenOptions = false } = defineProps<Props>();

const ALL = '全部';
const selectUiTag = ref(ALL);
const selectManufacturer = ref(ALL);
const selectType = ref(ALL);
const rowTypeOptions = [{
  label: ALL,
  value: ALL
}, {
  label: '普通',
  value: 'normal'
}, {
  label: 'D插件',
  value: 'dmod'
}, {
  label: '隐藏',
  value: 'hidden'
}];

const uiTagOptions = computed(() => {
  const set = new Set(allShipMods.value.flatMap((it) => it.uiTags).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterUiTag(allShipMods.value, it).length + ')',
      value: it,
    };
  });
});
const manufacturerOptions = computed(() => {
  const set = new Set(allShipMods.value.map((it) => it.manufacturer).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterManufacturer(allShipMods.value, it).length + ')',
      value: it,
    };
  });
});
const typeOptions = computed(() => convertOptions(rowTypeOptions, (v) => filterType(allShipMods.value, v).length));

const allShipMods = computed(() => shipModValues.map(it => typeof it === 'string' ? appData.getShipModById(it) : it).filter(it => it !== undefined).sort(compareShipMod));
const shipMods = computed(() => filterType(filterManufacturer(filterUiTag(allShipMods.value, selectUiTag.value), selectManufacturer.value), selectType.value));

function filterUiTag(shipMods: ShipMod[], uiTag: string): ShipMod[] {
  return shipMods.filter((shipMod) => {
    if (uiTag === ALL) {
      return true;
    } else {
      return shipMod.uiTags.some((it) => it === uiTag);
    }
  });
}
function filterManufacturer(
  shipMods: ShipMod[],
  manufacturer: string
): ShipMod[] {
  return shipMods.filter((shipMod) => {
    if (manufacturer === ALL) {
      return true;
    } else {
      return shipMod.manufacturer === manufacturer;
    }
  });
}
function filterType(
  shipMods: ShipMod[],
  type: string
): ShipMod[] {
  return shipMods.filter((shipMod) => {
    if (type === ALL) {
      return true;
    } else if (type === 'dmod') {
      return shipMod.tags.includes('dmod');
    } else if (type === 'hidden') {
      return shipMod.hidden;
    } else {
      return !shipMod.hidden && !shipMod.tags.includes('dmod');
    }
  });
}
</script>

<template>
  <template v-if="!hiddenOptions">
    <span>类型:</span>
    <q-option-group v-model="selectType" :options="typeOptions" type="radio" color="primary" inline />
    <span>UI标签:</span>
    <q-option-group v-model="selectUiTag" :options="uiTagOptions" type="radio" color="primary" inline />
    <span>设计类型:</span>
    <q-option-group v-model="selectManufacturer" :options="manufacturerOptions" type="radio" color="primary" inline />
  </template>

  <div class="card-item-list-page">
    <q-btn class="card-item" style="align-self: stretch;" no-caps v-for="shipMod in shipMods" :key="shipMod.id"
      :to="{ name: 'weapon', params: { id: shipMod.id } }">
      <div class="card-item-content">
        <div style="margin: auto;">
          <img decoding="async" :src="shipMod.icon" />
        </div>
        <span>
          {{ shipMod.name }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
