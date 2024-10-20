<template>
  <span>{{ round(stat.modifiedValue) }}</span>
  <span
    v-if="stat.hasModify()"
    :style="{
      color:
        (addIsGood && stat.isPositive()) || (!addIsGood && stat.isNegative())
          ? 'green'
          : 'red',
    }"
    >({{ (stat.isPositive() ? '+' : '') + round(stat.getAddend()) }})</span
  >
</template>

<script setup lang="ts">
import { MutableStat } from 'src/classes/model/ship';
import { round } from 'src/classes/utils';

defineOptions({
  name: 'MutableStatDiv',
});

interface Props {
  stat: MutableStat;
  addIsGood?: boolean;
}
const { stat, addIsGood = true } = defineProps<Props>();
</script>
