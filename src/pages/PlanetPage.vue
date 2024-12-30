<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';
import PersonsDiv from 'src/components/listDiv/PersonsDiv.vue';
import IndustriesDiv from 'src/components/listDiv/IndustriesDiv.vue';

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
          <div :style="{
            width: 50 + 'px',
            height: 50 + 'px',
            backgroundColor: '#' + planet.type.color,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: `url(${planet.type.iconTexture})`,
            maskSize: 'cover',
          }"></div>
        </div>
      </div>

      <br /><br />


      <q-btn no-caps flat :to="{ name: 'star_system', params: { id: planet.starSystemId } }">
        <div class="card-item-content">
          <div :style="{
            width: 50 + 'px',
            height: 50 + 'px',
            backgroundColor: '#' + planet.starSystem.star.type.color,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: `url(${planet.starSystem.star.type.iconTexture})`,
            maskSize: 'cover',
          }"></div>
          <span>
            {{ planet.starSystem.name }}
          </span>
        </div>
      </q-btn>

      <br /><br />



      <h4>势力</h4>
      <q-btn class="card-item" no-caps :to="{ name: 'faction', params: { id: planet.faction.id } }">
        <div class="card-item-content">
          <img decoding="async" :src="planet.faction.crest" />
          <span>
            {{ planet.faction.displayName }}
          </span>
        </div>
      </q-btn>

      <br /><br />

      <template v-if="planet.persons.length > 0">
        <h4>人物</h4>
        <PersonsDiv :person-values="planet.persons" />
      </template>

      <br /><br />

      <template v-if="planet.market && planet.market.industryIds.length > 0">
        <h4>产业</h4>
        <IndustriesDiv :industryValues="planet.market.industryIds" />
      </template>

      <pre v-if="appData.debug"><code>{{ debugJson(planet) }}</code></pre>
    </template>
  </q-page>
</template>
