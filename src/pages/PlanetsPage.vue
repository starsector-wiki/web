<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'PlanetsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="planet in appData.sortdPlanet()" :key="planet.id"
      :to="{ name: 'planet', params: { id: planet.id } }">
      <div class="card-item-content">
        <span>
          {{ planet.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
