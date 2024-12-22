<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'FactionPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const faction = computed(() => {
  return appData.getFactionById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="faction === undefined">
      <h2>Faction id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ faction.displayName }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ faction.description }}</span>
        <div style="margin: auto">
          <img decoding="async" :src="faction.logo" />
        </div>
      </div>

      <br /><br />


      <div style="column-count: 2">
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>名称</div>
          <div>{{ faction.displayNameLong }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>人名前缀</div>
          <div>{{ faction.personNamePrefix }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>船名前缀</div>
          <div>{{ faction.shipNamePrefix }}</div>
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(faction) }}</code></pre>
    </template>
  </q-page>
</template>
