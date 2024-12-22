<script setup lang="ts">
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'ShipSystemPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const shipSystem = computed(() => {
  return appData.getShipSystemById(id.value);
});
const ships = computed(() => {
  return appData.getShipsByIds(shipSystem.value?.shipIds ?? []);
});
const defenseShips = computed(() => {
  return appData.getShipsByIds(shipSystem.value?.defenseShipIds ?? []);
});
</script>

<template>
  <q-page>
    <template v-if="shipSystem === undefined">
      <h2>ShipSystem id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ shipSystem.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 10px">
        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ shipSystem.description }}</span>
        <div style="margin: auto">
          <img style="background-color: black" decoding="async" :src="shipSystem.icon" />
        </div>
      </div>

      <br /><br />

      <template v-if="ships.length > 0">
        <h4>被用于战术系统</h4>
        <ShipsDiv :ships="ships" />
      </template>

      <template v-if="defenseShips.length > 0">
        <h4>被用于特殊系统</h4>
        <ShipsDiv :ships="defenseShips" />
      </template>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(shipSystem) }}</code></pre>
    </template>
  </q-page>
</template>
