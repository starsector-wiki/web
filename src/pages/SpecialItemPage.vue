<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

defineOptions({
  name: 'SpecialItemPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const specialItem = computed(() => {
  return appData.getSpecialItemById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="specialItem === undefined">
      <h2>SpecialItem id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ specialItem.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ specialItem.desc }}</span>
        <div style="margin: auto">
          <img decoding="async" :src="specialItem.iconName" />
        </div>
      </div>

      <br /><br />


      <div style="column-count: 2">
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>制造商</div>
          <div>{{ specialItem.manufacturer }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>可堆叠数量</div>
          <div>{{ specialItem.stackSize }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>顺序</div>
          <div>{{ specialItem.order }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>货舱空间</div>
          <div>{{ specialItem.cargoSpace }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>基础价格</div>
          <div>{{ specialItem.basePrice }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>罕见</div>
          <div>{{ specialItem.rarity }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>base danger</div>
          <div>{{ specialItem.baseDanger }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>tags</div>
          <div>{{ specialItem.tags.join(', ') }}</div>
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ JSON.stringify(specialItem, null, 2) }}</code></pre>
    </template>
  </q-page>
</template>
