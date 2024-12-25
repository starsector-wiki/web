<script setup lang="ts">
import WeaponSpriteDiv from 'src/components/WeaponSpriteDiv.vue';
import { appData } from 'src/AppData';
import { Weapon } from 'src/classes/model/weapon';
import { computed, ref } from 'vue';

defineOptions({
  name: 'WeaponsPage',
});

const ALL = '全部';
const selectSize = ref(ALL);
const selectType = ref(ALL);

const sizeOptions = computed(() => {
  const allWeapons = appData.sortdWeapon();
  const set = new Set(allWeapons.map((it) => it.size).sort().toReversed());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterSize(allWeapons, it).length + ')',
      value: it,
    };
  });
});
const typeOptions = computed(() => {
  const allWeapons = appData.sortdWeapon();
  const set = new Set(allWeapons.map((it) => it.mountType).sort());
  return [ALL, ...set].map((it) => {
    return {
      label: it + '(' + filterType(allWeapons, it).length + ')',
      value: it,
    };
  });
});
function filterSize(weapons: Weapon[], size: string): Weapon[] {
  return weapons.filter((weapon) => {
    if (size === ALL) {
      return true;
    } else {
      return weapon.size === size;
    }
  });
}
function filterType(
  weapons: Weapon[],
  type: string
): Weapon[] {
  return weapons.filter((shipMod) => {
    if (type === ALL) {
      return true;
    } else {
      return shipMod.mountType === type;
    }
  });
}
const weapons = computed(() => filterType(filterSize(appData.sortdWeapon(), selectSize.value), selectType.value));
</script>

<template>
  <q-page padding class="card-item-list-page">
    <div class="q-pa-sm window-width">
      大小:
      <q-option-group name="accepted_uiTags" v-model="selectSize" :options="sizeOptions" type="radio" color="primary"
        inline />
      类型:
      <q-option-group name="accepted_manufacturer" v-model="selectType" :options="typeOptions" type="radio"
        color="primary" inline />
    </div>

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
  </q-page>
</template>
