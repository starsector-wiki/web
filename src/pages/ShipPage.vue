<script setup lang="ts">
import { ShieldTypeDisplay } from 'src/classes/conts';
import MutableStatDiv from 'src/components/MutableStatDiv.vue';
import ShipsDiv from 'src/components/ShipsDiv.vue';
import { appData } from 'src/AppData';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

defineOptions({
  name: 'ShipPage',
});

const route = useRoute();
let id = ref(route.params.id as string);
onBeforeRouteUpdate(async (to) => {
  id.value = to.params.id as string;
  drawCanvas();
});
const ship = computed(() => appData.getShipById(id.value));
const skins = computed(() =>
  appData.getShipsByIds(ship.value?.skinIds ?? [])
);
const variants = computed(() =>
  appData.getShipsByIds(ship.value?.varinatIds ?? [])
);

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
async function drawCanvas() {
  if (canvas.value) {
    let ctx = canvas.value.getContext('2d');
    if (ctx && ship.value) {
      ctx.imageSmoothingEnabled = false;
      const offscreenCanvas = await appData.getShipCanvas(ship.value);
      canvas.value.width = offscreenCanvas.canvas.width;
      canvas.value.height = offscreenCanvas.canvas.height;
      ctx.drawImage(offscreenCanvas.canvas, 0, 0);
    }
  }
}
onMounted(drawCanvas);
</script>

