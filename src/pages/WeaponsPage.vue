<script setup lang="ts">
import { useDataStore } from 'src/stores/dataStore';

defineOptions({
  name: 'WeaponsPage',
});

const dataStore = useDataStore();
</script>

<template>
  <q-page
    padding
    style="
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: stretch;
      gap: 10px 10px;
    "
  >
    <q-btn
      style="flex: 0.2 0 auto"
      v-for="weapon in dataStore.sortdWeapon"
      :key="weapon.id"
      :to="{ name: 'weapon', params: { id: weapon.id } }"
    >
      <div
        style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: flex-end;
        "
      >
        <div
          style="
            flex: 1 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <img decoding="async" :src="weapon.turretSprite" />
        </div>
        <span>
          {{ weapon.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
