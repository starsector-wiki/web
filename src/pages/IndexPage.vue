<template>
  <q-page>
    <ul>
      <li v-for="ship in dataStore.sortdShips" :key="ship.id">
        <router-link :to="{ name: 'ship', params: { id: ship.id } }">{{
          ship.name
        }}</router-link>
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { useDataStore } from 'src/stores/dataStore';

defineOptions({
  name: 'IndexPage',
});

const dataStore = useDataStore();
</script>
