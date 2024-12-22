<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'StarSystemPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const starSystem = computed(() => {
  return appData.getStarSystemById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="starSystem === undefined">
      <h2>StarSystem id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ starSystem.name }}
      </h4>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(starSystem) }}</code></pre>
    </template>
  </q-page>
</template>
