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
        result.push(value);
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
      } catch (error) {
        console.error(error);
      }
    },
    getShipById(id: string): Ship | undefined {
      return this.shipMap.get(id);
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
