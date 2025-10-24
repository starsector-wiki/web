<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'ShipSystemsPage',
});
</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn
      class="card-item"
      no-caps
      v-for="shipSystem in appData.sortdShipSystem()"
      :key="shipSystem.id"
      :to="{ name: 'ship_system', params: { id: shipSystem.id } }"
    >
      <div class="card-item-content">
        <img
          style="background-color: black; width: 64px; height: 64px"
          decoding="async"
          :src="shipSystem.icon"
        />
        <span>
          {{ shipSystem.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
