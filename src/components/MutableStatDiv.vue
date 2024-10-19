<template>
  <span>{{ stat.modifiedValue }}</span>
  <span
    v-if="stat.hasModify()"
    :style="{
      color:
        (addIsGood && stat.isPositive()) || (!addIsGood && stat.isNegative())
          ? 'green'
          : 'red',
    }"
    >({{ (stat.isPositive() ? '+' : '') + stat.getAddend() }})</span
  >
</template>

<script setup lang="ts">
import { MutableStat } from 'src/classes/model/ship';

defineOptions({
  name: 'MutableStatDiv',
});

interface Props {
  stat: MutableStat;
  addIsGood?: boolean;
}
const { stat, addIsGood = true } = defineProps<Props>();
</script>
