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

const selectFaction = ref<string[]>([]);
const selectSize = ref<string[]>([]);
const selectType = ref<string[]>([]);

const factionOptions = computed(() => {
  const basePlanets = filterType(filterSize(allPlanets.value, selectSize.value), selectType.value);
  const values = new Map<string, { id: string, name: string }>();
  for (const planet of allPlanets.value) {
    values.set(planet.factionId, { id: planet.factionId, name: planet.faction.displayName });
  }
  return Array.from(values.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((it) => ({
      label: `${it.name}(${filterFaction(basePlanets, [it.id]).length})`,
      value: it.id,
    }));
});
const sizeOptions = computed(() => {
  const basePlanets = filterType(filterFaction(allPlanets.value, selectFaction.value), selectType.value);
  const set = new Set<string>();
  for (const planet of allPlanets.value) {
    if (planet.market && !planet.market.planetConditionMarketOnly && planet.market.size >= 3) {
      set.add(planet.market.size.toString());
    }
  }
  const values = Array.from(set).sort((a, b) => Number(a) - Number(b));
  return values.map((it) => ({
    label: `${it}(${filterSize(basePlanets, [it]).length})`,
    value: it,
  }));
});
const typeOptions = computed(() => {
  const basePlanets = filterFaction(filterSize(allPlanets.value, selectSize.value), selectFaction.value);
  const values = new Map<string, { id: string, name: string }>();
  for (const planet of allPlanets.value) {
    values.set(planet.typeId, { id: planet.typeId, name: planet.type.name });
  }
  return Array.from(values.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((it) => ({
      label: `${it.name}(${filterType(basePlanets, [it.id]).length})`,
      value: it.id,
    }));
});

const allPlanets = computed(() => planetValues.map(it => typeof it === 'string' ? appData.getPlanetById(it) : it).filter(it => it !== undefined).filter(it => !it.isSubStation).sort(comparePlanet));
const finalPlanets = computed(() => filterType(filterSize(filterFaction(allPlanets.value, selectFaction.value), selectSize.value), selectType.value));

function filterFaction(
  planets: Planet[],
  values: readonly string[] | null | undefined): Planet[] {
  if (!values || values.length === 0) {
    return planets;
  }
  return planets.filter((planet) => values.includes(planet.factionId));
}
function filterSize(
  planets: Planet[],
  values: readonly string[] | null | undefined): Planet[] {
  if (!values || values.length === 0) {
    return planets;
  }
  return planets.filter((planet) => {
    if (!planet.market || planet.market.planetConditionMarketOnly) {
      return false;
    }
    return values.includes(planet.market.size.toString());
  });
}
function filterType(
  planets: Planet[],
  values: readonly string[] | null | undefined): Planet[] {
  if (!values || values.length === 0) {
    return planets;
  }
  return planets.filter((planet) => values.includes(planet.typeId));
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div v-if="factionOptions.length" class="filter-block">
      <span>势力:</span>
      <q-select v-model="selectFaction" :options="factionOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
    <div v-if="sizeOptions.length" class="filter-block">
      <span>殖民地大小:</span>
      <q-select v-model="selectSize" :options="sizeOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
    <div v-if="typeOptions.length" class="filter-block">
      <span>星球类型:</span>
      <q-select v-model="selectType" :options="typeOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
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
