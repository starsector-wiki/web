import { ref } from 'vue';
import { Ship, WeaponSlot } from './classes/model/ship';
import { ShipMod } from './classes/model/shipMod';
import { ShipSystem } from './classes/model/shipSystem';
import { Weapon } from './classes/model/weapon';
import { api } from 'src/boot/axios';
import { CanvasSprite, computeCanvasSprites, computeWeaponCanvasSprites, drawImage, drawWeapon, SpriteCanvas } from './classes/model/CanvasSprite';

class AppData {
  ready = ref(false);
  shipMap: Map<string, Ship> = new Map();
  shipSystemMap: Map<string, ShipSystem> = new Map();
  shipModMap: Map<string, ShipMod> = new Map();
  weaponMap: Map<string, Weapon> = new Map();
  imgMap: Map<string, HTMLImageElement> = new Map();
  weaponCanvasMap: Map<string, SpriteCanvas> = new Map();
  shipCanvasMap: Map<string, SpriteCanvas> = new Map();

  sortdShips(): Ship[] {
    const result = [] as Ship[];
    const sortedArray = Array.from(this.shipMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      if (value.emptyHullVariant) {
        result.push(value);
      }
    }
    return result;
  }
  sortdShipVarinats(): Ship[] {
    const result = [] as Ship[];
    const sortedArray = Array.from(this.shipMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      if (!value.emptyHullVariant) {
        result.push(value);
      }
    }
    return result;
  }
  sortdShipSystem(): ShipSystem[] {
    const result = [] as ShipSystem[];
    const sortedArray = Array.from(this.shipSystemMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdShipMod(): ShipMod[] {
    const result = [] as ShipMod[];
    const sortedArray = Array.from(this.shipModMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdWeapon(): Weapon[] {
    const result = [] as Weapon[];
    const sortedArray = Array.from(this.weaponMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  getShipById(id: string): Ship | undefined {
    return this.shipMap.get(id);
  }
  getShipsByIds(ids: string[]): Ship[] {
    const result = []
    for (const id of ids) {
      const ship = this.getShipById(id);
      if (ship) {
        result.push(ship);
      }
    }
    return result;
  }
  getShipSystemById(id: string): ShipSystem | undefined {
    return this.shipSystemMap.get(id);
  }
  getShipModById(id: string): ShipMod | undefined {
    return this.shipModMap.get(id);
  }
  getWeaponById(id: string): Weapon | undefined {
    return this.weaponMap.get(id);
  }

  async getImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = this.imgMap.get(src);
      if (img) {
        resolve(img);
      } else {
        const newImg = new Image();
        this.imgMap.set(src, newImg);
        newImg.onload = () => resolve(newImg);
        newImg.src = src;
      }
    });
  }
  async getWeaponCanvas(weapon: Weapon, isHardPoint: boolean = false): Promise<SpriteCanvas> {
    const weaponImgId = isHardPoint ? weapon.id + '_hard' : weapon.id;
    const exitsCanvas = this.weaponCanvasMap.get(weaponImgId);
    if (exitsCanvas) {
      return exitsCanvas;
    }

    const underSprite = isHardPoint ? weapon.hardPointUnderSprite : weapon.turretUnderSprite;
    const gunSprite = isHardPoint ? weapon.hardPointGunSprite : weapon.turretGunSprite;
    const weaponSprite = isHardPoint ? weapon.hardPointSprite : weapon.turretSprite;

    const imagePromises = [
      this.getImage(weaponSprite),
    ];
    if (underSprite) {
      imagePromises.push(this.getImage(underSprite));
    }
    if (gunSprite) {
      imagePromises.push(this.getImage(gunSprite));
    }
    if (weapon.projSpriteName) {
      imagePromises.push(this.getImage(weapon.projSpriteName));
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
    if (
      showMissile &&
      weapon.turretOffsets.length > 0 &&
      weapon.projSpriteName
    ) {
      offsetPairs = [];
      for (let i = 0; i < weapon.turretOffsets.length; i += 2) {
        const top = isHardPoint ? weapon.turretOffsets[i] - weaponSpriteImg.naturalHeight / 4 : weapon.turretOffsets[i];
        offsetPairs.push([top, weapon.turretOffsets[i + 1]]);
      }
    }

    const canvasResult = computeWeaponCanvasSprites(underSpriteImg, gunSpriteImg, weaponSpriteImg, projSpriteImg, offsetPairs);
    const width = canvasResult.left + canvasResult.right;
    const height = canvasResult.top + canvasResult.bottom;
    const offscreenCanvas = new OffscreenCanvas(width, height);
    const ctx = offscreenCanvas.getContext('2d');
    if (ctx) {
      drawWeapon(underSpriteImg, gunSpriteImg, weaponSpriteImg, projSpriteImg, offsetPairs, {
        ctx,
        centerPointLeft: canvasResult.left,
        centerPointTop: canvasResult.top
      });
    }
    let top = canvasResult.top
    if (isHardPoint) {
      top += weaponSpriteImg.naturalHeight / 4;
    }
    const result: SpriteCanvas = {
      canvas: offscreenCanvas,
      left: canvasResult.left,
      top
    }
    this.weaponCanvasMap.set(weaponImgId, result);
    return result;
  }
  async getShipCanvas(ship: Ship): Promise<SpriteCanvas> {
    const exitsCanvas = this.shipCanvasMap.get(ship.id);
    if (exitsCanvas) {
      return exitsCanvas;
    }

    const shipImg = await this.getImage(ship.sprite);

    let weapons = []
    for (const [slotId, weaponId] of ship.weaponIdMap.entries()) {
      if (weaponId) {
        const weapon = appData.getWeaponById(weaponId);
        const slotData = ship.allWeaponSlots.find((it) => it.id === slotId);
        if (weapon && slotData) {
          const weaponCanvas = await this.getWeaponCanvas(weapon, slotData.hardPoint);
          weapons.push([slotData, weaponCanvas] as [WeaponSlot, SpriteCanvas]);
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

    let modules: [Ship, WeaponSlot, SpriteCanvas][] = [];
    if (ship.station) {
      for (const [slotId, variantId] of ship.moduleIdMap.entries()) {
        if (variantId) {
          const variant = appData.getShipById(variantId);
          const slotData = ship.allWeaponSlots.find(
            (it) => it.id === slotId
          );
          if (variant && slotData) {
            const moduleCanvas = await this.getShipCanvas(variant);
            modules.push([variant, slotData, moduleCanvas] as [Ship, WeaponSlot, SpriteCanvas]);
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
      centerOffsetRight: ship.center.x - shipImg.naturalWidth / 2,
      centerOffsetTop: ship.center.y - shipImg.naturalHeight / 2,
      offsetRight: 0,
      offsetTop: 0,
      degree: 0
    });
    for (const weaponData of weapons) {
      const weaponCanvas = weaponData[1];
      const weaponSlot = weaponData[0];
      canvasSprites.push({
        element: {
          naturalHeight: weaponCanvas.canvas.height,
          naturalWidth: weaponCanvas.canvas.width
        },
        centerOffsetRight: weaponCanvas.left - weaponCanvas.canvas.width / 2,
        centerOffsetTop: -(weaponCanvas.top - weaponCanvas.canvas.height / 2),
        offsetRight: weaponSlot.location.x,
        offsetTop: weaponSlot.location.y,
        degree: weaponSlot.angle
      });
    }
    for (const moduleData of modules) {
      const moduleCanvas = moduleData[2];
      const moduleSlot = moduleData[1];
      canvasSprites.push({
        element: {
          naturalHeight: moduleCanvas.canvas.height,
          naturalWidth: moduleCanvas.canvas.width
        },
        centerOffsetRight: moduleCanvas.left - moduleCanvas.canvas.width / 2,
        centerOffsetTop: -(moduleCanvas.top - moduleCanvas.canvas.height / 2),
        offsetRight: moduleSlot.location.x,
        offsetTop: moduleSlot.location.y,
        degree: moduleSlot.angle
      });
    }
    const canvasResult = computeCanvasSprites(...canvasSprites);

    const width = canvasResult.left + canvasResult.right;
    const height = canvasResult.top + canvasResult.bottom;
    const offscreenCanvas = new OffscreenCanvas(width, height);
    const ctx = offscreenCanvas.getContext('2d');
    if (ctx) {
      const myCtx = {
        ctx,
        centerPointLeft: canvasResult.left,
        centerPointTop: canvasResult.top
      };
      drawImage(myCtx, shipImg, ship.center.x, shipImg.naturalHeight - ship.center.y);
      for (const weaponData of weapons) {
        const weaponSlot = weaponData[0];
        const weaponCanvas = weaponData[1];
        drawImage(myCtx, weaponCanvas.canvas, weaponCanvas.left, weaponCanvas.top, -weaponSlot.location.y, weaponSlot.location.x, weaponSlot.angle);
      }
      for (const moduleData of modules) {
        // const module = moduleData[0];
        const moduleSlot = moduleData[1];
        const moduleCanvas = moduleData[2];
        drawImage(myCtx, moduleCanvas.canvas, moduleCanvas.left, moduleCanvas.top, -moduleSlot.location.y, moduleSlot.location.x, moduleSlot.angle);
      }
    }
    const result: SpriteCanvas = {
      canvas: offscreenCanvas,
      left: canvasResult.left,
      top: canvasResult.top
    }
    this.shipCanvasMap.set(ship.id, result);
    return result;
  }

  async initData() {
    try {
      const response = await api.get('data/data.json');
      const jsonArray: WikiJsonObject[] = response.data;
      //load data
      for (const jsonObject of jsonArray) {
        if ('jsonType' in jsonObject) {
          if (jsonObject.jsonType === 'SHIP') {
            const ship = Ship.deserialize(jsonObject);
            this.shipMap.set(ship.id, ship);
          } else if (jsonObject.jsonType === 'SHIP_SYSTEM') {
            const shipSystem = ShipSystem.deserialize(jsonObject);
            this.shipSystemMap.set(shipSystem.id, shipSystem);
          } else if (jsonObject.jsonType === 'SHIP_MOD') {
            const shipMod = ShipMod.deserialize(jsonObject);
            this.shipModMap.set(shipMod.id, shipMod);
          } else if (jsonObject.jsonType === 'WEAPON') {
            const weapon = Weapon.deserialize(jsonObject);
            this.weaponMap.set(weapon.id, weapon);
          }
        }
      }
      //add link
      for (const ship of this.shipMap.values()) {
        //ship
        if (ship.emptyHullVariant) {
          ship.varinatIds = Array.from(this.shipMap.values())
            .filter(it => !it.emptyHullVariant && it.hullId === ship.hullId)
            .map(it => it.id);
        }
        if (!ship.isSkin()) {
          ship.skinIds = Array.from(this.shipMap.values())
            .filter(it => it.isSkin() && it.emptyHullVariant && it.baseHullId === ship.hullId)
            .map(it => it.id);
        }
        //ship system
        if (ship.hasSystem() && ship.emptyHullVariant) {
          const shipSystem = this.getShipSystemById(ship.shipSystemId)
          shipSystem?.shipIds.push(ship.id)
        }
        if (ship.hasDefense() && ship.emptyHullVariant) {
          const shipDefenseSystem = this.getShipSystemById(ship.shipDefenseId)
          shipDefenseSystem?.defenseShipIds.push(ship.id)
        }
        //ship mod
        for (const modId of ship.builtInMods.concat(ship.storyMods).concat(ship.nonBuiltInMods)) {
          const shipMod = this.getShipModById(modId)
          if (ship.emptyHullVariant) {
            shipMod?.shipIds.push(ship.id)
          }
          else {
            shipMod?.variantIds.push(ship.id)
          }
        }
        //weapon
        const weaponSet = new Set<string>();
        for (const weaponId of Array.from(ship.weaponIdMap.values())) {
          if (weaponId) {
            weaponSet.add(weaponId);
          }
        }
        for (const weaponId of weaponSet) {
          const weapon = this.getWeaponById(weaponId);
          if (ship.emptyHullVariant) {
            weapon?.shipIds.push(ship.id)
          } else {
            weapon?.variantIds.push(ship.id)
          }
        }
      }
      this.ready.value = true;
    } catch (error) {
      console.error(error);
    }
  }
}

interface WikiJsonObject {
  jsonType?: string;
}

export const appData = new AppData();