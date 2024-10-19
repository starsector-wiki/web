import { plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';
import { useDataStore } from 'src/stores/dataStore';
import { HullSize, ShieldType, WeaponSize, WeaponSizeDisplay, WeaponType, WeaponTypeDisplay } from '../conts';
import { ShipSystem } from './shipSystem';

export class Ship {
  id!: string;
  jsonType!: string;
  emptyHullVariant!: boolean;
  name!: string;
  variantName!: string;
  designation!: string;
  description!: string;
  sprite!: string;

  hullId!: string;
  baseHullId!: string;

  //    作战后消耗的战备值(CR)
  crToDeploy!: number;
  //    战备值(CR)恢复速率(每天)
  @Type(() => MutableStat)
  repairPercentPerDay!: MutableStat;
  //    部署成本(补给)
  @Type(() => MutableStat)
  suppliesToRecover!: MutableStat;
  //    峰值时间(秒)
  @Type(() => MutableStat)
  noCRLossSeconds!: MutableStat;
  //    船体大小
  size!: HullSize;
  //    部署点
  ordnancePoints!: number;

  //    维护消耗(补给/月)
  @Type(() => MutableStat)
  suppliesPerMonth!: MutableStat;
  //    载货量
  @Type(() => MutableStat)
  cargo!: MutableStat;
  //    最大载员
  @Type(() => MutableStat)
  maxCrew!: MutableStat;
  //    必要船员
  @Type(() => MutableStat)
  minCrew!: MutableStat;
  //    燃料容量
  @Type(() => MutableStat)
  fuel!: MutableStat;
  //    最大宇宙航速
  @Type(() => MutableStat)
  maxBurn!: MutableStat;
  //    燃料消耗(光年)
  @Type(() => MutableStat)
  fuelPerLY!: MutableStat;
  //    被侦察范围
  @Type(() => MutableStat)
  sensorProfile!: MutableStat;
  //    探测范围
  @Type(() => MutableStat)
  sensorStrength!: MutableStat;

  //    结构值
  @Type(() => MutableStat)
  hitPoints!: MutableStat;
  //    装甲值
  @Type(() => MutableStat)
  armorRating!: MutableStat;
  //    防御方式
  shieldType!: ShieldType;
  //    护盾角度
  @Type(() => MutableStat)
  shieldRadius!: MutableStat;
  //    护盾维持(幅能/秒)
  @Type(() => MutableStat)
  shieldCost!: MutableStat;
  //    护盾效率(幅能/伤害)
  @Type(() => MutableStat)
  fluxPerDamageAbsorbed!: MutableStat;
  //    相位线圈激活
  @Type(() => MutableStat)
  phaseCost!: MutableStat;
  //    相位线圈维持(幅能/秒)
  @Type(() => MutableStat)
  phaseUpKeep!: MutableStat;
  //    幅能容量
  @Type(() => MutableStat)
  fluxCapacity!: MutableStat;
  //    幅能耗散
  @Type(() => MutableStat)
  fluxDissipation!: MutableStat;
  //    最高航速
  @Type(() => MutableStat)
  maxSpeed!: MutableStat;

  //    战术系统
  shipSystemId!: string;
  systemFluxPerUse!: number;
  systemFluxPerSecond!: number;
  systemCrPerUse!: number;
  systemMaxUses!: number;
  systemRegen!: number;
  systemCooldown!: number;

  //    特殊系统
  shipDefenseId!: string;
  defenseFluxPerUse!: number;
  defenseFluxPerSecond!: number;
  defenseCrPerUse!: number;
  defenseMaxUses!: number;
  defenseRegen!: number;
  defenseCooldown!: number;

  @Type(() => WeaponSlot)
  allWeaponSlots!: WeaponSlot[];
  @Type(() => Map)
  weaponIdMap!: Map<string, string>;

  builtInMods!: string[];
  storyMods!: string[];
  nonBuiltInMods!: string[];

  wings!: number;
  builtInWingIds!: string[];
  nonBuiltInWingIds!: string[];

  @Type(() => Map)
  moduleIdMap!: Map<string, string>;

  //    幅能寄存器
  numFluxCapacitors!: number;
  //    耗散通道
  numFluxVents!: number;

  goalVariant!: boolean;
  fighter!: boolean;
  station!: boolean;
  civilian!: boolean;
  combat!: boolean;
  //    自动分
  fleetPoints!: number;
  //    基础价值
  baseValue!: number;

  hints!: string[];
  tags!: string[];

  static deserialize(object: object) {
    return plainToInstance(Ship, object);
  }

  hasShield(): boolean {
    return this.shieldType === ShieldType.FRONT || this.shieldType === ShieldType.OMNI
  }

  hasPhase(): boolean {
    return this.shieldType == ShieldType.PHASE && this.shipDefenseId == 'phasecloak'
  }

  hasSystem(): boolean {
    return this.shipSystemId.length > 0
  }

  getSystem(): ShipSystem | undefined {
    return useDataStore().getShipSystemById(this.shipSystemId);
  }

  getSystemDescription(): string {
    const system = useDataStore().getShipSystemById(this.shipSystemId);
    if (system == undefined) {
      return ''
    } else {
      return `${system.shortDescription}\n\n系统激活:${this.systemFluxPerUse}, 系统维持(幅能/每秒):${this.systemFluxPerSecond}, 次数:${this.systemMaxUses}, 恢复速度(秒):${this.systemRegen}, 冷却(秒):${this.systemCooldown}`
    }
  }

  hasDefense(): boolean {
    return this.shipDefenseId.length > 0
  }

  getDefense(): ShipSystem | undefined {
    return useDataStore().getShipSystemById(this.shipDefenseId);
  }

  getDefenseDescription(): string {
    const system = useDataStore().getShipSystemById(this.shipDefenseId);
    if (system == undefined) {
      return ''
    } else {
      return `${system.shortDescription}\n\n系统激活:${this.systemFluxPerUse}, 系统维持(幅能/每秒):${this.systemFluxPerSecond}, 次数:${this.systemMaxUses}, 恢复速度(秒):${this.systemRegen}, 冷却(秒):${this.systemCooldown}`
    }
  }

  getSlotDescription(): string {
    const map = new Map<WeaponType, Map<WeaponSize, number>>();
    this.allWeaponSlots.forEach(weaponSlot => {
      if (weaponSlot.weaponSlot) {
        const sizeMap = map.get(weaponSlot.weaponType) ?? new Map<WeaponSize, number>()
        let count = sizeMap.get(weaponSlot.slotSize) ?? 0
        count += 1
        sizeMap.set(weaponSlot.slotSize, count)
        map.set(weaponSlot.weaponType, sizeMap)
      }
    });
    const weaponSlotStrs: string[] = [];
    map.forEach((sizeMap, weaponType) => {
      sizeMap.forEach((count, weaponSize) => {
        weaponSlotStrs.push(`${count}x ${WeaponSizeDisplay.get(weaponSize)}${WeaponTypeDisplay.get(weaponType)}`)
      })
    })
    return weaponSlotStrs.join(', ');
  }

  getShipModDescription(): string {
    const dataStore = useDataStore();
    const modStrs: string[] = []
    if (this.builtInMods.length > 0) {
      modStrs.push(...(this.builtInMods.map(value => dataStore.getShipModById(value)?.name).filter(value => value != undefined)))
    }
    if (this.storyMods.length > 0) {
      modStrs.push(...(this.storyMods.map(value => dataStore.getShipModById(value)?.name).filter(value => value != undefined)))
    }
    if (this.nonBuiltInMods.length > 0) {
      modStrs.push(...(this.nonBuiltInMods.map(value => dataStore.getShipModById(value)?.name).filter(value => value != undefined)))
    }
    return modStrs.join(', ');
  }

  getWeaponDescription(): string {
    const dataStore = useDataStore();
    const weaponMap = new Map<string, number>();
    this.weaponIdMap.forEach(weaponId => {
      if (weaponId) {
        let count = weaponMap.get(weaponId) ?? 0
        count += 1
        weaponMap.set(weaponId, count);
      }
    });
    const weaponStrs: string[] = []
    weaponMap.forEach((count, weaponId) => {
      weaponStrs.push(`${count}x ${dataStore.getWeaponById(weaponId)?.name}`)
    })
    return weaponStrs.join(', ')
  }
}

export class MutableStat {
  baseValue!: number;
  modifiedValue!: number;

  hasModify(): boolean {
    return this.baseValue !== this.modifiedValue;
  }

  isNegative(): boolean {
    return this.modifiedValue < this.baseValue;
  }

  isPositive(): boolean {
    return this.modifiedValue > this.baseValue;
  }

  getAddend(): number {
    return this.modifiedValue - this.baseValue
  }
}

export class WeaponSlot {
  id!: string;
  slotSize!: WeaponSize;
  weaponType!: WeaponType;
  location!: { x: number; y: number; };
  angle!: number;

  weaponSlot!: boolean;
  hidden!: boolean;
  builtIn!: boolean;
}
