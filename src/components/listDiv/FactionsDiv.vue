<script setup lang="ts">
import { appData } from 'src/AppData';
import { Faction } from 'src/classes/model/Faction';
import { compareFaction, convertOptions } from 'src/classes/utils';
import { computed, ref } from 'vue';


defineOptions({
  name: 'FactionsDiv',
});

interface Props {
  factionValues: (Faction | string)[];
  img?: 'logo' | 'crest';
  hiddenOptions?: boolean;
}
const { factionValues, img = 'logo', hiddenOptions = false } = defineProps<Props>();

const ALL = '全部';
const selectIsHidden = ref(ALL);
const rowIsHiddenOptions = [{
  label: ALL,
  value: ALL
}, {
  label: '是',
  value: 'Y'
}, {
  label: '否',
  value: 'N'
}];

const allFactions = computed(() => factionValues.map(it => typeof it === 'string' ? appData.getFactionById(it) : it).filter(it => it !== undefined).sort(compareFaction));
const isHiddenOptions = computed(() => convertOptions(rowIsHiddenOptions, (v) => filterIsHidden(allFactions.value, v).length));
const factions = computed(() => filterIsHidden(allFactions.value, selectIsHidden.value));

function filterIsHidden(factions: Faction[], value: string): Faction[] {
  return factions.filter((faction) => {
    if (value === ALL) {
      return true;
    } else {
      return value === 'Y' ? faction.showInIntelTab : !faction.showInIntelTab;
    }
  });
}
</script>

<template>
  <template v-if="!hiddenOptions">
    <span>显示在列表中:</span>
    <q-option-group v-model="selectIsHidden" :options="isHiddenOptions" type="radio" color="primary" inline />
  </template>

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
