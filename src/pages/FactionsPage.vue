<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'FactionsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="faction in appData.sortdFaction()" :key="faction.id"
      :to="{ name: 'faction', params: { id: faction.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="faction.crest" />
        <span>
          {{ faction.displayName }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
