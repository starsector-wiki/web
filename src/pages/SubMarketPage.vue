<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'SubMarketPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const subMarket = computed(() => {
  return appData.getSubMarketById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="subMarket === undefined">
      <h2>SubMarket id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ subMarket.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ subMarket.desc }}</span>
        <div style="margin: auto">
          <img decoding="async" :src="subMarket.icon ? subMarket.icon : 'graphics/factions/storage.png'" />
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(subMarket) }}</code></pre>
    </template>
  </q-page>
</template>
