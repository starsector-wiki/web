<script setup lang="ts">
import { appData } from 'src/AppData';
import { MarketCondition } from 'src/classes/model/MarketCondition';
import { compareMarketCondition } from 'src/classes/utils';
import { computed } from 'vue';

defineOptions({
  name: 'MarketConditionsDiv',
});

interface Props {
  marketConditionValues: (MarketCondition | string)[];
  hiddenOptions?: boolean;
}
const { marketConditionValues, hiddenOptions = false } = defineProps<Props>();

const allMarketConditions = computed(() =>
  marketConditionValues
    .map((it) =>
      typeof it === 'string' ? appData.getMarketConditionById(it) : it
    )
    .filter((it) => it !== undefined)
    .sort(compareMarketCondition)
);
</script>

<template>
  <template v-if="!hiddenOptions"> </template>

  <div class="card-item-list-page">
    <q-btn
      class="card-item"
      no-caps
      v-for="marketCondition in allMarketConditions"
      :key="marketCondition.id"
      :to="{ name: 'market_condition', params: { id: marketCondition.id } }"
    >
      <div class="card-item-content">
        <img decoding="async" :src="marketCondition.icon" />
        <span>
          {{ marketCondition.name }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
