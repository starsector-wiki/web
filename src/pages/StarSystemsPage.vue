<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'StarSystemsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="startSystem in appData.sortdStarSystem()" :key="startSystem.id"
      :to="{ name: 'star_system', params: { id: startSystem.id } }">
      <div class="card-item-content">
        <span>
          {{ startSystem.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
