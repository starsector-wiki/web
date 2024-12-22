<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'PersonsPage',
});

</script>

<template>
  <q-page padding class="card-item-list-page">
    <q-btn class="card-item" no-caps v-for="person in appData.sortdPerson()" :key="person.id"
      :to="{ name: 'person', params: { id: person.id } }">
      <div class="card-item-content">
        <img decoding="async" :src="person.portraitSprite" />
        <span>
          {{ person.firstName }} {{ person.lastName }}
        </span>
      </div>
    </q-btn>
  </q-page>
</template>
