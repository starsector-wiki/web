<script setup lang="ts">
import { appData } from 'src/AppData';
import FactionsDiv from 'src/components/listDiv/FactionsDiv.vue';

defineOptions({
  name: 'FactionsPage',
});
</script>

<template>
  <q-page padding>
    <FactionsDiv :factionValues="appData.sortdFaction()" img="crest" />
  </q-page>
</template>
