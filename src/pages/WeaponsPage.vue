<script setup lang="ts">
import { appData } from 'src/AppData';
import WeaponsDiv from 'src/components/listDiv/WeaponsDiv.vue';

defineOptions({
  name: 'WeaponsPage',
});

</script>

<template>
  <q-page padding>
    <WeaponsDiv :weaponValues="appData.sortdWeapon()" />
  </q-page>
</template>
