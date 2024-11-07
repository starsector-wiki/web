<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'IndexPage',
});
</script>

<template>
  <q-page>
    <ul>
      <li v-for="ship in appData.sortdShips()" :key="ship.id">
        <router-link :to="{ name: 'ship', params: { id: ship.id } }">{{
          ship.emptyHullVariant ? ship.name : ship.name + ' ' + ship.variantName
        }}</router-link>
      </li>
    </ul>
  </q-page>
</template>
