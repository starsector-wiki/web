<template>
  <router-view />
</template>

<script setup lang="ts">
import { useDataStore } from './stores/dataStore';

defineOptions({
  name: 'App',
});

useDataStore().initData();
</script>
