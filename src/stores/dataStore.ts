import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Ship } from 'src/classes/model/ship';
import { ShipMod } from 'src/classes/model/shipMod';
import { ShipSystem } from 'src/classes/model/shipSystem';
import { Weapon } from 'src/classes/model/weapon';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    shipMap: new Map<string, Ship>(),
    shipSystemMap: new Map<string, ShipSystem>(),
    shipModMap: new Map<string, ShipMod>(),
    weaponMap: new Map<string, Weapon>(),
  }),
  getters: {
    sortdShips(state): Ship[] {
      const result = [] as Ship[];
      const sortedArray = Array.from(state.shipMap.entries());
      sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
      for (const [, value] of sortedArray) {
        if (value.emptyHullVariant) {
          result.push(value);
        }
      }
      return result;
    },
    sortdShipVarinats(state): Ship[] {
      const result = [] as Ship[];
      const sortedArray = Array.from(state.shipMap.entries());
      sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
      for (const [, value] of sortedArray) {
        if (!value.emptyHullVariant) {
          result.push(value);
        }
      }
      return result;
    },
    sortdShipSystem(state): ShipSystem[] {
      const result = [] as ShipSystem[];
      const sortedArray = Array.from(state.shipSystemMap.entries());
      sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
      for (const [, value] of sortedArray) {
        result.push(value);
      }
      return result;
    },
    sortdShipMod(state): ShipMod[] {
      const result = [] as ShipMod[];
      const sortedArray = Array.from(state.shipModMap.entries());
      sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
      for (const [, value] of sortedArray) {
        result.push(value);
      }
      return result;
    },
    sortdWeapon(state): Weapon[] {
      const result = [] as Weapon[];
      const sortedArray = Array.from(state.weaponMap.entries());
      sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
      for (const [, value] of sortedArray) {
        result.push(value);
      }
      return result;
    },
  },
  actions: {
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
          if (ship.emptyHullVariant) {
            for (const modId of ship.builtInMods.concat(ship.storyMods).concat(ship.nonBuiltInMods)) {
              const shipMod = this.getShipModById(modId)
              shipMod?.shipIds.push(ship.id)
            }
          } else {
            for (const modId of ship.builtInMods.concat(ship.storyMods).concat(ship.nonBuiltInMods)) {
              const shipMod = this.getShipModById(modId)
              shipMod?.variantIds.push(ship.id)
            }
          }
        }

      } catch (error) {
        console.error(error);
      }
    },
    getShipById(id: string): Ship | undefined {
      return this.shipMap.get(id);
    },
    getShipsByIds(ids: string[]): Ship[] {
      const result = []
      for (const id of ids) {
        const ship = this.getShipById(id);
        if (ship) {
          result.push(ship);
        }
      }
      return result;
    },
    getShipSystemById(id: string): ShipSystem | undefined {
      return this.shipSystemMap.get(id);
    },
    getShipModById(id: string): ShipMod | undefined {
      return this.shipModMap.get(id);
    },
    getWeaponById(id: string): Weapon | undefined {
      return this.weaponMap.get(id);
    },
  }
});

interface WikiJsonObject {
  jsonType?: string;
}
