<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import * as THREE from 'three';
import { debugJson } from 'src/classes/utils';

defineOptions({
  name: 'PlanetTypePage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const planetType = computed(() => {
  return appData.getPlanetTypeById(id.value);
});


const container = useTemplateRef<HTMLDivElement>('container')
onMounted(() => {
  if (planetType.value?.texture && container.value) {
    // 创建场景、相机、渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(256, 256);
    container.value.appendChild(renderer.domElement);

    // 创建球体几何体
    const geometry = new THREE.SphereGeometry(8, 64, 64);

    // 加载纹理
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(planetType.value.texture, (texture) => {
      // 创建材质并应用纹理
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    });

    // 将相机位置调整到合适的位置
    camera.position.z = 14;

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }
})
</script>

<template>
  <q-page>
    <template v-if="planetType === undefined">
      <h2>PlanetType id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ planetType.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ planetType.description }}</span>
        <div style="margin: auto">
          <div v-if="planetType.texture" ref="container"></div>
          <img v-else decoding="async" :src="planetType.iconTexture" />
        </div>
      </div>


      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(planetType) }}</code></pre>
    </template>
  </q-page>
</template>
