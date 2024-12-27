import { appData } from 'src/AppData';
import { CanvasResult, CanvasSprite, computeCanvasSprites, defaultCanvasSprite } from './model/CanvasSprite';
import { Weapon } from './model/weapon';
import { Ship, WeaponSlot } from './model/ship';
import { Faction } from './model/Faction';
import { ShipMod } from './model/shipMod';
import { HullSize } from './conts';

export function round(value: number): number {
  return parseFloat(value.toFixed(2))
}

export function debugJson(value: unknown): string {
  return JSON.stringify(value, replacer, 2);
}

function replacer(key: string, value: unknown) {
  if (value instanceof Map) {
    return Array.from(value.entries());
  } else {
    return value;
  }
}

export async function computeWeaponSize(weapon: Weapon, isHardPoint: boolean = false): Promise<CanvasResult> {
  const underSprite = isHardPoint ? weapon.hardPointUnderSprite : weapon.turretUnderSprite;
  const gunSprite = isHardPoint ? weapon.hardPointGunSprite : weapon.turretGunSprite;
  const weaponSprite = isHardPoint ? weapon.hardPointSprite : weapon.turretSprite;

  const imagePromises = [
    appData.getImage(weaponSprite),
  ];
  if (underSprite) {
    imagePromises.push(appData.getImage(underSprite));
  }
  if (gunSprite) {
    imagePromises.push(appData.getImage(gunSprite));
  }
  if (weapon.projSpriteName) {
    imagePromises.push(appData.getImage(weapon.projSpriteName));
  }

  const images = await Promise.all(imagePromises);
  let index = 0;
  const weaponSpriteImg = images[index++];
  const underSpriteImg = underSprite ? images[index++] : undefined;
  const gunSpriteImg = gunSprite ? images[index++] : undefined;
  const projSpriteImg = weapon.projSpriteName ? images[index++] : undefined;

  let offsetPairs: [number, number][] | undefined = undefined;
  const showMissile =
    weapon.renderHints.includes('RENDER_LOADED_MISSILES') ||
    weapon.renderHints.includes('RENDER_LOADED_MISSILES_UNLESS_HIDDEN');
  const offsets = isHardPoint ? weapon.hardPointOffsets : weapon.turretOffsets;
  if (
    showMissile &&
    offsets.length > 0 &&
    weapon.projSpriteName
  ) {
    offsetPairs = [];
    for (let i = 0; i < offsets.length; i += 2) {
      const top = isHardPoint ? offsets[i] - weaponSpriteImg.naturalHeight / 4 : offsets[i];
      offsetPairs.push([top, offsets[i + 1]]);
    }
  }

  const canvasSprites: CanvasSprite[] = [];
  if (underSpriteImg) { canvasSprites.push(defaultCanvasSprite(underSpriteImg)); }
  if (gunSpriteImg) {
    canvasSprites.push(defaultCanvasSprite(gunSpriteImg));
  }
  canvasSprites.push(defaultCanvasSprite(weaponSpriteImg));
  if (offsetPairs && offsetPairs.length > 0 && projSpriteImg) {
    for (const offsetPair of offsetPairs) {
      canvasSprites.push({
        element: projSpriteImg,
        centerOffsetX: 0,
        centerOffsetY: 0,
        translateX: offsetPair[1],
        translateY: offsetPair[0],
        degree: 0
      });
    }
  }
  return computeCanvasSprites(...canvasSprites);
}

