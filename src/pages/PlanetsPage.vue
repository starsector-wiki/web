<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'PlanetsPage',
});

</script>

<template>
  <q-page padding style="
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: 10px 10px;
    ">
    <q-btn style="flex: 0.2 0 auto" v-for="planet in appData.sortdPlanet()" :key="planet.id"
      :to="{ name: 'ship_system', params: { id: planet.id } }">
      <div style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: flex-end;
        ">
        <span>
          {{ planet.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
