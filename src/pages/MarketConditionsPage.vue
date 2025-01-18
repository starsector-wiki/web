<script setup lang="ts">
import { appData } from 'src/AppData';
import MarketConditionsDiv from 'src/components/listDiv/MarketConditionsDiv.vue';

defineOptions({
  name: 'MarketConditionsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <MarketConditionsDiv :marketConditionValues="appData.sortdMarketCondition()" />
  </q-page>
</template>
