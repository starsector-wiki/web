<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'SpecialItemsPage',
});
</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn
      class="card-item"
      no-caps
      v-for="specialItem in appData.sortdSpecialItem()"
      :key="specialItem.id"
      :to="{ name: 'special_item', params: { id: specialItem.id } }"
    >
      <div class="card-item-content">
        <img decoding="async" :src="specialItem.iconName" />
        <span>
          {{ specialItem.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
