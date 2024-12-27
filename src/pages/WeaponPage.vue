<script setup lang="ts">
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { appData } from 'src/AppData';
import { computed, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { debugJson } from 'src/classes/utils';
import WeaponSpriteDiv from 'src/components/WeaponSpriteDiv.vue';

defineOptions({
  name: 'WeaponPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
});

const weapon = computed(() => {
  return appData.getWeaponById(id.value);
});
const ships = computed(() => {
  return appData.getShipsByIds(weapon.value?.shipIds ?? []);
});
const variantShips = computed(() => {
  return appData.getShipsByIds(weapon.value?.variantIds ?? []);
});
</script>

<template>
  <q-page>
    <template v-if="weapon === undefined">
      <h2>ShipSystem id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ weapon.name }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 10px">
        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ weapon.description }}</span>
        <WeaponSpriteDiv :weapon="weapon" />
      </div>

      <br /><br />

      <div style="column-count: 3">
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>战术应用</div>
          <div>{{ weapon.primaryRoleStr }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>安装类型</div>
          <div>{{ `${weapon.size}, ${weapon.mountType}` }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>部署点</div>
          <div>{{ weapon.ordnancePoint }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>射程</div>
          <div>{{ weapon.maxRange }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>伤害</div>
          <div>
            {{ weapon.damagePerShot
            }}{{ weapon.burstSize > 1 ? ' x ' + weapon.burstSize : '' }}
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>伤害/秒</div>
          <div>{{ weapon.dps }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>(持续)伤害/秒</div>
          <div>{{ weapon.sustainedDps }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>EMP伤害</div>
          <div>{{ weapon.empPerShot }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>EMP伤害每秒</div>
          <div>{{ weapon.empPerSecond }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>幅能每秒</div>
          <div>{{ weapon.fluxPerSecond }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>持续幅能每秒</div>
          <div>{{ weapon.sustainedFluxPerSecond }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>幅能/non-EMP伤害</div>
          <div>{{ weapon.fluxPerDamage }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>描述</div>
          <div>{{ weapon.customPrimary }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>伤害类型</div>
          <div style="white-space: pre-wrap">
            {{
              weapon.damageType.displayName +
              '\n' +
              weapon.damageType.description
            }}
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>导弹飞行速度</div>
          <div>{{ weapon.speedStr }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>导弹追踪性能</div>
          <div>{{ weapon.trackingStr }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>武器精准度</div>
          <div>{{ weapon.accuracyStr }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>武器转向速度</div>
          <div>{{ weapon.turnRateStr }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>最大充能数/最大备弹数</div>
          <div>{{ weapon.maxAmmo }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>充能时间/装弹时间</div>
          <div>{{ weapon.reloadTime }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>每次充能数/每次装弹数</div>
          <div>{{ weapon.reloadSize }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>武器开火间隔</div>
          <div>{{ weapon.reFireDelay }}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr">
          <div>描述</div>
          <div>{{ weapon.customAncillary }}</div>
        </div>
      </div>

      <br /><br />

      <template v-if="ships.length > 0">
        <h4>被用于舰船船体</h4>
        <ShipsDiv :ships="ships" />
      </template>

      <template v-if="variantShips.length > 0">
        <h4>被用于舰船装配</h4>
        <ShipsDiv :ships="variantShips" />
      </template>

      <br /><br />

      <pre v-if="appData.debug"><code>{{ debugJson(weapon) }}</code></pre>
    </template>
  </q-page>
</template>
