<script setup lang="ts">
import { useDataStore } from './stores/dataStore';

defineOptions({
  name: 'App',
});

useDataStore().initData();
</script>

<template>
  <router-view />
</template>
