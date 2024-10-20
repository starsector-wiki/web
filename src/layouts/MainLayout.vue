<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> 分类 </q-item-label>
        <q-item clickable :to="{ name: 'ships' }">
          <q-item-section> 舰船数据 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'ship_systems' }">
          <q-item-section> 战术系统 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'ship_mods' }">
          <q-item-section> 舰船插件 </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
