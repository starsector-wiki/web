<script setup lang="ts">
import { appData } from 'src/AppData';
import { compareShipMod } from 'src/classes/utils';
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

const includeFilters = ref<string[]>([]);
const excludeFilters = ref<string[]>([]);
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

const allShipMods = computed(() =>
  shipModValues
    .map((it) => (typeof it === 'string' ? appData.getShipModById(it) : it))
    .filter((it) => it !== undefined)
    .sort(compareShipMod)
);

const shipMods = computed(() => {
  let result = allShipMods.value;

  // 应用包含条件 - 必须满足所有包含条件（且关系）
  if (includeFilters.value && includeFilters.value.length > 0) {
    result = result.filter((shipMod) => {
      return includeFilters.value.every((filter) => matchesFilter(shipMod, filter));
    });
  }

  // 应用排除条件 - 只要匹配任一排除条件就排除（或关系）
  if (excludeFilters.value && excludeFilters.value.length > 0) {
    result = result.filter((shipMod) => {
      return !excludeFilters.value.some((filter) => matchesFilter(shipMod, filter));
    });
  }

  return result;
});

// 为包含条件下拉框生成选项（基于当前已筛选的结果）
const includeFilterOptions = computed(() => {
  return generateFilterOptions(shipMods.value, includeFilters.value, excludeFilters.value);
});

// 为排除条件下拉框生成选项（基于当前已筛选的结果）
const excludeFilterOptions = computed(() => {
  return generateFilterOptions(shipMods.value, excludeFilters.value, includeFilters.value);
});

function generateFilterOptions(shipMods: ShipMod[], selectedFilters: string[], oppositeFilters: string[]) {
  const options: Array<{
    label: string;
    value: string;
    chipLabel: string;
    disable: boolean;
  }> = [];

  // 类型选项
  rowTypeOptions.forEach((opt) => {
    const filterValue = `type:${opt.value}`;

    let count = 0;
    if (opt.value === 'dmod') {
      count = shipMods.filter((m) => m.tags.includes('dmod')).length;
    } else if (opt.value === 'hidden') {
      count = shipMods.filter((m) => m.hidden).length;
    } else if (opt.value === 'normal') {
      count = shipMods.filter((m) => !m.hidden && !m.tags.includes('dmod')).length;
    }

    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[类型] ${opt.label}(${count})`,
      value: filterValue,
      chipLabel: `[类型] ${opt.label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // UI标签选项
  const uiTags = allShipMods.value
    .flatMap((it) => it.uiTags)
    .filter((it): it is string => typeof it === 'string' && it.length > 0)
    .sort();
  const uniqueUiTags = Array.from(new Set(uiTags));

  uniqueUiTags.forEach((tag) => {
    const filterValue = `uiTag:${tag}`;

    const count = shipMods.filter((m) => m.uiTags.includes(tag)).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[UI标签] ${tag}(${count})`,
      value: filterValue,
      chipLabel: `[UI标签] ${tag}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // 设计类型选项
  const manufacturers = Array.from(
    new Set(allShipMods.value.map((it) => it.manufacturer ?? null))
  ).sort((a, b) => {
    const left = a ?? '';
    const right = b ?? '';
    return left.localeCompare(right);
  });

  manufacturers.forEach((manufacturer) => {
    const label = manufacturer && manufacturer.length > 0 ? manufacturer : '未知';
    const filterValue = `manufacturer:${manufacturer ?? 'null'}`;

    const count = shipMods.filter((m) => (m.manufacturer ?? null) === manufacturer).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[设计类型] ${label}(${count})`,
      value: filterValue,
      chipLabel: `[设计类型] ${label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  return options;
}

function matchesFilter(shipMod: ShipMod, filter: string): boolean {
  const [category, value] = filter.split(':');

  if (category === 'type') {
    if (value === 'dmod') return shipMod.tags.includes('dmod');
    if (value === 'hidden') return shipMod.hidden;
    if (value === 'normal') return !shipMod.hidden && !shipMod.tags.includes('dmod');
  } else if (category === 'uiTag') {
    return shipMod.uiTags.includes(value);
  } else if (category === 'manufacturer') {
    const manufacturerValue = value === 'null' ? null : value;
    return (shipMod.manufacturer ?? null) === manufacturerValue;
  }

  return false;
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div class="filter-row">
      <div class="filter-group">
        <div class="filter-item">
          <div class="filter-item-label">包含条件</div>
          <q-select v-model="includeFilters" :options="includeFilterOptions" multiple emit-value map-options use-chips
            dense options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close"
            placeholder="选择需要包含的条件">
            <template v-slot:selected-item="scope">
              <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                color="primary" text-color="white">
                {{ scope.opt.chipLabel || scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">排除条件</div>
          <q-select v-model="excludeFilters" :options="excludeFilterOptions" multiple emit-value map-options use-chips
            dense options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close"
            placeholder="选择需要排除的条件">
            <template v-slot:selected-item="scope">
              <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                color="negative" text-color="white">
                {{ scope.opt.chipLabel || scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!hiddenOptions" class="result-count">
    共 {{ shipMods.length }} 个结果
  </div>

  <div class="card-item-list-page">
    <q-btn class="card-item" style="align-self: stretch" no-caps v-for="shipMod in shipMods" :key="shipMod.id"
      :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
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
