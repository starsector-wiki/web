<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';
import PlanetsDiv from 'src/components/listDiv/PlanetsDiv.vue';

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

      <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 10px">
        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{
          starSystem.star.customDescription ?? starSystem.star.type.description }}</span>
        <div style="margin: auto">
          <div :style="{
            width: 50 + 'px',
            height: 50 + 'px',
            backgroundColor: '#' + starSystem.star.type.color,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: `url(${starSystem.star.type.iconTexture})`,
            maskSize: 'cover',
          }"></div>
        </div>
      </div>

      <br /><br />

      <PlanetsDiv :planet-values="starSystem.planets" />

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(starSystem) }}</code></pre>
    </template>
  </q-page>
</template>
