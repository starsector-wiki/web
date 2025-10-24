<script setup lang="ts">
import { appData } from 'src/AppData';
import { Planet } from 'src/classes/model/Planet';
import { StarSystem } from 'src/classes/model/StarSystem';
import PlanetIconDiv from 'src/components/PlanetIconDiv.vue';
import { computed } from 'vue';

defineOptions({
  name: 'StarSystemsPage',
});

const planets = computed(() => {
  const planets: [Planet, StarSystem, number][] = [];
  for (const starSystem of appData.sortdStarSystem()) {
    planets.push([starSystem.star, starSystem, 0]);
    if (starSystem.secondaryStar) {
      planets.push([starSystem.secondaryStar, starSystem, 40]);
    }
  }
  return planets;
});
</script>

<template>
  <q-page padding>
    <div
      style="
        width: 1200px;
        height: 800px;
        position: relative;
        background-color: dimgrey;
      "
    >
      <q-btn
        v-for="[planet, starSystem, offset] in planets"
        :key="starSystem.id"
        no-caps
        unelevated
        round
        :to="{ name: 'star_system', params: { id: starSystem.id } }"
        :style="{
          position: 'absolute',
          top: '25%',
          left: '62%',
          transform:
            'translate(-50%, -50%) ' +
            `translate(${starSystem.location.x / 30 + offset}px, ${
              -starSystem.location.y / 30 + offset
            }px)`,
        }"
      >
        <PlanetIconDiv :planet="planet" />
        <p style="position: absolute; top: 100%; color: white">
          {{ planet.name }}
        </p>
      </q-btn>
    </div>
  </q-page>
</template>
