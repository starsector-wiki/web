import { ref } from 'vue';
import { Ship, WeaponSlot } from './classes/model/ship';
import { ShipMod } from './classes/model/shipMod';
import { ShipSystem } from './classes/model/shipSystem';
import { Weapon } from './classes/model/weapon';
import { api } from 'src/boot/axios';
import { CanvasSprite, computeCanvasSprites, defaultCanvasSprite, CanvasResult } from './classes/model/CanvasSprite';
import { Commodity } from './classes/model/Commodity';
import { Industry } from './classes/model/Industry';
import { PlanetType } from './classes/model/PlanetType';
import { MarketCondition } from './classes/model/MarketCondition';
import { SubMarket } from './classes/model/SubMarket';
import { Faction } from './classes/model/Faction';
import { Person } from './classes/model/Person';
import { Planet } from './classes/model/Planet';
import { StarSystem } from './classes/model/StarSystem';
import { SpecialItem } from './classes/model/SpecialItem';

class AppData {
  debug = true;
  ready = ref(false);
  shipMap: Map<string, Ship> = new Map();
  shipSystemMap: Map<string, ShipSystem> = new Map();
  shipModMap: Map<string, ShipMod> = new Map();
  weaponMap: Map<string, Weapon> = new Map();
  specialItemMap: Map<string, SpecialItem> = new Map();
  commodityMap: Map<string, Commodity> = new Map();
  industryMap: Map<string, Industry> = new Map();
  planetTypeMap: Map<string, PlanetType> = new Map();
  marketConditionMap: Map<string, MarketCondition> = new Map();
  subMarketMap: Map<string, SubMarket> = new Map();
  factionMap: Map<string, Faction> = new Map();
  starSystemMap: Map<string, StarSystem> = new Map();
  planetMap: Map<string, Planet> = new Map();
  personMap: Map<string, Person> = new Map();
  imgMap: Map<string, HTMLImageElement> = new Map();
  weaponCanvasMap: Map<string, CanvasResult> = new Map();
  shipCanvasMap: Map<string, CanvasResult> = new Map();

