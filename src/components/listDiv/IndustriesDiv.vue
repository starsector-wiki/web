<script setup lang="ts">
import { appData } from 'src/AppData';
import { Industry } from 'src/classes/model/Industry';
import { compareIndustry } from 'src/classes/utils';
import { computed } from 'vue';

defineOptions({
  name: 'IndustriesDiv',
});

interface Props {
  industryValues: (Industry | string)[];
  hiddenOptions?: boolean;
}
const { industryValues, hiddenOptions = false } = defineProps<Props>();

const allIndustries = computed(() => industryValues.map(it => typeof it === 'string' ? appData.getIndustryById(it) : it).filter(it => it !== undefined).sort(compareIndustry));
const finalIndustries = computed(() => allIndustries.value);
</script>

<template>
  <template v-if="!hiddenOptions">
  </template>

  <div class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="industry in finalIndustries" :key="industry.id"
      :to="{ name: 'industry', params: { id: industry.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="industry.imageName" />
        <span>
          {{ industry.name }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
