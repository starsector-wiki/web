<script setup lang="ts">
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { useDataStore } from 'src/stores/dataStore';

defineOptions({
  name: 'ShipsPage',
});

const dataStore = useDataStore();
</script>

<template>
  <q-page padding>
    <ShipsDiv :ships="dataStore.sortdShips" />
  </q-page>
</template>
