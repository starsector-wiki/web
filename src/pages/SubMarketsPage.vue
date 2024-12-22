<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'SubMarketsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="subMarket in appData.sortdSubMarket()" :key="subMarket.id"
      :to="{ name: 'sub_market', params: { id: subMarket.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="subMarket.icon ? subMarket.icon : 'graphics/factions/storage.png'" />
        <span>
          {{ subMarket.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
