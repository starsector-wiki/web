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

const includeFilters = ref<string[]>([]);
const excludeFilters = ref<string[]>([]);

const allWeapons = computed(() =>
  weaponValues
    .map((it) => (typeof it === 'string' ? appData.getWeaponById(it) : it))
    .filter((it) => it !== undefined)
    .sort(compareWeapon)
);

const weapons = computed(() => {
  let result = allWeapons.value;

  // 应用包含条件 - 必须满足所有包含条件（且关系）
  if (includeFilters.value && includeFilters.value.length > 0) {
    result = result.filter((weapon) => {
      return includeFilters.value.every((filter) => matchesFilter(weapon, filter));
    });
  }

  // 应用排除条件 - 只要匹配任一排除条件就排除（或关系）
  if (excludeFilters.value && excludeFilters.value.length > 0) {
    result = result.filter((weapon) => {
      return !excludeFilters.value.some((filter) => matchesFilter(weapon, filter));
    });
  }

  return result;
});

// 为包含条件下拉框生成选项（基于当前已筛选的结果）
const includeFilterOptions = computed(() => {
  return generateFilterOptions(weapons.value, includeFilters.value, excludeFilters.value);
});

// 为排除条件下拉框生成选项（基于当前已筛选的结果）
const excludeFilterOptions = computed(() => {
  return generateFilterOptions(weapons.value, excludeFilters.value, includeFilters.value);
});

function generateFilterOptions(weapons: Weapon[], selectedFilters: string[], oppositeFilters: string[]) {
  const options: Array<{
    label: string;
    value: string;
    chipLabel: string;
    disable: boolean;
  }> = [];

  // 大小选项
  const sizes = Array.from(new Set(allWeapons.value.map((it) => it.size)));
  sizes.forEach((size) => {
    const label = WeaponSizeDisplay.get(size) ?? size;
    const filterValue = `size:${size}`;

    const count = weapons.filter((w) => w.size === size).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[大小] ${label}(${count})`,
      value: filterValue,
      chipLabel: `[大小] ${label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  // 类型选项
  const types = Array.from(new Set(allWeapons.value.map((it) => it.mountType)));
  types.forEach((type) => {
    const label = WeaponTypeDisplay.get(type) ?? type;
    const filterValue = `type:${type}`;

    const count = weapons.filter((w) => w.mountType === type).length;
    const isSelected = selectedFilters && selectedFilters.includes(filterValue);
    const isSelectedInOpposite = oppositeFilters && oppositeFilters.includes(filterValue);

    options.push({
      label: `[类型] ${label}(${count})`,
      value: filterValue,
      chipLabel: `[类型] ${label}`,
      disable: (!isSelected && count === 0) || isSelectedInOpposite,
    });
  });

  return options;
}

function matchesFilter(weapon: Weapon, filter: string): boolean {
  const [category, value] = filter.split(':');

  if (category === 'size') {
    return weapon.size === value;
  } else if (category === 'type') {
    return weapon.mountType === value;
  }

  return false;
}
</script>

<template>
  <div v-if="!hiddenOptions" class="filter-toolbar">
    <div class="filter-row">
      <div class="filter-group">
        <div class="filter-item">
          <div class="filter-item-label">包含条件</div>
          <q-select v-model="includeFilters" :options="includeFilterOptions" multiple emit-value map-options use-chips
            dense options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close"
            placeholder="选择需要包含的条件">
            <template v-slot:selected-item="scope">
              <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                color="primary" text-color="white">
                {{ scope.opt.chipLabel || scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
        <div class="filter-item">
          <div class="filter-item-label">排除条件</div>
          <q-select v-model="excludeFilters" :options="excludeFilterOptions" multiple emit-value map-options use-chips
            dense options-dense :behavior="$q.screen.lt.sm ? 'dialog' : 'menu'" clearable clear-icon="close"
            placeholder="选择需要排除的条件">
            <template v-slot:selected-item="scope">
              <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex"
                color="negative" text-color="white">
                {{ scope.opt.chipLabel || scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!hiddenOptions" class="result-count">
    共 {{ weapons.length }} 个结果
  </div>

  <div class="card-item-list-page">
    <q-btn class="card-item" style="align-self: stretch" no-caps v-for="weapon in weapons" :key="weapon.id"
      :to="{ name: 'weapon', params: { id: weapon.id } }">
      <div class="card-item-content">
        <div style="margin: auto">
          <WeaponSpriteDiv style="flex: 0 0 auto" :weapon="weapon" />
        </div>
        <span>
          {{ weapon.name }}
        </span>
      </div>
    </q-btn>
  </div>
</template>
