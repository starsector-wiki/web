<script setup lang="ts">
import { ShipMod } from 'src/classes/model/shipMod';
import { appData } from 'src/AppData';
import { ref } from 'vue';
import { computed } from 'vue';

defineOptions({
  name: 'ShipModsPage',
});

const ALL = '全部';
const selectUiTag = ref(ALL);
const selectManufacturer = ref(ALL);

const uiTagOptions = computed(() => {
  const allShipMods = appData.sortdShipMod();
  const set = new Set(allShipMods.flatMap((it) => it.uiTags).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterUiTag(allShipMods, it).length + ')',
      value: it,
    };
  });
});
const manufacturerOptions = computed(() => {
  const allShipMods = appData.sortdShipMod();
  const set = new Set(allShipMods.map((it) => it.manufacturer).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterManufacturer(allShipMods, it).length + ')',
      value: it,
    };
  });
});
const shipMods = computed(() => {
  let mods = appData.sortdShipMod().sort((a, b) =>
    a.id.localeCompare(b.id)
  );
  mods = filterUiTag(mods, selectUiTag.value);
  mods = filterManufacturer(mods, selectManufacturer.value);
  const dMods = mods.filter((it) => it.tags.includes('dmod'));
  const hiddenMods = mods.filter((it) => it.hidden);
  const normalMods = mods.filter(
    (it) => !(it.hidden || it.tags.includes('dmod'))
  );
  return {
    dMods,
    hiddenMods,
    normalMods,
  };
});

function filterUiTag(shipMods: ShipMod[], uiTag: string): ShipMod[] {
  return shipMods.filter((shipMod) => {
    if (selectUiTag.value === ALL) {
      return true;
    } else {
      return shipMod.uiTags.some((it) => it === uiTag);
    }
  });
}
function filterManufacturer(
  shipMods: ShipMod[],
  manufacturer: string
): ShipMod[] {
  return shipMods.filter((shipMod) => {
    if (selectManufacturer.value === ALL) {
      return true;
    } else {
      return shipMod.manufacturer === manufacturer;
    }
  });
}
</script>

<template>
  <q-page padding style="
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: 10px 10px;
    ">
    <div class="q-pa-sm window-width">
      UI标签:
      <q-option-group name="accepted_uiTags" v-model="selectUiTag" :options="uiTagOptions" type="radio" color="primary"
        inline />
      设计类型:
      <q-option-group name="accepted_manufacturer" v-model="selectManufacturer" :options="manufacturerOptions"
        type="radio" color="primary" inline />
    </div>

    <br /><br />
    <h4 v-show="shipMods.normalMods.length > 0">可使用插件</h4>
    <div class="card-item-list-page">
      <q-btn class="card-item" no-caps v-for="shipMod in shipMods.normalMods" :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
        <div class="card-item-content">
          <img decoding="async" :src="shipMod.icon" />
          <span>
            {{ shipMod.name }}
          </span>
        </div>
      </q-btn>
    </div>

    <br /><br />

    <h4 v-show="shipMods.dMods.length > 0">D插件</h4>
    <div class="card-item-list-page">
      <q-btn class="card-item" no-caps v-for="shipMod in shipMods.dMods" :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
        <div class="card-item-content">
          <img decoding="async" :src="shipMod.icon" />
          <span>
            {{ shipMod.name }}
          </span>
        </div>
      </q-btn>
    </div>

    <br /><br />

    <h4 v-show="shipMods.hiddenMods.length > 0">隐藏插件</h4>
    <div class="card-item-list-page">
      <q-btn class="card-item" no-caps v-for="shipMod in shipMods.hiddenMods" :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
        <div class="card-item-content">
          <img decoding="async" :src="shipMod.icon" />
          <span>
            {{ shipMod.name }}
          </span>
        </div>
      </q-btn>
    </div>
  </q-page>
</template>
