<script setup lang="ts">
import { appData } from 'src/AppData';
import { Person } from 'src/classes/model/Person';
import { comparePerson, convertOptions } from 'src/classes/utils';
import { computed, ref } from 'vue';


defineOptions({
  name: 'PersonsDiv',
});

interface Props {
  personValues: (Person | string)[];
  hiddenOptions?: boolean;
}
const { personValues: planetValues, hiddenOptions = false } = defineProps<Props>();


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
  const set = new Set(allPersons.value.map((it) => it.faction));
  const factions = [...set].map(it => {
    return {
      label: it.displayName + '(' + filterFaction(allPersons.value, it.id).length + ')',
      value: it.id,
    };
  });
  return [{
    label: ALL + '(' + filterFaction(allPersons.value, ALL).length + ')',
    value: ALL,
  }, ...factions];
});
const isDefaultOptions = computed(() => convertOptions(rowIsDefaultOptions, (v) => filterIsDefault(allPersons.value, v).length));
const isAiOptions = computed(() => convertOptions(rowIsAiOptions, (v) => filterIsAi(allPersons.value, v).length));

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
  <template v-if="!hiddenOptions">
    <template v-if="factionOptions.length > 2">
      <span>势力:</span>
      <q-option-group v-model="selectFaction" :options="factionOptions" type="radio" color="primary" inline />
    </template>
    <template v-if="isDefaultOptions.length > 2">
      <span>是否为默认:</span>
      <q-option-group v-model="selectIsDefault" :options="isDefaultOptions" type="radio" color="primary" inline />
    </template>
    <template v-if="isAiOptions.length > 2">
      <span>是否为AI核心:</span>
      <q-option-group v-model="selectIsAi" :options="isAiOptions" type="radio" color="primary" inline />
    </template>
  </template>

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
