<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'IndustriesPage',
});
</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="industry in appData.sortdIndustry()" :key="industry.id"
      :to="{ name: 'industry', params: { id: industry.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="industry.imageName" />
        <span>
          {{ industry.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
