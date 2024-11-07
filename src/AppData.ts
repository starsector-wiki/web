import { ref } from 'vue';
import { Ship } from './classes/model/ship';
import { ShipMod } from './classes/model/shipMod';
import { ShipSystem } from './classes/model/shipSystem';
import { Weapon } from './classes/model/weapon';
import { api } from 'src/boot/axios';

class AppData {
  ready = ref(false);
  shipMap: Map<string, Ship> = new Map();
  shipSystemMap: Map<string, ShipSystem> = new Map();
  shipModMap: Map<string, ShipMod> = new Map();
  weaponMap: Map<string, Weapon> = new Map();

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
