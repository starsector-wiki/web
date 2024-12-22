<script setup lang="ts">
import WeaponSpriteDiv from 'src/components/WeaponSpriteDiv.vue';
import { appData } from 'src/AppData';

defineOptions({
  name: 'WeaponsPage',
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
    <q-btn class="card-item" no-caps v-for="weapon in appData.sortdWeapon()" :key="weapon.id"
      :to="{ name: 'weapon', params: { id: weapon.id } }">
      <div style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: flex-end;
        ">
        <WeaponSpriteDiv style="flex: 0 0 auto" :weapon="weapon" />
        <span>
          {{ weapon.name }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