  sortdShips(): Ship[] {
    const result: Ship[] = [];
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
    const result: Ship[] = [];
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
    const result: ShipSystem[] = [];
    const sortedArray = Array.from(this.shipSystemMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdShipMod(): ShipMod[] {
    const result: ShipMod[] = [];
    const sortedArray = Array.from(this.shipModMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdWeapon(): Weapon[] {
    const result: Weapon[] = [];
    const sortedArray = Array.from(this.weaponMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdSpecialItem(): SpecialItem[] {
    const result: SpecialItem[] = [];
    const sortedArray = Array.from(this.specialItemMap.entries());
    sortedArray.sort((a, b) => b[1].order - a[1].order);
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdCommodity(): Commodity[] {
    const result: Commodity[] = [];
    const sortedArray = Array.from(this.commodityMap.entries());
    sortedArray.sort((a, b) => b[1].order - a[1].order);
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdIndustry(): Industry[] {
    const result: Industry[] = [];
    const sortedArray = Array.from(this.industryMap.entries());
    sortedArray.sort((a, b) => a[1].order - b[1].order);
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdPlanetType(): PlanetType[] {
    const result: PlanetType[] = [];
    const sortedArray = Array.from(this.planetTypeMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdMarketCondition(): MarketCondition[] {
    const result: MarketCondition[] = [];
    const sortedArray = Array.from(this.marketConditionMap.entries());
    sortedArray.sort((a, b) => a[1].order - b[1].order);
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdSubMarket(): SubMarket[] {
    const result: SubMarket[] = [];
    const sortedArray = Array.from(this.subMarketMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdFaction(): Faction[] {
    const result: Faction[] = [];
    const sortedArray = Array.from(this.factionMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdStarSystem(): StarSystem[] {
    const result: StarSystem[] = [];
    const sortedArray = Array.from(this.starSystemMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdPlanet(): Planet[] {
    const result: Planet[] = [];
    const sortedArray = Array.from(this.planetMap.entries());
    sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
    for (const [, value] of sortedArray) {
      result.push(value);
    }
    return result;
  }
  sortdPerson(): Person[] {
    const result: Person[] = [];
    const sortedArray = Array.from(this.personMap.entries());
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
  getSpecialItemById(id: string): SpecialItem | undefined {
    return this.specialItemMap.get(id);
  }
  getCommodityById(id: string): Commodity | undefined {
    return this.commodityMap.get(id);
  }
  getIndustryById(id: string): Industry | undefined {
    return this.industryMap.get(id);
  }
  getPlanetTypeById(id: string): PlanetType | undefined {
    return this.planetTypeMap.get(id);
  }
  getMarketConditionById(id: string): MarketCondition | undefined {
    return this.marketConditionMap.get(id);
  }
  getSubMarketById(id: string): SubMarket | undefined {
    return this.subMarketMap.get(id);
  }
  getFactionById(id: string): Faction | undefined {
    return this.factionMap.get(id);
  }
  getStarSystemById(id: string): StarSystem | undefined {
    return this.starSystemMap.get(id);
  }
  getPlanetById(id: string): Planet | undefined {
    return this.planetMap.get(id);
  }
  getPersonById(id: string): Person | undefined {
    return this.personMap.get(id);
  }

  async getImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = this.imgMap.get(src);
      if (img) {
        resolve(img);
      } else {
        const newImg = new Image();
        newImg.onload = () => {
          resolve(newImg);
          this.imgMap.set(src, newImg);
        }
        newImg.onerror = (e) => reject(e);
        newImg.src = src;
      }
    });
  }
  async getWeaponCanvas(weapon: Weapon, isHardPoint: boolean = false): Promise<CanvasResult | undefined> {
    const weaponImgId = isHardPoint ? weapon.id + '_hard' : weapon.id;
    const exitsCanvas = this.weaponCanvasMap.get(weaponImgId);
    if (exitsCanvas) {
      return exitsCanvas;
    }

    const underSprite = isHardPoint ? weapon.hardPointUnderSprite : weapon.turretUnderSprite;
    const gunSprite = isHardPoint ? weapon.hardPointGunSprite : weapon.turretGunSprite;
    const weaponSprite = isHardPoint ? weapon.hardPointSprite : weapon.turretSprite;
    if (!weaponSprite) {
      return undefined;
    }

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
    const offsets = isHardPoint ? weapon.hardPointOffsets : weapon.turretOffsets;
    if (
      showMissile &&
      offsets.length > 0 &&
      weapon.projSpriteName
    ) {
      offsetPairs = [];
      for (let i = 0; i < weapon.turretOffsets.length; i += 2) {
        const top = isHardPoint ? weapon.turretOffsets[i] - weaponSpriteImg.naturalHeight / 4 : weapon.turretOffsets[i];
        offsetPairs.push([top, weapon.turretOffsets[i + 1]]);
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
    const canvasResult = computeCanvasSprites(...canvasSprites);
    let top = canvasResult.top
    if (isHardPoint) {
      top += weaponSpriteImg.naturalHeight / 4;
    }
    let bottom = canvasResult.bottom
    if (isHardPoint) {
      bottom -= weaponSpriteImg.naturalHeight / 4;
    }
    const result: CanvasResult = {
      left: canvasResult.left,
      right: canvasResult.right,
      top,
      bottom
    }
    this.weaponCanvasMap.set(weaponImgId, result);
    return result;
  }
  async getShipCanvas(ship: Ship): Promise<CanvasResult> {
    const exitsCanvas = this.shipCanvasMap.get(ship.id);
    if (exitsCanvas) {
      return exitsCanvas;
    }

    const shipImg = await this.getImage(ship.sprite);

    const weapons: [WeaponSlot, CanvasResult][] = []
    for (const [slotId, weaponId] of ship.weaponIdMap.entries()) {
      if (weaponId) {
        const weapon = appData.getWeaponById(weaponId);
        const slotData = ship.allWeaponSlots.find((it) => it.id === slotId);
        if (weapon && slotData) {
          const weaponCanvas = await this.getWeaponCanvas(weapon, slotData.hardPoint);
          if (weaponCanvas) { weapons.push([slotData, weaponCanvas]); }
        }
      }
    }

    const modules: [Ship, WeaponSlot, CanvasResult][] = [];
    if (ship.moduleIdMap.size > 0) {
      for (const [slotId, variantId] of ship.moduleIdMap.entries()) {
        if (variantId) {
          const variant = appData.getShipById(variantId);
          const slotData = ship.allWeaponSlots.find(
            (it) => it.id === slotId
          );
          if (variant && slotData) {
            const moduleCanvas = await this.getShipCanvas(variant);
            modules.push([variant, slotData, moduleCanvas]);
          }
        }
      }
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
    const canvasResult = computeCanvasSprites(...canvasSprites);

    this.shipCanvasMap.set(ship.id, canvasResult);
    return canvasResult;
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
          } else if (jsonObject.jsonType === 'SPECIAL_ITEM') {
            const specialItem = SpecialItem.deserialize(jsonObject);
            this.specialItemMap.set(specialItem.id, specialItem);
          } else if (jsonObject.jsonType === 'COMMODITY') {
            const commodity = Commodity.deserialize(jsonObject);
            this.commodityMap.set(commodity.id, commodity);
          } else if (jsonObject.jsonType === 'INDUSTRY') {
            const industry = Industry.deserialize(jsonObject);
            this.industryMap.set(industry.id, industry);
          } else if (jsonObject.jsonType === 'PLANET_TYPE') {
            const planetType = PlanetType.deserialize(jsonObject);
            this.planetTypeMap.set(planetType.id, planetType);
          } else if (jsonObject.jsonType === 'MARKET_CONDITION') {
            const marketCondition = MarketCondition.deserialize(jsonObject);
            this.marketConditionMap.set(marketCondition.id, marketCondition);
          } else if (jsonObject.jsonType === 'SUB_MARKET') {
            const subMarket = SubMarket.deserialize(jsonObject);
            this.subMarketMap.set(subMarket.id, subMarket);
          } else if (jsonObject.jsonType === 'FACTION') {
            const faction = Faction.deserialize(jsonObject);
            this.factionMap.set(faction.id, faction);
          } else if (jsonObject.jsonType === 'START_SYSTEM') {
            const starSystem = StarSystem.deserialize(jsonObject);
            this.starSystemMap.set(starSystem.id, starSystem);
          } else if (jsonObject.jsonType === 'PLANET') {
            const planet = Planet.deserialize(jsonObject);
            this.planetMap.set(planet.id, planet);
          } else if (jsonObject.jsonType === 'PERSON') {
            const person = Person.deserialize(jsonObject);
            this.personMap.set(person.id, person);
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
        if (ship.moduleIdMap.size > 0) {
          for (const entry of ship.moduleIdMap.entries()) {
            const variantId = entry[1];
            const variant = this.getShipById(variantId);
            if (variant) {
              variant.isModule = true;
            }
          }
        }
        if (ship.moduleAnchor) {
          ship.isModule = true;
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
