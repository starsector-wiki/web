<script setup lang="ts">
import { appData } from 'src/AppData';
import IndustriesDiv from 'src/components/listDiv/IndustriesDiv.vue';

defineOptions({
  name: 'IndustriesPage',
});
</script>

<template>
  <q-page padding>
    <IndustriesDiv :industryValues="appData.sortdIndustry()" />
  </q-page>
</template>
