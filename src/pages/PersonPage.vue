<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'PersonPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const person = computed(() => {
  return appData.getPersonById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="person === undefined">
      <h2>Person id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>{{ person.firstName }} {{ person.lastName }}</h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">
        <span
          style="text-align: left; vertical-align: top; white-space: pre-wrap"
          >{{ person.rank }}</span
        >
        <div style="margin: auto">
          <img decoding="async" :src="person.portraitSprite" />
        </div>
      </div>

      <br /><br />

      <q-btn
        no-caps
        flat
        :to="{ name: 'planet', params: { id: person.planet.id } }"
      >
        <div class="card-item-content">
          <div
            :style="{
              width: 50 + 'px',
              height: 50 + 'px',
              backgroundColor: '#' + person.planet.type.color,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: `url(${person.planet.type.iconTexture})`,
              maskSize: 'cover',
            }"
          ></div>
          <span :style="{ color: '#' + person.planet.faction.color }">
            {{ person.planet.name }}
          </span>
        </div>
      </q-btn>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(person) }}</code></pre>
    </template>
  </q-page>
</template>
