<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'MarketConditionsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="marketConditionsPage in appData.sortdMarketCondition()"
      :key="marketConditionsPage.id" :to="{ name: 'market_condition', params: { id: marketConditionsPage.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="marketConditionsPage.icon" />
        <span>
          {{ marketConditionsPage.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
