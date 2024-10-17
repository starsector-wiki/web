import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ShipData } from 'src/classes/model/shipData';

export const useDataStore = defineStore('dataStore', {
  state: () => ({ shipDataMap: new Map<string, ShipData>() }),
  getters: {
    sortdShips(state): ShipData[] {
      const result = [] as ShipData[];
      const sortedArray = Array.from(state.shipDataMap.entries());
      sortedArray.sort(([key1], [key2]) => key1.localeCompare(key2));
      for (const [, value] of sortedArray) {
        result.push(value);
      }
      return result;
    }
  },
  actions: {
    async initData() {
      try {
        const response = await api.get('data/ships.json');
        const shipDatas: ShipData[] = response.data;
        for (const shipData of shipDatas) {
          this.shipDataMap.set(shipData.id, shipData);
        }
      } catch (error) {
        console.error(error);
      }
    },
    getShipByShipId(shipId: string): ShipData | undefined {
      return this.shipDataMap.get(shipId);
    },
  }
});
