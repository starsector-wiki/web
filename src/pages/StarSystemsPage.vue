<script setup lang="ts">
import { appData } from 'src/AppData';

defineOptions({
  name: 'StarSystemsPage',
});

</script>

<template>
  <q-page padding>
    <div style="width: 1200px;height: 800px;position: relative;background-color: dimgrey;">
      <q-btn v-for="startSystem in appData.sortdStarSystem()" :key="startSystem.id" no-caps unelevated round
        :to="{ name: 'star_system', params: { id: startSystem.id } }" :style="{
          backgroundColor: startSystem.iconColor,
          position: 'absolute',
          top: '25%',
          left: '62%',
          transform: 'translate(-50%, -50%) ' +
            `translate(${startSystem.location.x / 30}px, ${-startSystem.location.y / 30}px)`,
        }">
        <p style="position:absolute; top:100%;color: white;">{{ startSystem.name }}</p>
      </q-btn>
    </div>
  </q-page>
</template>
