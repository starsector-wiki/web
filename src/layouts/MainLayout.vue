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

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Starsector Wiki </q-toolbar-title>
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
        <q-item clickable :to="{ name: 'weapons' }">
          <q-item-section> 武器数据 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'special_items' }">
          <q-item-section> 特殊物品 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'commodites' }">
          <q-item-section> 商品 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'industries' }">
          <q-item-section> 产业 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'planet_types' }">
          <q-item-section> 星球类型 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'market_conditions' }">
          <q-item-section> 星球特性 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'sub_markets' }">
          <q-item-section> 子市场类型 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'factions' }">
          <q-item-section> 派系 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'star_systems' }">
          <q-item-section> 星系 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'planets' }">
          <q-item-section> 星球 </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'persons' }">
          <q-item-section> 人物 </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component v-if="route.meta.keepAlive" :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-if="!route.meta.keepAlive" :is="Component" :key="route.fullPath" />
      </router-view>
    </q-page-container>
  </q-layout>
</template>
