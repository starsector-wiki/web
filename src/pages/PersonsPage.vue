<script setup lang="ts">
import { appData } from 'src/AppData';
import PersonsDiv from 'src/components/listDiv/PersonsDiv.vue';

defineOptions({
  name: 'PersonsPage',
});

</script>

<template>
  <q-page padding>
    <PersonsDiv :person-values="appData.sortdPerson()" />
  </q-page>
</template>
