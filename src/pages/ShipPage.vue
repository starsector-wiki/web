<template>
  <q-page>
    <template v-if="ship === undefined">
      <h2>Ship id:{{ id }} not found.</h2>
    </template>
    <template v-else>
      <h4>
        {{ ship.name }}-级{{
          ship.emptyHullVariant ? '' : ' ' + ship.variantName + ' '
        }}{{ ship.designation ? ' ' + ship.designation : '' }}
      </h4>

      <table>
        <tbody>
          <tr>
            <td
              style="
                width: 75%;
                text-align: left;
                vertical-align: top;
                white-space: pre-wrap;
              "
            >
              {{ ship.description }}
            </td>
            <td style="width: 25%; text-align: center; vertical-align: middle">
              <img decoding="async" :src="ship.sprite" />
            </td>
          </tr>
        </tbody>
      </table>

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
              <MutableStatDiv
                :stat="ship.suppliesPerMonth"
                :add-is-good="false"
              />
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
              <MutableStatDiv
                :stat="ship.suppliesToRecover"
                :add-is-good="false"
              />
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
              <MutableStatDiv
                :stat="ship.suppliesToRecover"
                :add-is-good="false"
              />
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
              <MutableStatDiv
                v-if="ship.hasShield()"
                :stat="ship.shieldRadius"
              />
              <MutableStatDiv
                v-else-if="ship.hasPhase()"
                :stat="ship.phaseCost"
                :add-is-good="false"
              />
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
              <MutableStatDiv
                v-if="ship.hasShield()"
                :stat="ship.shieldCost"
                :add-is-good="false"
              />
              <MutableStatDiv
                v-else-if="ship.hasPhase()"
                :stat="ship.phaseUpKeep"
                :add-is-good="false"
              />
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
              <MutableStatDiv
                v-if="ship.hasShield()"
                :stat="ship.fluxPerDamageAbsorbed"
                :add-is-good="false"
              />
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
            <td>战术系统</td>
            <td style="text-align: right">
              {{ ship.getSystem()?.name ?? '无' }}
            </td>
            <td>探测范围</td>
            <td style="text-align: right">
              <MutableStatDiv :stat="ship.sensorStrength" />
            </td>
            <td></td>
            <td style="text-align: right"></td>
          </tr>
          <tr v-if="ship.hasSystem()">
            <td></td>
            <td colspan="5" style="white-space: pre-wrap">
              {{ ship.getSystemDescription() }}
            </td>
          </tr>
          <tr>
            <td>特殊系统</td>
            <td colspan="5">{{ ship.getDefense()?.name ?? '无' }}</td>
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
            <td colspan="5">{{ ship.getWeaponDescription() }}</td>
          </tr>
          <tr>
            <td>船体插槽:</td>
            <td colspan="5">{{ ship.getShipModDescription() }}</td>
          </tr>
        </tbody>
      </table>

      <br /><br />

      <pre><code>{{ JSON.stringify(ship,null,2) }}</code></pre>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { ShieldTypeDisplay } from 'src/classes/conts';
import MutableStatDiv from 'src/components/MutableStatDiv.vue';
import { useDataStore } from 'src/stores/dataStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'ShipPage',
});

const route = useRoute();
const id = route.params.id as string;
const ship = computed(() => {
  return useDataStore().getShipById(id);
});
</script>
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
