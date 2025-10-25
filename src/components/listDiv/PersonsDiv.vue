<script setup lang="ts">
import { appData } from 'src/AppData';
import { Person } from 'src/classes/model/Person';
import { comparePerson } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'PersonsDiv',
});

interface Props {
  personValues: (Person | string)[];
  hiddenOptions?: boolean;
}
const { personValues: planetValues, hiddenOptions = false } =
  defineProps<Props>();
const $q = useQuasar();

const includeFilters = ref<string[]>([]);
const excludeFilters = ref<string[]>([]);

const rowIsDefaultOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
];
const rowIsAiOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' },
];

const allPersons = computed(() =>
  planetValues
    .map((it) => (typeof it === 'string' ? appData.getPersonById(it) : it))
    .filter((it) => it !== undefined)
    .sort(comparePerson)
);

const finalPersons = computed(() => {
  let result = allPersons.value;

  // 应用包含条件 - 必须满足所有包含条件（且关系）
  if (includeFilters.value && includeFilters.value.length > 0) {
    result = result.filter((person) => {
      return includeFilters.value.every((filter) => matchesFilter(person, filter));
    });
  }

  // 应用排除条件 - 只要匹配任一排除条件就排除（或关系）
  if (excludeFilters.value && excludeFilters.value.length > 0) {
    result = result.filter((person) => {
      return !excludeFilters.value.some((filter) => matchesFilter(person, filter));
    });
  }

  return result;
});

// 为包含条件下拉框生成选项（基于当前已筛选的结果）
const includeFilterOptions = computed(() => {
  return generateFilterOptions(finalPersons.value, includeFilters.value, excludeFilters.value);
});

// 为排除条件下拉框生成选项（基于当前已筛选的结果）
const excludeFilterOptions = computed(() => {
  return generateFilterOptions(finalPersons.value, excludeFilters.value, includeFilters.value);
});

function generateFilterOptions(persons: Person[], selectedFilters: string[], oppositeFilters: string[]) {
  const options: Array<{
    label: string;
    value: string;
    chipLabel: string;
    disable: boolean;
  }> = [];

  // 势力选项
  const factionMap = new Map<string, { id: string; name: string }>();
  for (const person of allPersons.value) {
    factionMap.set(person.factionId, {
      id: person.factionId,
      name: person.faction.displayName,
    });
  }
  const factions = Array.from(factionMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  factions.forEach((faction) => {
    const filterValue = `faction:${faction.id}`;
    const count = persons.filter((p) => p.factionId === faction.id).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[势力] ${faction.name}(${count})`,
      value: filterValue,
      chipLabel: `[势力] ${faction.name}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // 是否为默认选项
  rowIsDefaultOptions.forEach((opt) => {
    const filterValue = `isDefault:${opt.value}`;
    const count = opt.value === 'Y'
      ? persons.filter((p) => p.defaults).length
      : persons.filter((p) => !p.defaults).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[是否为默认] ${opt.label}(${count})`,
      value: filterValue,
      chipLabel: `[是否为默认] ${opt.label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // 是否为AI核心选项
  rowIsAiOptions.forEach((opt) => {
    const filterValue = `isAi:${opt.value}`;
    const count = opt.value === 'Y'
      ? persons.filter((p) => Boolean(p.aiCore)).length
      : persons.filter((p) => !p.aiCore).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[是否为AI核心] ${opt.label}(${count})`,
      value: filterValue,
      chipLabel: `[是否为AI核心] ${opt.label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  return options;
}

function matchesFilter(person: Person, filter: string): boolean {
  const [category, value] = filter.split(':');

  if (category === 'faction') {
    return person.factionId === value;
  } else if (category === 'isDefault') {
    return value === 'Y' ? person.defaults : !person.defaults;
  } else if (category === 'isAi') {
    return value === 'Y' ? Boolean(person.aiCore) : !person.aiCore;
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
    共 {{ finalPersons.length }} 个结果
  </div>

  <div class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="person in finalPersons" :key="person.id"
      :to="{ name: 'person', params: { id: person.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="person.portraitSprite" />
        <span :style="{ color: '#' + person.faction.color }">
          {{ person.firstName }} {{ person.lastName }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
