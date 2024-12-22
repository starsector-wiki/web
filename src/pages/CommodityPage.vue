<script setup lang="ts">
import { appData } from 'src/AppData';
import { debugJson } from 'src/classes/utils';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

defineOptions({
  name: 'CommodityPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const commodity = computed(() => {
  return appData.getCommodityById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="commodity === undefined">
      <h2>Commodity id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ commodity.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ commodity.description }}</span>
        <div style="margin: auto">
          <img decoding="async" :src="commodity.iconName" />
        </div>
      </div>

      <br /><br />


      <div style="column-count: 2">
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>可堆叠数量</div>
          <div>{{ commodity.stackSize }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>顺序</div>
          <div>{{ commodity.order }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>货舱空间</div>
          <div>{{ commodity.cargoSpace }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>基础价格</div>
          <div>{{ commodity.basePrice }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>utility</div>
          <div>{{ commodity.utility }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>base danger</div>
          <div>{{ commodity.baseDanger }}</div>
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(commodity) }}</code></pre>
    </template>
  </q-page>
</template>
