<script setup lang="ts">
import { appData } from 'src/AppData';
import PlanetsDiv from 'src/components/listDiv/PlanetsDiv.vue';

defineOptions({
  name: 'PlanetsPage',
});

</script>

<template>
  <q-page padding>
    <PlanetsDiv :planet-values="appData.sortdPlanet()" />
  </q-page>
</template>
