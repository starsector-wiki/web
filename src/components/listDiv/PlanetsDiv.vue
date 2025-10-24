<script setup lang="ts">
import { appData } from 'src/AppData';
import { Planet } from 'src/classes/model/Planet';
import { comparePlanet } from 'src/classes/utils';
import { computed, ref } from 'vue';


defineOptions({
  name: 'PlanetsDiv',
});

interface Props {
  planetValues: (Planet | string)[];
  hiddenOptions?: boolean;
}
const { planetValues, hiddenOptions = false } = defineProps<Props>();

const ALL = '全部';
const selectFaction = ref(ALL);
const selectSize = ref(ALL);
const selectType = ref(ALL);

const factionOptions = computed(() => {
  const basePlanets = filterType(filterSize(allPlanets.value, selectSize.value), selectType.value);
  const set = new Set(allPlanets.value.map((it) => it.faction));
  const factions = [...set].map(it => {
    return {
      label: it.displayName + '(' + filterFaction(basePlanets, it.id).length + ')',
      value: it.id,
    };
  });
  return [{
    label: ALL + '(' + filterFaction(basePlanets, ALL).length + ')',
    value: ALL,
  }, ...factions];
});
const sizeOptions = computed(() => {
  const basePlanets = filterType(filterFaction(allPlanets.value, selectFaction.value), selectType.value);
  const set = new Set(allPlanets.value.map((it) => {
    if (it.market && !it.market.planetConditionMarketOnly && it.market.size >= 3) {
      return it.market.size.toString();
    }
    return undefined;
  }).filter(it => it !== undefined));
  return [ALL, ...set].map(it => {
    return {
      label: it + '(' + filterSize(basePlanets, it).length + ')',
      value: it,
    };
  });
});
const typeOptions = computed(() => {
  const basePlanets = filterFaction(filterSize(allPlanets.value, selectSize.value), selectFaction.value);
  const set = new Set(allPlanets.value.map((it) => it.type));
  const options = [...set].map(it => {
    return {
      label: it.name + '(' + filterType(basePlanets, it.id).length + ')',
      value: it.id,
    }
  });
  return [{
    label: ALL + '(' + filterType(basePlanets, ALL).length + ')',
    value: ALL,
  }, ...options];
});

const allPlanets = computed(() => planetValues.map(it => typeof it === 'string' ? appData.getPlanetById(it) : it).filter(it => it !== undefined).filter(it => !it.isSubStation).sort(comparePlanet));
const finalPlanets = computed(() => filterType(filterSize(filterFaction(allPlanets.value, selectFaction.value), selectSize.value), selectType.value));

function filterFaction(
  planets: Planet[],
  value: string): Planet[] {
  return planets.filter((planet) => {
    if (value === ALL) {
      return true;
    } else {
      return planet.factionId === value;
    }
  });
}
function filterSize(
  planets: Planet[],
  value: string): Planet[] {
  return planets.filter((planet) => {
    if (value === ALL) {
      return true;
    } else if (planet.market && !planet.market.planetConditionMarketOnly) {
      return planet.market.size.toString() === value;
    }
    return false;
  });
}
function filterType(
  planets: Planet[],
  value: string): Planet[] {
  return planets.filter((planet) => {
    if (value === ALL) {
      return true;
    } else {
      return planet.typeId === value;
    }
  });
}
</script>

<template>
  <template v-if="!hiddenOptions">
    <template v-if="factionOptions.length > 2">
      <span>势力:</span>
      <q-option-group v-model="selectFaction" :options="factionOptions" type="radio" color="primary" inline />
    </template>
    <template v-if="sizeOptions.length > 2">
      <span>殖民地大小:</span>
      <q-option-group v-model="selectSize" :options="sizeOptions" type="radio" color="primary" inline />
    </template>
    <template v-if="typeOptions.length > 2">
      <span>星球类型:</span>
      <q-option-group v-model="selectType" :options="typeOptions" type="radio" color="primary" inline />
    </template>
  </template>

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
