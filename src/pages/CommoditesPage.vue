<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'CommoditesPage',
});
</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn
      class="card-item"
      no-caps
      v-for="commodity in appData.sortdCommodity()"
      :key="commodity.id"
      :to="{ name: 'commodity', params: { id: commodity.id } }"
    >
      <div class="card-item-content">
        <img decoding="async" :src="commodity.iconName" />
        <span>
          {{ commodity.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
