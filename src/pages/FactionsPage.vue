<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'FactionsPage',
});

</script>

<template>
  <q-page padding style="
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: 10px 10px;
    ">
    <q-btn style="flex: 0.2 0 auto" v-for="faction in appData.sortdFaction()" :key="faction.id"
      :to="{ name: 'ship_system', params: { id: faction.id } }">
      <div style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: flex-end;
        ">
        <div style="
            flex: 1 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          ">
          <img decoding="async" :src="faction.logo" />
        </div>
        <span>
          {{ faction.displayName }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
