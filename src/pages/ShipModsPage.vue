<script setup lang="ts">
import { appData } from 'src/AppData';
import ShipModsDiv from 'src/components/listDiv/ShipModsDiv.vue';

defineOptions({
  name: 'ShipModsPage',
});
</script>

<template>
  <q-page padding>
    <ShipModsDiv :ship-mod-values="appData.sortdShipMod()" />
  </q-page>
</template>