export async function computeShipSize(ship: Ship): Promise<CanvasResult> {
  const shipImg = await appData.getImage(ship.sprite);

  let weapons: [WeaponSlot, CanvasResult][] = []
  for (const [slotId, weaponId] of ship.weaponIdMap.entries()) {
    if (weaponId) {
      const weapon = appData.getWeaponById(weaponId);
      const slotData = ship.allWeaponSlots.find((it) => it.id === slotId);
      if (weapon && slotData) {
        const weaponCanvas = await appData.getWeaponCanvas(weapon, slotData.hardPoint);
        if (weaponCanvas) { weapons.push([slotData, weaponCanvas]); }
      }
    }
  }
  weapons = weapons.sort((a, b) => {
    //越靠近中间的武器越后渲染，使其显示在顶层
    const aLocation = a[0].location;
    const bLocation = b[0].location;
    if (aLocation.x !== bLocation.x) {
      return Math.abs(aLocation.x) - Math.abs(bLocation.x);
    }
    return Math.abs(aLocation.y) - Math.abs(bLocation.y);
  });

  let modules: [Ship, WeaponSlot, CanvasResult][] = [];
  if (ship.moduleIdMap.size > 0) {
    for (const [slotId, variantId] of ship.moduleIdMap.entries()) {
      if (variantId) {
        const variant = appData.getShipById(variantId);
        const slotData = ship.allWeaponSlots.find(
          (it) => it.id === slotId
        );
        if (variant && slotData) {
          const moduleCanvas = await appData.getShipCanvas(variant);
          modules.push([variant, slotData, moduleCanvas]);
        }
      }
    }
    modules = modules.sort((a, b) => {
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

  const canvasSprites: CanvasSprite[] = [];
  canvasSprites.push({
    element: shipImg,
    centerOffsetX: ship.center.left - shipImg.naturalWidth / 2 + (ship.moduleAnchor?.x ?? 0),
    centerOffsetY: ship.center.bottom - shipImg.naturalHeight / 2 + (ship.moduleAnchor?.y ?? 0),
    translateX: 0,
    translateY: 0,
    degree: 0
  });
  for (const weaponData of weapons) {
    const weaponCanvas = weaponData[1];
    const weaponSlot = weaponData[0];
    const height = weaponCanvas.top + weaponCanvas.bottom;
    const width = weaponCanvas.left + weaponCanvas.right;
    canvasSprites.push({
      element: {
        naturalHeight: height,
        naturalWidth: width
      },
      centerOffsetX: weaponCanvas.left - width / 2,
      centerOffsetY: -(weaponCanvas.top - height / 2),
      translateX: weaponSlot.location.x,
      translateY: weaponSlot.location.y,
      degree: weaponSlot.angle
    });
  }
  for (const moduleData of modules) {
    const moduleCanvas = moduleData[2];
    const moduleSlot = moduleData[1];
    const height = moduleCanvas.top + moduleCanvas.bottom;
    const width = moduleCanvas.left + moduleCanvas.right;
    canvasSprites.push({
      element: {
        naturalHeight: height,
        naturalWidth: width
      },
      centerOffsetX: moduleCanvas.left - width / 2,
      centerOffsetY: -(moduleCanvas.top - height / 2),
      translateX: moduleSlot.location.x,
      translateY: moduleSlot.location.y,
      degree: moduleSlot.angle
    });
  }
  return computeCanvasSprites(...canvasSprites);
}

export function compareShip(a: Ship, b: Ship): number {
  if (a.size !== b.size) {
    if (a.size === HullSize.FIGHTER) {
      return -1;
    } else if (b.size === HullSize.FIGHTER) {
      return 1;
    }
    return b.size.localeCompare(a.size);
  } else if (a.station !== b.station) {
    if (a.station) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return a.id.localeCompare(a.id);
  }
}

export function compareFaction(a: Faction, b: Faction): number {
  return a.id.localeCompare(b.id);
}

export function compareWeapon(a: Weapon, b: Weapon): number {
  if (a.size != b.size) {
    return b.size.localeCompare(a.size);
  } else if (a.mountType != b.mountType) {
    return a.mountType.localeCompare(b.mountType);
  } else {
    return a.id.localeCompare(a.id);
  }
}

export function compareShipMod(a: ShipMod, b: ShipMod): number {
  if (a.hidden !== b.hidden) {
    if (a.hidden) {
      return 1;
    } else {
      return -1;
    }
  }
  if (a.tags.includes('dmod') !== b.tags.includes('dmod')) {
    if (a.tags.includes('dmod')) {
      return 1;
    } else {
      return -1;
    }
  }
  return a.id.localeCompare(b.id);
}

export function convertOptions(rows: {
  label: string,
  value: string
}[], filterFun: (arg0: string) => number): {
  label: string,
  value: string
}[] {
  return rows
    .filter(row => filterFun(row.value) > 0).map(row => {
      return {
        label: `${row.label}(${filterFun(row.value)})`,
        value: row.value
      }
    });
}
