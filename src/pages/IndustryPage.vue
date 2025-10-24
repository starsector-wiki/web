<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';
import PlanetsDiv from 'src/components/listDiv/PlanetsDiv.vue';

defineOptions({
  name: 'IndustryPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const industry = computed(() => {
  return appData.getIndustryById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="industry === undefined">
      <h2>Industry id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ industry.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">
        <span
          style="text-align: left; vertical-align: top; white-space: pre-wrap"
          >{{ industry.desc }}</span
        >
        <div style="margin: auto">
          <img decoding="async" :src="industry.imageName" />
        </div>
      </div>

      <br /><br />

      <div style="column-count: 2">
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>建造花费</div>
          <div>{{ industry.cost }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>建造时间</div>
          <div>{{ industry.buildTime }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>维护费用</div>
          <div>{{ industry.upkeep }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>收入</div>
          <div>{{ industry.income }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>顺序</div>
          <div>{{ industry.order }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>tags</div>
          <div>{{ industry.tags.join(', ') }}</div>
        </div>
      </div>

      <br /><br />

      <template v-if="industry.planets.length > 0">
        <h4>殖民地</h4>
        <PlanetsDiv :planet-values="industry.planets" />
      </template>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(industry) }}</code></pre>
    </template>
  </q-page>
</template>
