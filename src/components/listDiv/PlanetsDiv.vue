<script setup lang="ts">
import { appData } from 'src/AppData';
import { Planet } from 'src/classes/model/Planet';
import { comparePlanet } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'PlanetsDiv',
});

interface Props {
  planetValues: (Planet | string)[];
  hiddenOptions?: boolean;
}
const { planetValues, hiddenOptions = false } = defineProps<Props>();
const $q = useQuasar();

const includeFilters = ref<string[]>([]);
const excludeFilters = ref<string[]>([]);

const allPlanets = computed(() =>
  planetValues
    .map((it) => (typeof it === 'string' ? appData.getPlanetById(it) : it))
    .filter((it) => it !== undefined)
    .filter((it) => !it.isSubStation)
    .sort(comparePlanet)
);

const finalPlanets = computed(() => {
  let result = allPlanets.value;

  // 应用包含条件 - 必须满足所有包含条件（且关系）
  if (includeFilters.value && includeFilters.value.length > 0) {
    result = result.filter((planet) => {
      return includeFilters.value.every((filter) => matchesFilter(planet, filter));
    });
  }

  // 应用排除条件 - 只要匹配任一排除条件就排除（或关系）
  if (excludeFilters.value && excludeFilters.value.length > 0) {
    result = result.filter((planet) => {
      return !excludeFilters.value.some((filter) => matchesFilter(planet, filter));
    });
  }

  return result;
});

// 为包含条件下拉框生成选项（基于当前已筛选的结果）
const includeFilterOptions = computed(() => {
  return generateFilterOptions(finalPlanets.value, includeFilters.value, excludeFilters.value);
});

// 为排除条件下拉框生成选项（基于当前已筛选的结果）
const excludeFilterOptions = computed(() => {
  return generateFilterOptions(finalPlanets.value, excludeFilters.value, includeFilters.value);
});

function generateFilterOptions(planets: Planet[], selectedFilters: string[], oppositeFilters: string[]) {
  const options: Array<{
    label: string;
    value: string;
    chipLabel: string;
    disable: boolean;
  }> = [];

  // 势力选项
  const factionMap = new Map<string, { id: string; name: string }>();
  for (const planet of allPlanets.value) {
    factionMap.set(planet.factionId, {
      id: planet.factionId,
      name: planet.faction.displayName,
    });
  }
  const factions = Array.from(factionMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  factions.forEach((faction) => {
    const filterValue = `faction:${faction.id}`;
    const count = planets.filter((p) => p.factionId === faction.id).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[势力] ${faction.name}(${count})`,
      value: filterValue,
      chipLabel: `[势力] ${faction.name}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // 殖民地大小选项
  const sizeSet = new Set<string>();
  for (const planet of allPlanets.value) {
    if (planet.market && !planet.market.planetConditionMarketOnly && planet.market.size >= 3) {
      sizeSet.add(planet.market.size.toString());
    }
  }
  const sizes = Array.from(sizeSet).sort((a, b) => Number(a) - Number(b));

  sizes.forEach((size) => {
    const filterValue = `size:${size}`;
    const count = planets.filter((p) =>
      p.market && !p.market.planetConditionMarketOnly && p.market.size.toString() === size
    ).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[殖民地大小] ${size}(${count})`,
      value: filterValue,
      chipLabel: `[殖民地大小] ${size}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // 星球类型选项
  const typeMap = new Map<string, { id: string; name: string }>();
  for (const planet of allPlanets.value) {
    typeMap.set(planet.typeId, { id: planet.typeId, name: planet.type.name });
  }
  const types = Array.from(typeMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  types.forEach((type) => {
    const filterValue = `type:${type.id}`;
    const count = planets.filter((p) => p.typeId === type.id).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[星球类型] ${type.name}(${count})`,
      value: filterValue,
      chipLabel: `[星球类型] ${type.name}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  return options;
}

function matchesFilter(planet: Planet, filter: string): boolean {
  const [category, value] = filter.split(':');

  if (category === 'faction') {
    return planet.factionId === value;
  } else if (category === 'size') {
    if (!planet.market || planet.market.planetConditionMarketOnly) return false;
    return planet.market.size.toString() === value;
  } else if (category === 'type') {
    return planet.typeId === value;
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
    共 {{ finalPlanets.length }} 个结果
  </div>

  <div class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="planet in finalPlanets" :key="planet.id"
      :to="{ name: 'planet', params: { id: planet.id } }">
      <div class="card-item-content">
        <div :style="{
          width: 50 + 'px',
          height: 50 + 'px',
          backgroundColor: '#' + planet.type.color,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: `url(${planet.type.iconTexture})`,
          maskSize: 'cover',
        }"></div>
        <span :style="{ color: '#' + planet.faction.color }">
          {{ planet.name }}
          <span v-if="planet.market && !planet.market.planetConditionMarketOnly">{{ planet.market.size }}</span>
        </span>
      </div>
    </q-btn>
  </div>
</template>
