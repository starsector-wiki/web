<template>
  <q-page>
    <template v-if="shipData === undefined">
      <h1>Ship id:{{ id }} not found.</h1>
    </template>
    <template v-else>
      <h2>
        {{ shipData.name }}-级{{
          shipData.designation ? ' ' + shipData.designation : ''
        }}
      </h2>

      <table
        class="table table-bordered"
        data-toggle="table"
        data-show-header="false"
      >
        <thead style="display: none">
          <tr>
            <th style="width: 75%; text-align: left; vertical-align: top">
              title
            </th>
            <th
              style="width: 25%; text-align: center; vertical-align: middle"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 75%; text-align: left; vertical-align: top">
              <p v-if="shipData.descriptionPrefix">
                {{ shipData.descriptionPrefix }}
              </p>
              <p>
                {{ shipData.descriptionContent }}
              </p>
            </td>
            <td style="width: 25%; text-align: center; vertical-align: middle">
              <img decoding="async" :src="shipData.sprite" />
            </td>
          </tr>
        </tbody>
      </table>

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
            <td style="text-align: right">{{ shipData.crToDeploy }}%</td>
            <td>维护消耗(补给/月)</td>
            <td style="text-align: right">{{ shipData.suppliesPerMonth }}</td>
            <td>结构值</td>
            <td style="text-align: right">{{ shipData.hitPoints }}</td>
          </tr>
          <tr>
            <td>战备值(CR)恢复速率(每天)</td>
            <td style="text-align: right">
              {{ shipData.repairPercentPerDay }}%
            </td>
            <td>载货量</td>
            <td style="text-align: right">{{ shipData.cargo }}</td>
            <td>装甲值</td>
            <td style="text-align: right">{{ shipData.armorRating }}</td>
          </tr>
          <tr>
            <td>部署成本(补给)</td>
            <td style="text-align: right">{{ shipData.suppliesToRecover }}</td>
            <td>最大载员</td>
            <td style="text-align: right">{{ shipData.maxCrew }}</td>
            <td>防御方式</td>
            <td style="text-align: right">{{ shipData.shieldType }}</td>
          </tr>
          <tr>
            <td>部署点</td>
            <td style="text-align: right">{{ shipData.suppliesToRecover }}</td>
            <td>必要船员</td>
            <td style="text-align: right">{{ shipData.minCrew }}</td>
            <td>
              {{
                shipData.shieldType === 'FRONT' ||
                shipData.shieldType === 'OMNI'
                  ? '护盾角度'
                  : shipData.shieldType === 'PHASE'
                  ? '相位线圈激活'
                  : ''
              }}
            </td>
            <td style="text-align: right">
              {{
                shipData.shieldType === 'FRONT' ||
                shipData.shieldType === 'OMNI'
                  ? shipData.shieldRadius
                  : shipData.shieldType === 'PHASE'
                  ? shipData.phaseCost
                  : ''
              }}
            </td>
          </tr>
          <tr>
            <td>峰值时间(秒)</td>
            <td style="text-align: right">{{ shipData.noCRLossSeconds }}</td>
            <td>燃料容量</td>
            <td style="text-align: right">{{ shipData.fuel }}</td>
            <td>
              {{
                shipData.shieldType === 'FRONT' ||
                shipData.shieldType === 'OMNI'
                  ? '护盾维持(幅能/秒)'
                  : shipData.shieldType === 'PHASE'
                  ? '相位线圈维持(幅能/秒)'
                  : ''
              }}
            </td>
            <td style="text-align: right">
              {{
                shipData.shieldType === 'FRONT' ||
                shipData.shieldType === 'OMNI'
                  ? shipData.shieldCost
                  : shipData.shieldType === 'PHASE'
                  ? shipData.phaseUpKeep
                  : ''
              }}
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: right"></td>
            <td>最大宇宙航速</td>
            <td style="text-align: right">{{ shipData.maxBurn }}</td>
            <td>
              {{
                shipData.shieldType === 'FRONT' ||
                shipData.shieldType === 'OMNI'
                  ? '护盾效率(幅能/伤害)'
                  : ''
              }}
            </td>
            <td style="text-align: right">
              {{
                shipData.shieldType === 'FRONT' ||
                shipData.shieldType === 'OMNI'
                  ? shipData.fluxPerDamageAbsorbed
                  : ''
              }}
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: right"></td>
            <td>燃料消耗(光年)</td>
            <td style="text-align: right">{{ shipData.fuelPerLY }}</td>
            <td>幅能容量</td>
            <td style="text-align: right">{{ shipData.fluxCapacity }}</td>
          </tr>
          <tr>
            <td></td>
            <td style="text-align: right"></td>
            <td></td>
            <td style="text-align: right"></td>
            <td>幅能耗散</td>
            <td style="text-align: right">{{ shipData.fluxDissipation }}</td>
          </tr>
          <tr>
            <td>装配点数</td>
            <td style="text-align: right">{{ shipData.ordnancePoints }}</td>
            <td>被侦察范围</td>
            <td style="text-align: right">{{ shipData.sensorProfile }}</td>
            <td>最高航速</td>
            <td style="text-align: right">{{ shipData.maxSpeed }}</td>
          </tr>
          <tr>
            <td>战术系统</td>
            <td style="text-align: right">{{ shipData.shipSystemId }}</td>
            <td>探测范围</td>
            <td style="text-align: right">{{ shipData.sensorStrength }}</td>
            <td></td>
            <td style="text-align: right"></td>
          </tr>
          <tr>
            <td></td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td>特殊系统</td>
            <td colspan="5">{{ shipData.shipDefenseId }}</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td>安装槽位:</td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td>军备详情:</td>
            <td colspan="5"></td>
          </tr>
          <tr>
            <td>船体插槽:</td>
            <td colspan="5"></td>
          </tr>
        </tbody>
      </table>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { useDataStore } from 'src/stores/dataStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({
  name: 'ShipPage',
});

const route = useRoute();
const id = route.params.id as string;
const shipData = computed(() => {
  return useDataStore().getShipByShipId(id);
});
</script>
