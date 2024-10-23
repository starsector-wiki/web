<script setup lang="ts">
import { useDataStore } from 'src/stores/dataStore';
import { ShipMod } from 'src/classes/model/shipMod';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'ShipModsPage'
});

const dataStore = useDataStore();
const uiTagOptions = getUITagsOptions();
const manufacturerOptions = getManufacturersOptions();
const normalShipMod = ref<ShipMod[]>([])
const hiddenShipMod = ref<ShipMod[]>([])
const dShipMod = ref<ShipMod[]>([])
const uiTagSelected = ref<string[]>([]);
const manufacturerSelected = ref<string[]>([]);

function getUITagsOptions(): { label: string; value: string }[] {
  const uiTags = new Map<string, number>();
  dataStore.sortdShipMod.forEach(shipMod => {
    shipMod.uiTags.forEach(uiTag => {
        if(!uiTags.has(uiTag)) {
          uiTags.set(uiTag, 1);
        }else{
          uiTags.set(uiTag, (uiTags.get(uiTag))as number + 1);
        }
    });
  });[]
  const result = [];
  result.push({
    label: '全部' + '(' +dataStore.sortdShipMod.length + ')',
    value: '全部'
  });
  for (let [key, value] of uiTags) {
    result.push({
      label: key + '(' +value + ')',
      value: key
    });
  }


  return result;
}
function getManufacturersOptions(): { label: string; value: string }[] {
  const manufacturers = new Map<string, number>();
  dataStore.sortdShipMod.forEach(shipMod => {
    if(!manufacturers.has(shipMod.manufacturer ?? '通常' )) {
      manufacturers.set(shipMod.manufacturer ?? '通常' , 1);
    }else{
      manufacturers.set(shipMod.manufacturer ?? '通常' ,(manufacturers.get(shipMod.manufacturer ?? '通常'))as number  + 1);
    }
  });
  const result = [];
  result.push({
    label: '全部' + '(' +dataStore.sortdShipMod.length + ')',
    value: '全部'
  });
  for (let [key, value] of manufacturers) {
    result.push({
      label: key + '(' +value + ')',
      value: key
    });
  }

  return result;
}

onMounted(()=>{
  init();
})

const DMod = (shipMod: ShipMod) => shipMod.tags.includes('dmod');
const unDMod = (shipMod: ShipMod) => !shipMod.tags.includes('dmod');
const hiddenMod = (shipMod: ShipMod) => shipMod.hidden;
const unHiddenMod = (shipMod: ShipMod) => !shipMod.hidden;
const idSort = (a:ShipMod, b:ShipMod) => a.id.localeCompare(b.id);

const normalModFilterChain = [unDMod,unHiddenMod]
const hiddenModFilterChain = [unDMod,hiddenMod]
const dModFilterChain = [DMod,hiddenMod]

function getNormalMod():ShipMod[]{
  return dataStore.sortdShipMod
    .filter(shipMod=> normalModFilterChain.every(a=>a(shipMod))).sort(idSort);
}
function getHiddenMod():ShipMod[]{
  return dataStore.sortdShipMod
    .filter((shipMod=> hiddenModFilterChain.every(a=>a(shipMod)))).sort(idSort);
}
function getDMod():ShipMod[]{
  return dataStore.sortdShipMod
    .filter((shipMod=> dModFilterChain.every(a=>a(shipMod)))).sort(idSort);
}



function uiTagFilter(shipMod: ShipMod):boolean{
  return shipMod.uiTags.some(uiTag => uiTagSelected.value.includes(uiTag))
}
function manufacturerFilter(shipMod: ShipMod):boolean{
  return manufacturerSelected.value.includes(shipMod.manufacturer ?? '通常')
}

function uiTagALlSelected(){
  uiTagSelected.value = uiTagOptions.map(item => item.value)
}
function manufacturerALlSelected(){
  manufacturerSelected.value = manufacturerOptions.map(item => item.value)
}

function onSubmit(){
  let normalMods = getNormalMod()
  let hiddenMods = getHiddenMod()
  let dMods = getDMod();

  if(uiTagSelected.value.length > 0 && !uiTagSelected.value.includes('全部')){
    normalMods = normalMods.filter(uiTagFilter)
    hiddenMods =  hiddenMods.filter(uiTagFilter)
    dMods = dMods.filter(uiTagFilter)
  }else if(uiTagSelected.value.includes('全部')){
    uiTagALlSelected()
  }
  if(manufacturerSelected.value.length > 0 && !manufacturerSelected.value.includes('全部')){
    normalMods = normalMods.filter(manufacturerFilter)
    hiddenMods =  hiddenMods.filter(manufacturerFilter)
    dMods = dMods.filter(manufacturerFilter)
  }else if(manufacturerSelected.value.includes('全部')){
    manufacturerALlSelected()
  }
   normalShipMod.value = normalMods
   hiddenShipMod.value = hiddenMods
   dShipMod .value = dMods

  console.log(hiddenShipMod.value);
}

function init() {
  normalShipMod.value = getNormalMod()
  hiddenShipMod.value =getHiddenMod()
  dShipMod.value = getDMod();
  uiTagALlSelected()
  manufacturerALlSelected()
}

function onReset() {
   init();
}

</script>
<template>
  <q-page padding
          style="
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: 10px 10px;
    "
  >

    <div class="q-pa-sm window-width" >

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      UI标签:
      <q-option-group name="accepted_uiTags"
                      v-model="uiTagSelected"
                      :options="uiTagOptions"
                      type="checkbox"
                      color="primary"
                      inline />
      设计类型:
      <q-option-group name="accepted_manufacturer"
                        v-model="manufacturerSelected"
                        :options="manufacturerOptions"
                        type="checkbox"
                        color="primary"
                        inline />
        <q-btn label="提交" type="submit" color="primary"/>
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
      </q-form>
    </div>

    <br /><br />
    <h4 v-show="normalShipMod.length > 0" >可使用插件</h4>
    <div class="items">
      <q-btn
        style="flex: 0.2 0 auto"
        v-for="shipMod in normalShipMod"
        :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }"
      >
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

    <h4 v-show="dShipMod.length > 0" >D插件</h4>
    <div class="items">
      <q-btn
        style="flex: 0.2 0 auto"
        v-for="shipMod in dShipMod"
        :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }"
      >
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

    <h4 v-show="hiddenShipMod.length > 0" >隐藏插件</h4>
    <div class="items">
      <q-btn
        style="flex: 0.2 0 auto"
        v-for="shipMod in hiddenShipMod"
        :key="shipMod.id"
        :to="{ name: 'ship_mod', params: { id: shipMod.id } }"
      >
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
