<script setup lang="ts">
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'ShipModPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const shipMod = computed(() => {
  return appData.getShipModById(id.value);
});
const ships = computed(() => {
  return appData.getShipsByIds(shipMod.value?.shipIds ?? []);
});
const variantShips = computed(() => {
  return appData.getShipsByIds(shipMod.value?.variantIds ?? []);
});
</script>

<template>
  <q-page>
    <template v-if="shipMod === undefined">
      <h2>ShipSystem id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ shipMod.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ shipMod.description }}</span>
        <div style="margin: auto">
          <img style="background-color: black" decoding="async" :src="shipMod.icon" />
        </div>
      </div>

      <br /><br />


      <div style="column-count: 1">
        <div style="display: grid; grid-template-columns: 1fr 9fr">
          <div>设计类型</div>
          <div>{{ shipMod.manufacturer ?? '通常' }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 9fr">
          <div>舰船尺寸</div>
          <div>安装需要点数</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 9fr">
          <div>护卫舰</div>
          <div>{{ shipMod.frigateCost }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 9fr">
          <div>驱逐舰</div>
          <div>{{ shipMod.destroyerCost }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 9fr">
          <div>巡洋舰</div>
          <div>{{ shipMod.cruiserCost }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 9fr">
          <div>主力舰</div>
          <div>{{ shipMod.capitalCost }}</div>
        </div>
      </div>

      <br /><br />

      <template v-if="ships.length > 0">
        <h4>被用于舰船船体</h4>
        <ShipsDiv :ships="ships" />
      </template>

      <template v-if="variantShips.length > 0">
        <h4>被用于舰船装配</h4>
        <ShipsDiv :ships="variantShips" />
      </template>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(shipMod) }}</code></pre>
    </template>
  </q-page>
</template>
