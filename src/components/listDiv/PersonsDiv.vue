<script setup lang="ts">
import { appData } from 'src/AppData';
import { Person } from 'src/classes/model/Person';
import { comparePerson, convertOptions } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';


defineOptions({
  name: 'PersonsDiv',
});

interface Props {
  personValues: (Person | string)[];
  hiddenOptions?: boolean;
}
const { personValues: planetValues, hiddenOptions = false } = defineProps<Props>();
const $q = useQuasar();


const ALL = '全部';
const selectFaction = ref(ALL);
const selectIsDefault = ref(ALL);
const rowIsDefaultOptions = [{
  label: ALL,
  value: ALL
}, {
  label: '是',
  value: 'Y'
}, {
  label: '否',
  value: 'N'
}];
const selectIsAi = ref(ALL);
const rowIsAiOptions = [{
  label: ALL,
  value: ALL
}, {
  label: '是',
  value: 'Y'
}, {
  label: '否',
  value: 'N'
}];

const factionOptions = computed(() => {
  const basePersons = filterIsAi(filterIsDefault(allPersons.value, selectIsDefault.value), selectIsAi.value);
  const set = new Set(allPersons.value.map((it) => it.faction));
  const factions = [...set].map(it => {
    return {
      label: it.displayName + '(' + filterFaction(basePersons, it.id).length + ')',
      value: it.id,
    };
  });
  return [{
    label: ALL + '(' + filterFaction(basePersons, ALL).length + ')',
    value: ALL,
  }, ...factions];
});
const isDefaultOptions = computed(() => {
  const basePersons = filterIsAi(filterFaction(allPersons.value, selectFaction.value), selectIsAi.value);
  return convertOptions(rowIsDefaultOptions, (v) => filterIsDefault(basePersons, v).length);
});
const isAiOptions = computed(() => {
  const basePersons = filterIsDefault(filterFaction(allPersons.value, selectFaction.value), selectIsDefault.value);
  return convertOptions(rowIsAiOptions, (v) => filterIsAi(basePersons, v).length);
});

const allPersons = computed(() => planetValues.map(it => typeof it === 'string' ? appData.getPersonById(it) : it).filter(it => it !== undefined).sort(comparePerson));
const finalPersons = computed(() => filterIsAi(filterIsDefault(filterFaction(allPersons.value, selectFaction.value), selectIsDefault.value), selectIsAi.value));

function filterFaction(
  persons: Person[],
  value: string): Person[] {
  return persons.filter((planet) => {
    if (value === ALL) {
      return true;
    } else {
      return planet.factionId === value;
    }
  });
}
function filterIsDefault(persons: Person[], value: string): Person[] {
  return persons.filter((person) => {
    if (value === ALL) {
      return true;
    } else {
      return value === 'Y' ? person.defaults : !person.defaults;
    }
  });
}
function filterIsAi(persons: Person[], value: string): Person[] {
  return persons.filter((person) => {
    if (value === ALL) {
      return true;
    } else {
      return value === 'Y' ? person.aiCore : !person.aiCore;
    }
  });
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div v-if="factionOptions.length > 2" class="filter-block">
      <span>势力:</span>
      <q-option-group v-model="selectFaction" :options="factionOptions" type="radio" color="primary"
        :inline="!$q.screen.lt.sm" />
    </div>
    <div v-if="isDefaultOptions.length > 2" class="filter-block">
      <span>是否为默认:</span>
      <q-option-group v-model="selectIsDefault" :options="isDefaultOptions" type="radio" color="primary"
        :inline="!$q.screen.lt.sm" />
    </div>
    <div v-if="isAiOptions.length > 2" class="filter-block">
      <span>是否为AI核心:</span>
      <q-option-group v-model="selectIsAi" :options="isAiOptions" type="radio" color="primary"
        :inline="!$q.screen.lt.sm" />
    </div>
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
