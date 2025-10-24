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
const { personValues: planetValues, hiddenOptions = false } =
  defineProps<Props>();
const $q = useQuasar();

const selectFaction = ref<string[]>([]);
const selectIsDefault = ref<string[]>([]);
const rowIsDefaultOptions = [
  {
    label: '是',
    value: 'Y',
  },
  {
    label: '否',
    value: 'N',
  },
];
const selectIsAi = ref<string[]>([]);
const rowIsAiOptions = [
  {
    label: '是',
    value: 'Y',
  },
  {
    label: '否',
    value: 'N',
  },
];

const factionOptions = computed(() => {
  const basePersons = filterIsAi(
    filterIsDefault(allPersons.value, selectIsDefault.value),
    selectIsAi.value
  );
  const values = new Map<string, { id: string; name: string }>();
  for (const person of allPersons.value) {
    values.set(person.factionId, {
      id: person.factionId,
      name: person.faction.displayName,
    });
  }
  return Array.from(values.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((it) => ({
      label: `${it.name}(${filterFaction(basePersons, [it.id]).length})`,
      value: it.id,
    }));
});
const isDefaultOptions = computed(() => {
  const basePersons = filterIsAi(
    filterFaction(allPersons.value, selectFaction.value),
    selectIsAi.value
  );
  return convertOptions(
    rowIsDefaultOptions,
    (v) => filterIsDefault(basePersons, [v]).length
  );
});
const isAiOptions = computed(() => {
  const basePersons = filterIsDefault(
    filterFaction(allPersons.value, selectFaction.value),
    selectIsDefault.value
  );
  return convertOptions(
    rowIsAiOptions,
    (v) => filterIsAi(basePersons, [v]).length
  );
});

const allPersons = computed(() =>
  planetValues
    .map((it) => (typeof it === 'string' ? appData.getPersonById(it) : it))
    .filter((it) => it !== undefined)
    .sort(comparePerson)
);
const finalPersons = computed(() =>
  filterIsAi(
    filterIsDefault(
      filterFaction(allPersons.value, selectFaction.value),
      selectIsDefault.value
    ),
    selectIsAi.value
  )
);

function filterFaction(
  persons: Person[],
  values: readonly string[] | null | undefined
): Person[] {
  if (!values || values.length === 0) {
    return persons;
  }
  return persons.filter((planet) => values.includes(planet.factionId));
}
function filterIsDefault(
  persons: Person[],
  values: readonly string[] | null | undefined
): Person[] {
  if (!values || values.length === 0) {
    return persons;
  }
  const includesYes = values.includes('Y');
  const includesNo = values.includes('N');
  if (includesYes && includesNo) {
    return persons;
  }
  if (includesYes) {
    return persons.filter((person) => person.defaults);
  }
  return persons.filter((person) => !person.defaults);
}
function filterIsAi(
  persons: Person[],
  values: readonly string[] | null | undefined
): Person[] {
  if (!values || values.length === 0) {
    return persons;
  }
  const includesYes = values.includes('Y');
  const includesNo = values.includes('N');
  if (includesYes && includesNo) {
    return persons;
  }
  if (includesYes) {
    return persons.filter((person) => Boolean(person.aiCore));
  }
  return persons.filter((person) => !person.aiCore);
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div v-if="factionOptions.length" class="filter-block">
      <span>势力:</span>
      <q-select
        v-model="selectFaction"
        :options="factionOptions"
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
    <div v-if="isDefaultOptions.length" class="filter-block">
      <span>是否为默认:</span>
      <q-select
        v-model="selectIsDefault"
        :options="isDefaultOptions"
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
    <div v-if="isAiOptions.length" class="filter-block">
      <span>是否为AI核心:</span>
      <q-select
        v-model="selectIsAi"
        :options="isAiOptions"
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
      no-caps
      v-for="person in finalPersons"
      :key="person.id"
      :to="{ name: 'person', params: { id: person.id } }"
    >
      <div class="card-item-content">
        <img decoding="async" :src="person.portraitSprite" />
        <span :style="{ color: '#' + person.faction.color }">
          {{ person.firstName }} {{ person.lastName }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
