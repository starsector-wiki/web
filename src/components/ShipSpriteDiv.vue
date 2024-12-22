<script setup lang="ts">
import { CanvasResult } from 'src/classes/model/CanvasSprite';
import { Ship, WeaponSlot } from 'src/classes/model/ship';
import { computeShipSize } from 'src/classes/utils';
import { ref } from 'vue';
import WeaponSpriteDiv from './WeaponSpriteDiv.vue';
import { Weapon } from 'src/classes/model/weapon';
import { appData } from 'src/AppData';

defineOptions({
  name: 'ShipSpriteDiv',
});

interface Props {
  ship: Ship;
}
const { ship } = defineProps<Props>();

const weapons = ref(undefined as [Weapon, WeaponSlot, CanvasResult][] | undefined);

(async () => {
  const result = [];
  for (const [slotId, weaponId] of ship.weaponIdMap.entries()) {
    if (weaponId) {
      const weapon = appData.getWeaponById(weaponId);
      const slotData = ship.allWeaponSlots.find((it) => it.id === slotId);
      if (weapon && slotData) {
        const weaponCanvas = await appData.getWeaponCanvas(weapon, slotData.hardPoint);
        if (weaponCanvas) {
          result.push([weapon, slotData, weaponCanvas] as [Weapon, WeaponSlot, CanvasResult]);
        }
      }
    }
  }
  weapons.value = result.sort((a, b) => {
    //越靠近中间的武器越后渲染，使其显示在顶层
    const aLocation = a[1].location;
    const bLocation = b[1].location;
    if (aLocation.x !== bLocation.x) {
      return Math.abs(aLocation.x) - Math.abs(bLocation.x);
    }
    return Math.abs(aLocation.y) - Math.abs(bLocation.y);
  });
})();

const modules = ref(undefined as [Ship, WeaponSlot, CanvasResult][] | undefined);
(async () => {
  let modules1: [Ship, WeaponSlot, CanvasResult][] = [];
  if (ship.station) {
    for (const [slotId, variantId] of ship.moduleIdMap.entries()) {
      if (variantId) {
        const variant = appData.getShipById(variantId);
        const slotData = ship.allWeaponSlots.find(
          (it) => it.id === slotId
        );
        if (variant && slotData) {
          const moduleCanvas = await appData.getShipCanvas(variant);
          modules1.push([variant, slotData, moduleCanvas]);
        }
      }
    }
    modules1 = modules1.sort((a, b) => {
      const aModule = a[0];
      const bModule = b[0];
      if (aModule.isUnderParent() !== bModule.isUnderParent()) {
        //底部模块排在前面渲染
        return aModule.isUnderParent() ? -1 : 1;
      }
      if (aModule.isEmptyModule() !== bModule.isEmptyModule()) {
        //空模块排在前面渲染
        return aModule.isEmptyModule() ? -1 : 1;
      }
      //越靠近外面的模块越后渲染，使其显示在顶层
      const aLocation = a[1].location;
      const bLocation = b[1].location;
      if (aLocation.x !== bLocation.x) {
        return Math.abs(bLocation.x) - Math.abs(aLocation.x);
      }
      return Math.abs(bLocation.y) - Math.abs(aLocation.y);
    });
  }
  modules.value = modules1;
})();

const canvasResult = ref(undefined as CanvasResult | undefined);
(async () => {
  canvasResult.value = await computeShipSize(ship);
})()
</script>

<template>
  <div v-if="canvasResult && modules && weapons" :style="{
    position: 'relative',
    width: canvasResult.left + canvasResult.right + 'px',
    height: canvasResult.top + canvasResult.bottom + 'px'
  }">
    <div v-for="([weapon, slotData, weaponCanvas], index) in weapons" :key="slotData.id" :style="{
      position: 'absolute',
      left: canvasResult.left + 'px',
      top: canvasResult.top + 'px',
      transformOrigin: `${weaponCanvas.left}px ${weaponCanvas.top}px`,
      transform: `translate(${-weaponCanvas.left}px, ${-weaponCanvas.top}px)`
        + ` translate(${slotData.location.x}px, ${-slotData.location.y}px)`
        + ` rotate(${360 - slotData.angle}deg)`,
    }">
      <WeaponSpriteDiv :weapon="weapon" :base-z-index="1 + (index + 1) * 10" :is-hard-point="slotData.hardPoint" />
    </div>

    <div v-for="([module, slotData, moduleCanvas], index) in modules" :key="slotData.id" :style="{
      position: 'absolute',
      left: canvasResult.left + 'px',
      top: canvasResult.top + 'px',
      transformOrigin: `calc(${moduleCanvas.left}px - ${module.moduleAnchor?.x ?? 0
        }px) calc(${moduleCanvas.top}px - ${module.moduleAnchor?.y ?? 0
        }px)`,
      transform:
        `translate(${-moduleCanvas.left}px, ${-moduleCanvas.top}px) ` +
        `translate(${module.moduleAnchor?.x ?? 0}px, ${module.moduleAnchor?.y ?? 0
        }px) ` +
        `translate(${slotData.location.x}px, ${-slotData.location.y}px) ` +
        `rotate(${slotData.angle === 0 ? 0 : 360 - slotData.angle}deg)`,
      zIndex: module.isUnderParent() ? -1 : 2 + index,
    }">
      <ShipSpriteDiv :ship="module" />
    </div>

    <img decoding="async" :src="ship.sprite" :style="{
      position: 'absolute',
      zIndex: -1,
      left: canvasResult.left + 'px',
      top: canvasResult.top + 'px',
      transform: `translate(${-ship.center.left}px, calc(-100% + ${ship.center.bottom}px))`
    }" />
  </div>

  <h1 v-else>Loading...</h1>
</template>
