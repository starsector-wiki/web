<script setup lang="ts">
import { appData } from 'src/AppData';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const fail = ref(false);

watchEffect(() => {
  if ('none' === appData.status.value) {
    appData.initData();
  } else if ('finish' === appData.status.value) {
    router.replace('/');
  } else if ('fail' === appData.status.value) {
    fail.value = true;
  }
});
</script>

<template>
  <div id="load-page-root">
    <h1 id="load-data-fail-text" v-if="fail">Load Error!</h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<style lang="scss">
#load-page-root {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  #load-data-fail-text {
    color: red;
  }
}
</style>