<template>
  <q-page padding>
    <template v-if="ship === undefined">
      <h2>Ship id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ ship.getDisplayName() }}
      </h4>

      <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 10px">
        <span style="text-align: left; vertical-align: top; white-space: pre-wrap">{{ ship.description }}</span>
        <canvas id="canvas" ref="canvas"></canvas>
      </div>

      <br /><br />

      <table>
        <colgroup>
          <col style="width: 21%" />
          <col style="width: 13%" />
          <col style="width: 20%" />
          <col style="width: 13%" />
          <col style="width: 20%" />
          <col style="width: 13%" />
        </colgroup>
        <thead>
          <tr>
            <th colspan="4" style="text-align: center">后勤数据</th>
            <th colspan="2" style="text-align: center">战斗性能</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>作战后消耗的战备值(CR)</td>
            <td style="text-align: right">{{ ship.crToDeploy }}%</td>
            <td>维护消耗(补给/月)</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.suppliesPerMonth" :add-is-good="false" />
            </td>
            <td>结构值</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.hitPoints" />
            </td>
          </tr>
          <tr>
            <td>战备值(CR)恢复速率(每天)</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.repairPercentPerDay" />%
            </td>
            <td>载货量</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.cargo" />
            </td>
            <td>装甲值</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.armorRating" />
            </td>
          </tr>
          <tr>
            <td>部署成本(补给)</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.suppliesToRecover" :add-is-good="false" />
            </td>
            <td>最大载员</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.maxCrew" />
            </td>
            <td>防御方式</td>
            <td style="text-align: right">
              {{ ShieldTypeDisplay.get(ship.shieldType) }}
            </td>
          </tr>
          <tr>
            <td>部署点</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.suppliesToRecover" :add-is-good="false" />
            </td>
            <td>必要船员</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.minCrew" :add-is-good="false" />
            </td>
            <td>
              {{
                ship.hasShield()
                  ? '护盾角度'
                  : ship.hasPhase()
                    ? '相位线圈激活'
                    : ''
              }}
            </td>
            <td style="text-align: right">
              <MutableStatDiv v-if="ship.hasShield()" :stat="ship.shieldArc" />
              <MutableStatDiv v-else-if="ship.hasPhase()" :stat="ship.phaseCost" :add-is-good="false" />
            </td>
          </tr>
          <tr>
            <td>峰值时间(秒)</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.noCRLossSeconds" />
            </td>
            <td>燃料容量</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.fuel" />
            </td>
            <td>
              {{
                ship.hasShield()
                  ? '护盾维持(幅能/秒)'
                  : ship.hasPhase()
                    ? '相位线圈维持(幅能/秒)'
                    : ''
              }}
            </td>
            <td style="text-align: right">
              <MutableStatDiv v-if="ship.hasShield()" :stat="ship.shieldUpkeep" :add-is-good="false" />
              <MutableStatDiv v-else-if="ship.hasPhase()" :stat="ship.phaseUpKeep" :add-is-good="false" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: right"></td>
            <td>最大宇宙航速</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.maxBurn" />
            </td>
            <td>
              {{ ship.hasShield() ? '护盾效率(幅能/伤害)' : '' }}
            </td>
            <td style="text-align: right">
              <MutableStatDiv v-if="ship.hasShield()" :stat="ship.fluxPerDamageAbsorbed" :add-is-good="false" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: right"></td>
            <td>燃料消耗(光年)</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.fuelPerLY" :add-is-good="false" />
            </td>
            <td>幅能容量</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.fluxCapacity" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: right"></td>
            <td></td>
            <td style="text-align: right"></td>
            <td>幅能耗散</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.fluxDissipation" />
            </td>
          </tr>
          <tr>
            <td>装配点数</td>
            <td style="text-align: right">{{ ship.ordnancePoints }}</td>
            <td>被侦察范围</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.sensorProfile" :add-is-good="false" />
            </td>
            <td>最高航速</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.maxSpeed" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>探测范围</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.sensorStrength" />
            </td>
            <td></td>
            <td style="text-align: right"></td>
          </tr>
          <tr>
            <td>战术系统</td>
            <td colspan="5">
              <router-link v-if="ship.getSystem()" :to="{
                name: 'ship_system',
                params: { id: ship?.shipSystemId },
              }">{{ ship.getSystem()?.name }}</router-link>
            </td>
            <td></td>
          </tr>
          <tr v-if="ship.hasSystem()">
            <td></td>
            <td colspan="5" style="white-space: pre-wrap">
              {{ ship.getSystemDescription() }}
            </td>
          </tr>
          <tr>
            <td>特殊系统</td>
            <td colspan="5">
              <router-link v-if="ship.getDefense()" :to="{
                name: 'ship_system',
                params: { id: ship?.shipDefenseId },
              }">{{ ship.getDefense()?.name ?? '无' }}</router-link>
            </td>
          </tr>
          <tr v-if="ship.hasDefense()">
            <td></td>
            <td colspan="5" style="white-space: pre-wrap">
              {{ ship.getDefenseDescription() }}
            </td>
          </tr>
          <tr>
            <td>安装槽位:</td>
            <td colspan="5">{{ ship.getSlotDescription() }}</td>
          </tr>
          <tr>
            <td>军备详情:</td>
            <td colspan="5">
              <span style="margin-right: 10px" v-for="weapon in ship.getWeapons()" :key="weapon.id">
                {{ weapon.count }}x
                <router-link v-if="weapon.id != weapon.name" :to="{ name: 'weapon', params: { id: weapon.id } }">
                  {{ weapon.name }}
                </router-link>
                <span v-else>{{ weapon.name }}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td>船体插槽:</td>
            <td colspan="5">
              <span style="margin-right: 10px" v-for="shipMod in ship.getShipMods()" :key="shipMod.id">
                <router-link v-if="shipMod.id != shipMod.name" :to="{ name: 'ship_mod', params: { id: shipMod.id } }">
                  {{ shipMod.name }}
                </router-link>
                <span v-else>{{ shipMod.name }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <br /><br />

      <template v-if="skins.length > 0">
        <h4>变体船</h4>
        <ShipsDiv :ships="skins" />
      </template>

      <template v-if="variants.length > 0">
        <h4>装配</h4>
        <ShipsDiv :ships="variants" />
      </template>

      <br /><br />

      <pre><code>{{ JSON.stringify(ship, null, 2) }}</code></pre>
    </template>
  </q-page>
</template>

<style lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

td {
  border: 1px solid;
}

th {
  border: 1px solid;
}
</style>

<style lang="scss">
img {
  display: block;
}
</style>
