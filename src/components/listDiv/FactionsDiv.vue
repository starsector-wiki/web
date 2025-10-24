<script setup lang="ts">
import { appData } from 'src/AppData';
import { Faction } from 'src/classes/model/Faction';
import { compareFaction, convertOptions } from 'src/classes/utils';
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

const selectIsHidden = ref<string[]>([]);
const rowIsHiddenOptions = [
  {
    label: '是',
    value: 'Y',
  },
  {
    label: '否',
    value: 'N',
  },
];

const allFactions = computed(() =>
  factionValues
    .map((it) => (typeof it === 'string' ? appData.getFactionById(it) : it))
    .filter((it) => it !== undefined)
    .sort(compareFaction)
);
const isHiddenOptions = computed(() =>
  convertOptions(
    rowIsHiddenOptions,
    (v) => filterIsHidden(allFactions.value, [v]).length
  )
);
const factions = computed(() =>
  filterIsHidden(allFactions.value, selectIsHidden.value)
);

function filterIsHidden(
  factions: Faction[],
  values: readonly string[] | null | undefined
): Faction[] {
  if (!values || values.length === 0) {
    return factions;
  }
  const includesYes = values.includes('Y');
  const includesNo = values.includes('N');
  if (includesYes && includesNo) {
    return factions;
  }
  if (includesYes) {
    return factions.filter((faction) => faction.showInIntelTab);
  }
  return factions.filter((faction) => !faction.showInIntelTab);
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div class="filter-block" v-if="isHiddenOptions.length">
      <span>显示在列表中:</span>
      <q-select
        v-model="selectIsHidden"
        :options="isHiddenOptions"
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
      v-for="faction in factions"
      :key="faction.id"
      :to="{ name: 'faction', params: { id: faction.id } }"
    >
      <div class="card-item-content">
        <img
          decoding="async"
          :src="img === 'logo' ? faction.logo : faction.crest"
        />
        <span :style="{ color: '#' + faction.color }">
          {{ faction.displayName }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
