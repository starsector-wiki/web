<script setup lang="ts">
import { appData } from 'src/AppData';
import { Faction } from 'src/classes/model/Faction';
import { compareFaction } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'FactionsDiv',
});

interface Props {
  factionValues: (Faction | string)[];
  img?: 'logo' | 'crest';
  hiddenOptions?: boolean;
}
const {
  factionValues,
  img = 'logo',
  hiddenOptions = false,
} = defineProps<Props>();
const $q = useQuasar();

const includeFilters = ref<string[]>([]);
const excludeFilters = ref<string[]>([]);

const rowIsHiddenOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
];

const allFactions = computed(() =>
  factionValues
    .map((it) => (typeof it === 'string' ? appData.getFactionById(it) : it))
    .filter((it) => it !== undefined)
    .sort(compareFaction)
);

const factions = computed(() => {
  let result = allFactions.value;

  // 应用包含条件 - 必须满足所有包含条件（且关系）
  if (includeFilters.value && includeFilters.value.length > 0) {
    result = result.filter((faction) => {
      return includeFilters.value.every((filter) => matchesFilter(faction, filter));
    });
  }

  // 应用排除条件 - 只要匹配任一排除条件就排除（或关系）
  if (excludeFilters.value && excludeFilters.value.length > 0) {
    result = result.filter((faction) => {
      return !excludeFilters.value.some((filter) => matchesFilter(faction, filter));
    });
  }

  return result;
});

// 为包含条件下拉框生成选项（基于当前已筛选的结果）
const includeFilterOptions = computed(() => {
  return generateFilterOptions(factions.value, includeFilters.value, excludeFilters.value);
});

// 为排除条件下拉框生成选项（基于当前已筛选的结果）
const excludeFilterOptions = computed(() => {
  return generateFilterOptions(factions.value, excludeFilters.value, includeFilters.value);
});

function generateFilterOptions(factions: Faction[], selectedFilters: string[], oppositeFilters: string[]) {
  const options: Array<{
    label: string;
    value: string;
    chipLabel: string;
    disable: boolean;
  }> = [];

  // 显示在列表中选项
  rowIsHiddenOptions.forEach((opt) => {
    const filterValue = `isHidden:${opt.value}`;
    const count = opt.value === 'Y'
      ? factions.filter((f) => f.showInIntelTab).length
      : factions.filter((f) => !f.showInIntelTab).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[显示在列表中] ${opt.label}(${count})`,
      value: filterValue,
      chipLabel: `[显示在列表中] ${opt.label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  return options;
}

function matchesFilter(faction: Faction, filter: string): boolean {
  const [category, value] = filter.split(':');

  if (category === 'isHidden') {
    return value === 'Y' ? faction.showInIntelTab : !faction.showInIntelTab;
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
    共 {{ factions.length }} 个结果
  </div>

  <div class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="faction in factions" :key="faction.id"
      :to="{ name: 'faction', params: { id: faction.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="img === 'logo' ? faction.logo : faction.crest" />
        <span :style="{ color: '#' + faction.color }">
          {{ faction.displayName }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
