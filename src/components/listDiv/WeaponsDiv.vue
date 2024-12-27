<script setup lang="ts">
import { appData } from 'src/AppData';
import { Weapon } from 'src/classes/model/weapon';
import { compareWeapon } from 'src/classes/utils';
import { computed, ref } from 'vue';
import WeaponSpriteDiv from '../WeaponSpriteDiv.vue';
import { WeaponSizeDisplay, WeaponTypeDisplay } from 'src/classes/conts';


defineOptions({
  name: 'WeaponsDiv',
});

interface Props {
  weaponValues: (Weapon | string)[];
  hiddenOptions?: boolean;
}
const { weaponValues, hiddenOptions = false } = defineProps<Props>();

const ALL = '全部';
const selectSize = ref(ALL);
const selectType = ref(ALL);

const sizeOptions = computed(() => {
  const set = new Set(allWeapons.value.map((it) => it.size));
  return ([[ALL, ALL], ...[...set].map((it) => [WeaponSizeDisplay.get(it) ?? it, it])])
    .map((it) => {
      return {
        label: it[0] + '(' + filterSize(allWeapons.value, it[1]).length + ')',
        value: it[1],
      };
    });
});
const typeOptions = computed(() => {
  const set = new Set(allWeapons.value.map((it) => it.mountType));
  return ([[ALL, ALL], ...[...set].map((it) => [WeaponTypeDisplay.get(it) ?? it, it])])
    .map((it) => {
      return {
        label: it[0] + '(' + filterType(allWeapons.value, it[1]).length + ')',
        value: it[1],
      };
    });
});

const allWeapons = computed(() => weaponValues.map(it => typeof it === 'string' ? appData.getWeaponById(it) : it).filter(it => it !== undefined).sort(compareWeapon));
const weapons = computed(() => filterType(filterSize(allWeapons.value, selectSize.value), selectType.value));

function filterSize(weapons: Weapon[], value: string): Weapon[] {
  return weapons.filter((weapon) => {
    if (value === ALL) {
      return true;
    } else {
      return weapon.size === value;
    }
  });
}
function filterType(
  weapons: Weapon[],
  value: string
): Weapon[] {
  return weapons.filter((shipMod) => {
    if (value === ALL) {
      return true;
    } else {
      return shipMod.mountType === value;
    }
  });
}
</script>

<template>
  <template v-if="!hiddenOptions">
    <span>大小:</span>
    <q-option-group v-model="selectSize" :options="sizeOptions" type="radio" color="primary" inline />
    <span>类型:</span>
    <q-option-group v-model="selectType" :options="typeOptions" type="radio" color="primary" inline />
  </template>

  <div class="card-item-list-page">
    <q-btn class="card-item" style="align-self: stretch;" no-caps v-for="weapon in weapons" :key="weapon.id"
      :to="{ name: 'weapon', params: { id: weapon.id } }">
      <div class="card-item-content">
        <div style="margin: auto;">
          <WeaponSpriteDiv style="flex: 0 0 auto" :weapon="weapon" />
        </div>
        <span>
          {{ weapon.name }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
