<script setup lang="ts">
import { appData } from 'src/AppData';
import { Weapon } from 'src/classes/model/weapon';
import { compareWeapon } from 'src/classes/utils';
import { computed, ref } from 'vue';
import WeaponSpriteDiv from '../WeaponSpriteDiv.vue';
import { WeaponSizeDisplay, WeaponTypeDisplay } from 'src/classes/conts';
import { useQuasar } from 'quasar';


defineOptions({
  name: 'WeaponsDiv',
});

interface Props {
  weaponValues: (Weapon | string)[];
  hiddenOptions?: boolean;
}
const { weaponValues, hiddenOptions = false } = defineProps<Props>();
const $q = useQuasar();

const selectSize = ref<string[]>([]);
const selectType = ref<string[]>([]);

const sizeOptions = computed(() => {
  const baseWeapons = filterType(allWeapons.value, selectType.value);
  const set = new Set(allWeapons.value.map((it) => it.size));
  return Array.from(set).map((it) => {
    return {
      label: `${WeaponSizeDisplay.get(it) ?? it}(${filterSize(baseWeapons, [it]).length})`,
      value: it,
    };
  });
});
const typeOptions = computed(() => {
  const baseWeapons = filterSize(allWeapons.value, selectSize.value);
  const set = new Set(allWeapons.value.map((it) => it.mountType));
  return Array.from(set).map((it) => {
    return {
      label: `${WeaponTypeDisplay.get(it) ?? it}(${filterType(baseWeapons, [it]).length})`,
      value: it,
    };
  });
});

const allWeapons = computed(() => weaponValues.map(it => typeof it === 'string' ? appData.getWeaponById(it) : it).filter(it => it !== undefined).sort(compareWeapon));
const weapons = computed(() => filterType(filterSize(allWeapons.value, selectSize.value), selectType.value));

function filterSize(weapons: Weapon[], values: readonly string[] | null | undefined): Weapon[] {
  if (!values || values.length === 0) {
    return weapons;
  }
  return weapons.filter((weapon) => values.includes(weapon.size));
}
function filterType(
  weapons: Weapon[],
  values: readonly string[] | null | undefined
): Weapon[] {
  if (!values || values.length === 0) {
    return weapons;
  }
  return weapons.filter((shipMod) => values.includes(shipMod.mountType));
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div class="filter-block" v-if="sizeOptions.length">
      <span>大小:</span>
      <q-select v-model="selectSize" :options="sizeOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
    <div class="filter-block" v-if="typeOptions.length">
      <span>类型:</span>
      <q-select v-model="selectType" :options="typeOptions" multiple emit-value map-options use-chips dense
        options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close" :clear-value="[]"
        placeholder="全部" />
    </div>
  </div>

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
