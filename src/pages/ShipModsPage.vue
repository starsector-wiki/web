<script setup lang="ts">
import { ShipMod } from 'src/classes/model/shipMod';
import { useDataStore } from 'src/stores/dataStore';
import { ref } from 'vue';
import { computed } from 'vue';

defineOptions({
  name: 'ShipModsPage',
});

const ALL = '全部';
const selectUiTag = ref(ALL);
const selectManufacturer = ref(ALL);

const uiTagOptions = computed(() => {
  const allShipMods = useDataStore().sortdShipMod;
  const set = new Set(allShipMods.flatMap((it) => it.uiTags).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterUiTag(allShipMods, it).length + ')',
      value: it,
    };
  });
});
const manufacturerOptions = computed(() => {
  const allShipMods = useDataStore().sortdShipMod;
  const set = new Set(allShipMods.map((it) => it.manufacturer).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterManufacturer(allShipMods, it).length + ')',
      value: it,
    };
  });
});
const shipMods = computed(() => {
  let mods = useDataStore().sortdShipMod.sort((a, b) =>
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
    <div class="items">
      <q-btn style="flex: 0.2 0 auto" v-for="shipMod in shipMods.normalMods" :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
        <div class="item">
          <div class="item_img_section">
            <img decoding="async" :src="shipMod.icon" />
          </div>
          <span>
            {{ shipMod.name }}
          </span>
        </div>
      </q-btn>
    </div>

    <br /><br />

    <h4 v-show="shipMods.dMods.length > 0">D插件</h4>
    <div class="items">
      <q-btn style="flex: 0.2 0 auto" v-for="shipMod in shipMods.dMods" :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
        <div class="item">
          <div class="item_img_section">
            <img decoding="async" :src="shipMod.icon" />
          </div>
          <span>
            {{ shipMod.name }}
          </span>
        </div>
      </q-btn>
    </div>

    <br /><br />

    <h4 v-show="shipMods.hiddenMods.length > 0">隐藏插件</h4>
    <div class="items">
      <q-btn style="flex: 0.2 0 auto" v-for="shipMod in shipMods.hiddenMods" :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
        <div class="item">
          <div class="item_img_section">
            <img decoding="async" :src="shipMod.icon" />
          </div>
          <span>
            {{ shipMod.name }}
          </span>
        </div>
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="scss">
.items {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px 10px;
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
}

.item_img_section {
  flex: 10 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
