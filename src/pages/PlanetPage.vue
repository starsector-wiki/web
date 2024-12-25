<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'PlanetPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const planet = computed(() => {
  return appData.getPlanetById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="planet === undefined">
      <h2>Planet id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ planet.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{
          planet.customDescription ?? planet.type.description }}</span>
        <div style="margin: auto">
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(planet) }}</code></pre>
    </template>
  </q-page>
</template>
