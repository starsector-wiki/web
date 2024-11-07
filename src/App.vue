<script setup lang="ts">
import { appData } from './AppData';

defineOptions({
  name: 'App',
});

appData.initData();
</script>

<template>
  <router-view v-if="appData.ready" />
  <h1 v-else>Init Data...</h1>
</template>
