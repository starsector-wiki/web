<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'PlanetTypePage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const planetType = computed(() => {
  return appData.getPlanetTypeById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="planetType === undefined">
      <h2>PlanetType id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ planetType.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ planetType.description }}</span>
        <div style="margin: auto">
          <div :style="{
            width: 50 + 'px',
            height: 50 + 'px',
            backgroundColor: '#' + planetType.color,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: `url(${planetType.iconTexture})`,
            maskSize: 'cover',
          }"></div>
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(planetType) }}</code></pre>
    </template>
  </q-page>
</template>
