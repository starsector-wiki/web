<script setup lang="ts">
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';
import ShipsDiv from 'src/components/ShipsDiv.vue';
import WeaponsDiv from 'src/components/listDiv/WeaponsDiv.vue';
import ShipModsDiv from 'src/components/listDiv/ShipModsDiv.vue';

defineOptions({
  name: 'FactionPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const faction = computed(() => {
  return appData.getFactionById(id.value);
});
</script>

<template>
  <q-page>
    <template v-if="faction === undefined">
      <h2>Faction id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ faction.displayName }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 10px">

        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ faction.description }}</span>
        <div style="margin: auto">
          <img decoding="async" :src="faction.logo" />
        </div>
      </div>

      <br /><br />


      <div style="column-count: 1">
        <div style="display: grid; grid-template-columns: 1fr 6fr">
          <div>名称</div>
          <div>{{ faction.displayNameLong }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 6fr">
          <div>人名前缀</div>
          <div>{{ faction.personNamePrefix }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 6fr">
          <div>船名前缀</div>
          <div>{{ faction.shipNamePrefix }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 6fr">
          <div>势力关系</div>
          <div style="column-count: 6;">
            <q-btn v-for="[factionId, relationship] in faction.relationshipMap.entries()" :key="factionId"
              :to="{ name: 'faction', params: { id: factionId } }">
              <img style="width: 64px;height: 40px;" :src="appData.getFactionById(factionId)?.logo" />
              {{ appData.getFactionById(factionId)?.displayName }} : {{ Math.floor(relationship * 100) }}
            </q-btn>
          </div>
        </div>
      </div>

      <br /><br />
      <template v-if="faction.knownShipIds.length > 0">
        <h4>船体</h4>
        <ShipsDiv :ships="appData.getShipsByIds(faction.knownShipIds.map(it => it + '_Hull'))" />
      </template>

      <br /><br />
      <template v-if="faction.knownFighterIds.length > 0">
        <h4>飞机</h4>
        <ShipsDiv :ships="appData.getShipsByIds(faction.knownFighterIds.map(it => it.replace('_wing', '_Hull')))" />
      </template>

      <br /><br />
      <template v-if="faction.knownWeaponIds.length > 0">
        <h4>武器</h4>
        <WeaponsDiv :weaponValues="faction.knownWeaponIds" />
      </template>

      <br /><br />
      <template v-if="faction.knownHullModIds.length > 0">
        <h4>船体插件</h4>
        <ShipModsDiv :shipModValues="faction.knownHullModIds" />
      </template>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(faction) }}</code></pre>
    </template>
  </q-page>
</template>
