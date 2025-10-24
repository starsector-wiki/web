<script setup lang="ts">
import { appData } from 'src/AppData';
import { compareShipMod, convertOptions } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { ShipMod } from 'src/classes/model/shipMod';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'ShipModsDiv',
});

interface Props {
  shipModValues: (ShipMod | string)[];
  hiddenOptions?: boolean;
}
const { shipModValues, hiddenOptions = false } = defineProps<Props>();
const $q = useQuasar();

const selectUiTag = ref<string[]>([]);
const selectManufacturer = ref<(string | null)[]>([]);
const selectType = ref<string[]>([]);
const rowTypeOptions = [
  {
    label: '普通',
    value: 'normal',
  },
  {
    label: 'D插件',
    value: 'dmod',
  },
  {
    label: '隐藏',
    value: 'hidden',
  },
];

const uiTagOptions = computed(() => {
  const baseShipMods = filterType(
    filterManufacturer(allShipMods.value, selectManufacturer.value),
    selectType.value
  );
  const tags = allShipMods.value
    .flatMap((it) => it.uiTags)
    .filter((it): it is string => typeof it === 'string' && it.length > 0)
    .sort();
  const set = new Set(tags);
  return Array.from(set).map((it) => {
    return {
      label: `${it}(${filterUiTag(baseShipMods, [it]).length})`,
      value: it,
    };
  });
});
const manufacturerOptions = computed(() => {
  const baseShipMods = filterType(
    filterUiTag(allShipMods.value, selectUiTag.value),
    selectType.value
  );
  const values = Array.from(
    new Set(allShipMods.value.map((it) => it.manufacturer ?? null))
  ).sort((a, b) => {
    const left = a ?? '';
    const right = b ?? '';
    return left.localeCompare(right);
  });
  return values.map((it) => {
    const label = it && it.length > 0 ? it : '未知';
    return {
      label: `${label}(${filterManufacturer(baseShipMods, [it]).length})`,
      value: it,
    };
  });
});
const typeOptions = computed(() => {
  const baseShipMods = filterManufacturer(
    filterUiTag(allShipMods.value, selectUiTag.value),
    selectManufacturer.value
  );
  return convertOptions(
    rowTypeOptions,
    (v) => filterType(baseShipMods, [v]).length
  );
});

const allShipMods = computed(() =>
  shipModValues
    .map((it) => (typeof it === 'string' ? appData.getShipModById(it) : it))
    .filter((it) => it !== undefined)
    .sort(compareShipMod)
);
const shipMods = computed(() =>
  filterType(
    filterManufacturer(
      filterUiTag(allShipMods.value, selectUiTag.value),
      selectManufacturer.value
    ),
    selectType.value
  )
);

function filterUiTag(
  shipMods: ShipMod[],
  uiTags: readonly string[] | null | undefined
): ShipMod[] {
  if (!uiTags || uiTags.length === 0) {
    return shipMods;
  }
  return shipMods.filter((shipMod) =>
    shipMod.uiTags.some((it) => uiTags.includes(it))
  );
}
function filterManufacturer(
  shipMods: ShipMod[],
  manufacturer: readonly (string | null)[] | null | undefined
): ShipMod[] {
  if (!manufacturer || manufacturer.length === 0) {
    return shipMods;
  }
  return shipMods.filter((shipMod) => {
    const current = shipMod.manufacturer ?? null;
    return manufacturer.includes(current);
  });
}
function filterType(
  shipMods: ShipMod[],
  types: readonly string[] | null | undefined
): ShipMod[] {
  if (!types || types.length === 0) {
    return shipMods;
  }
  return shipMods.filter((shipMod) => {
    const isDmod = shipMod.tags.includes('dmod');
    const isHidden = shipMod.hidden;
    const isNormal = !isHidden && !isDmod;
    return (
      (isDmod && types.includes('dmod')) ||
      (isHidden && types.includes('hidden')) ||
      (isNormal && types.includes('normal'))
    );
  });
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div class="filter-block" v-if="typeOptions.length">
      <span>类型:</span>
      <q-select
        v-model="selectType"
        :options="typeOptions"
        multiple
        emit-value
        map-options
        use-chips
        dense
        options-dense
        :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'"
        clearable
        clear-icon="close"
        :clear-value="[]"
        placeholder="全部"
      />
    </div>
    <div class="filter-block" v-if="uiTagOptions.length">
      <span>UI标签:</span>
      <q-select
        v-model="selectUiTag"
        :options="uiTagOptions"
        multiple
        emit-value
        map-options
        use-chips
        dense
        options-dense
        :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'"
        clearable
        clear-icon="close"
        :clear-value="[]"
        placeholder="全部"
      />
    </div>
    <div class="filter-block" v-if="manufacturerOptions.length">
      <span>设计类型:</span>
      <q-select
        v-model="selectManufacturer"
        :options="manufacturerOptions"
        multiple
        emit-value
        map-options
        use-chips
        dense
        options-dense
        :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'"
        clearable
        clear-icon="close"
        :clear-value="[]"
        placeholder="全部"
      />
    </div>
  </div>

  <div class="card-item-list-page">
    <q-btn
      class="card-item"
      style="align-self: stretch"
      no-caps
      v-for="shipMod in shipMods"
      :key="shipMod.id"
      :to="{ name: 'ship_mod', params: { id: shipMod.id } }"
    >
      <div class="card-item-content">
        <div style="margin: auto">
          <img decoding="async" :src="shipMod.icon" />
        </div>
        <span>
          {{ shipMod.name }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
