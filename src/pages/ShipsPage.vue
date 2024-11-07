<script setup lang="ts">
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { appData } from 'src/AppData';

defineOptions({
  name: 'ShipsPage',
});

</script>

<template>
  <q-page padding>
    <ShipsDiv :ships="appData.sortdShips()" />
  </q-page>
</template>
